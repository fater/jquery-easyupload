/*
 * Module: jQuery Easy Upload Plugin
 * Version: 2.0.0
 * Author: Chaikin Evgenii
 * Release date: 10 Nov 2015
 * Updated: 12 Nov 2015
 * Site: http://www.fater.ru
 * Dependence: jQuery
 * */


(function ($)
{
	var defaults =
	{
		url: document.URL,
		data: {},
		//max_file_size: 0,
		file_name: 'file',
		on_progress: function(data){},
		on_upload_before: function(data){},
		on_upload_file: function(data){},
		on_upload_finish: function(){},
		on_upload_error: function(data){}
	};

	var process_defaults = {files: {}, all_files_size: 0, uploaded_size: 0, size: 0, send_pos: 0, sender_launched: false};

	var plugin = function (element, options)
	{
		var object = this;
		object.element = $(element);
		object.options = $.extend({}, defaults, options);
		object.process = $.extend({}, process_defaults);
		object.element.on('change', function(e)
		{
			object.queue(e.target.files);
		});
	};

	plugin.prototype.queue = function(files)
	{
		var object = this;
		$.each(files, function(k, v)
		{
			object.process.size++;
			object.process.files[object.process.size] = v;
			object.process.all_files_size += v.size;
		});

		if (object.process.sender_launched == false)
		{
			object.options.on_upload_before({files: object.process.size, files_size: object.process.all_files_size});
			object.process.sender_launched = true;
			object.send();
		}
	};

	plugin.prototype.send = function ()
	{
		var object = this;
		if (object.process.send_pos >= object.process.size)
		{
			object.process = $.extend({}, process_defaults);
			object.options.on_upload_finish();
			return null;
		}
		object.process.send_pos++;
		var form_data = new FormData();
		// Append one file to submit
		form_data.append(object.options.file_name, object.process.files[object.process.send_pos]);
		// Append extra data to submit
		$.each(object.options.data, function (k, v)
		{
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
			complete: function(data)
			{
				object.process.uploaded_size += object.process.files[object.process.send_pos].size;
				object.send();
			},
			success: function(data)
			{
				object.options.on_upload_file (data);
			},
			error: function(data)
			{
				var file_name = object.process.files[object.process.send_pos].name;
				object.options.on_upload_error.call(this, $.extend(data, {file_name: file_name}));
			},
			xhr: function()
			{
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(evt)
				{
					var data = {};
					data.progress_file = evt.loaded / evt.total * 100;
					data.progress_total = (object.process.uploaded_size + evt.loaded) / object.process.all_files_size * 100;
					data.total_files = object.process.size;
					data.current_file = object.process.send_pos;
					object.options.on_progress(data);
				};
				xhr.upload.onload = function(){};
				return xhr;
			}
		});
	};

	$.fn.easyupload = function(options)
	{
		this.each(function ()
		{
			return new plugin(this, options);
		});
	};
}) (jQuery);