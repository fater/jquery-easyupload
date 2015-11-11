/*
 * Module: jQuery Easy Upload Plugin
 * Version: 1.3.0
 * Author: Chaikin Evgenii
 * Release date: 10 Nov 2015
 * Updated: 12 Nov 2015
 * Site: http://www.fater.ru
 * Dependence: jQuery
 * */

(function ($)
{
	var settings =
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
	var process = {files: {}, all_files_size: 0, uploaded_size: 0, size: 0, send_pos: 0, sender_launched: false};

	var methods =
	{
		queue: function (data)
		{
			$.each(data, function(k, v)
			{
				process.size++;
				process.files[process.size] = v;
				process.all_files_size += v.size;
			});

			if (process.sender_launched == false)
			{
				settings.on_upload_before.call(this, {files: process.size, files_size: process.all_files_size});
				process.sender_launched = true;
				methods.send ();
			}
		},

		// Send method
		send: function ()
		{
			if (process.send_pos >= process.size)
			{
				process = {files: {}, all_files_size: 0, uploaded_size: 0, size: 0, send_pos: 0, sender_launched: false};
				settings.on_upload_finish();
				return null;
			}

			process.send_pos++;
			var form_data = new FormData();
			// Append one file to submit
			form_data.append(settings.file_name, process.files[process.send_pos]);
			// Append extra data to submit
			$.each(settings.data, function (k, v)
			{
				form_data.append(k, v);
			});

			$.ajax({
				url: settings.url,
				type: 'POST',
				data: form_data,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,
				complete: function(data)
				{
					process.uploaded_size += process.files[process.send_pos].size;
					methods.send();
				},
				success: function(data)
				{
					settings.on_upload_file (data);
				},
				error: function(data)
				{
					var file_name = process.files[process.send_pos].name;
					settings.on_upload_error.call(this, $.extend(data, {file_name: file_name}));
				},
				xhr: function()
				{
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.onprogress = function(evt)
					{
						var data = {};
						data.progress_file = evt.loaded / evt.total * 100;
						data.progress_total = (process.uploaded_size + evt.loaded) / process.all_files_size * 100;
						data.total_files = process.size;
						data.current_file = process.send_pos;
						settings.on_progress.call(this, data);
					};
					xhr.upload.onload = function(){};
					return xhr;
				}
			});
		}
	};

	$.fn.easyupload = function(options)
	{
		settings = $.extend(settings, options);
		$(document).ready(function ()
		{
			$(this).on('change', function(e)
			{
				methods.queue.call(this, e.target.files);
			});
		});
	};
}) (jQuery);
