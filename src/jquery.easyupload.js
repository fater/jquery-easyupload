/*
 * Module: jQuery Easy Upload Plugin
 * Version: 1.1.0
 * Author: Chaikin Evgenii
 * Release date: 10 Nov 2015
 * Updated: 11 Nov 2015
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
		//max_total_size: 0,
		file_name: 'file',
		on_before_upload: function(info){},
		on_progress: function(percent){},
		on_upload_finish: function(data){},
		on_upload_error: function(percent){}
	};

	$.fn.easyupload = function(options)
	{
		settings = $.extend(settings, options);

		$(document).ready(function ()
		{
			$(this).on('change', function(e)
			{
				e.stopPropagation();

				var total_size = 0;
				var files_info = {};
				var data = new FormData();

				// Read files and prepare to submit
				$.each(e.target.files, function(k, v)
				{
					data.append(k, v);
					files_info[k] = {size: v.size, name: v.name, type: v.type};
					total_size += v.size;
				});

				// Append extra data to submit
				$.each(settings.data, function (k, v)
				{
					data.append(k, v);
				});
				settings.on_before_upload.call(this, {files: files_info, total_size: total_size});

				// Ajax submit
				$.ajax({
					url: settings.url,
					type: 'POST',
					data: data,
					cache: false,
					dataType: 'json',
					processData: false,
					contentType: false,
					complete: function(data){},
					success: function(data)
					{
						settings.on_upload_finish.call(this, data);
					},
					error: function(data)
					{
						settings.on_upload_error.call(this, data);
					},
					xhr: function()
					{
						var xhr = $.ajaxSettings.xhr();
						xhr.upload.onprogress = function(evt)
						{
							settings.on_progress.call(this, parseInt(evt.loaded / evt.total * 100));
						};
						xhr.upload.onload = function(){};
						return xhr ;
					}
				});
			});
		});
	};
}) (jQuery);
