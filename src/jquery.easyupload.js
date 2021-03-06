/*
 * Module: jQuery Easy File Upload Plugin
 * Version: 2.5.0
 * Author: Chaikin Evgenii
 * Release date: 10 Nov 2015
 * Updated: 09 Apr 2017
 * Site: http://www.fater.ru
 * Dependence: jQuery
 * */

(function ($) {
    /**
     * Default parameters
     *
     * @type {{url: string, data: {}, max_file_size: number, file_name: string, cancel_element: string, drop_element: string, submit_element: string, on_max_file_size: defaults.on_max_file_size, on_progress: defaults.on_progress, on_upload_before: defaults.on_upload_before, on_upload_file: defaults.on_upload_file, on_upload_finish: defaults.on_upload_finish, on_upload_error: defaults.on_upload_error, on_upload_cancel: defaults.on_upload_cancel}}
     */
    let defaults =
    {
        // Path to the server address
        url: document.URL,
        // Extra data will send to the server
        data: {},
        // Maximum file size in bytes. 0 - unlimited size
        max_file_size: 0,
        // The name of the variable passed in the array (in PHP you will get in $_FILES['file'])
        file_name: 'file',
        cancel_element: '',
        drop_element: '',
        submit_element: '',
        /**
         * The method is started if the file is larger than the specified size
         *
         * @param data
         */
        on_max_file_size: function (data) {
        },
        on_progress: function (data) {
        },
        on_upload_before: function (data) {
        },
        on_upload_file: function (data) {
        },
        on_upload_finish: function () {
        },
        on_upload_error: function (data) {
        },
        on_upload_cancel: function (data) {
        }
    };
    let process_defaults = {
        files: {},
        all_files_size: 0,
        uploaded_size: 0,
        size: 0,
        send_pos: 0,
        sender_launched: false
    };

    let plugin = function (element, options) {
        let object = this;
        object.element = $(element);
        object.options = $.extend({}, defaults, options);
        object.process = $.extend({}, process_defaults);
        if (object.options.submit_element != '') {
            $(object.options.submit_element).on('click', function () {
                if (object.process.cancelled) {
                    object.process = $.extend({}, process_defaults);
                }
                object.queue(object.element.get(0).files);
            });
        } else {
            object.element.on('change', function (e) {
                if (object.process.cancelled) {
                    object.process = $.extend({}, process_defaults);
                }
                object.queue(e.target.files);
            });
        }
        if (object.options.drop_element != '') {
            $(object.options.drop_element)
                .on('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                })
                .on('drop', function (e) {
                    e.preventDefault();
                    object.queue(e.originalEvent.dataTransfer.files);
                });
        }
        if (object.options.cancel_element != '') {
            $(object.options.cancel_element).on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                object.process.cancelled = true;
                return true;
            });
        }
    };

    plugin.prototype.queue = function (files) {
        let object = this;
        $.each(files, function (k, v) {
            if (object.options.max_file_size > 0 && v.size > object.options.max_file_size) {
                object.options.on_max_file_size(v);
                return true;
            }
            object.process.size++;
            object.process.files[object.process.size] = v;
            object.process.all_files_size += v.size;
        });

        if (object.process.sender_launched == false) {
            object.options.on_upload_before({
                files_count: object.process.size,
                files_size: object.process.all_files_size
            });
            object.process.sender_launched = true;
            object.send();
        }
    };

    plugin.prototype.send = function () {
        let object = this;
        if (object.process.cancelled) {
            return null;
        } else if (object.process.send_pos >= object.process.size) {
            object.process = $.extend({}, process_defaults);
            object.options.on_upload_finish();
            return null;
        }
        object.process.send_pos++;
        let form_data = new FormData();
        // Append one file to submit
        form_data.append(object.options.file_name, object.process.files[object.process.send_pos]);
        // Append extra data to submit
        $.each(object.options.data, function (k, v) {
            form_data.append(k, v);
        });

        $.ajax({
            url: object.options.url,
            type: 'POST',
            data: form_data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            complete: function () {
                if (!object.process.cancelled) {
                    object.process.uploaded_size += object.process.files[object.process.send_pos].size;
                    object.send();
                }
            },
            success: function (data) {
                object.options.on_upload_file(data);
            },
            error: function (data) {
                if (!object.process.cancelled) {
                    let fileName = object.process.files[object.process.send_pos].name;
                    object.options.on_upload_error.call(this, $.extend(data, {file_name: fileName}));
                }
            },
            xhr: function () {
                let xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = function (evt) {
                    if (object.process.cancelled) {
                        object.options.on_upload_cancel({file_name: object.process.files[object.process.send_pos].name});
                        xhr.abort();
                    }
                    let data = {};
                    data.progress_file = evt.loaded / evt.total * 100;
                    data.progress_total = (object.process.uploaded_size + evt.loaded) / object.process.all_files_size * 100;
                    data.progress_total = data.progress_total > 100 ? 100 : data.progress_total;
                    data.total_files = object.process.size;
                    data.current_file = object.process.send_pos;
                    object.options.on_progress(data);
                };
                xhr.upload.onload = function () {
                };
                return xhr;
            }
        });
    };

    $.fn.easyupload = function (options) {
        this.each(function () {
            return new plugin(this, options);
        });
    };
})(jQuery);