/*
 * Module: jQuery Easy Upload Plugin
 * Version: 1.0.0
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

	};

	$.fn.easyupload = function(options)
	{
		//settings.element = this;
		$(document).ready(function ()
		{
			$(this).on('change', function(e)
			{
				var data = new FormData();
				$.each(e.target.files, function(key, value)
				{
					data.append(key, value);
					//console.log (key, value);
				});

				$.ajax({
					url: 'upload.php',
					type: 'POST',
					data: data,
					cache: false,
					dataType: 'json',
					processData: false, // Don't process the files, we're using FormData
					contentType: false, // Set content type to false as jQuery will tell the server its a query string request
					success: function(data, textStatus, jqXHR){
						//self.processSubmit(event, data);
						console.log ('Files uploaded sucessfully ', data);
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.log ('Files uploaded Error');
						//self.settings.error(jqXHR, textStatus, errorThrown);
					},
					xhr: function()
					{
						var xhr = $.ajaxSettings.xhr();
						xhr.upload.onprogress = function(evt)
						{
							console.log('Загружено: ', evt.loaded / evt.total * 100, '%');
						};
						// set the onload event handler
						xhr.upload.onload = function(){
							console.log('Все файлы загружены');
						};
						// return the customized object
						return xhr ;
					}
				});
			});
		});
	};
}) (jQuery);
