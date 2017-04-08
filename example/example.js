$(document).ready(function () {
    // Example 1
    $('#upload_button_1').easyupload({
        url: 'upload.php',
        on_upload_finish: function () {
            alert('Uploaded!');
        }
    });

    $('#field1').easyupload({
        url: 'upload.php',
        on_upload_before: function (info) {
            $('#status_1_text').html('');
            $('#progress_1').fadeIn(150);
            $('#status_1,#status_1_total').css({width: 0});
        },
        on_progress: function (progress) {
            $('#status_1').css({width: progress.progress_file + '%'});
            $('#status_1_total').css({width: progress.progress_total + '%'});
            $('#status_1_text').html('Sending files <b>' + progress.current_file + '</b> / <b>' + progress.total_files + '</b> ');
        },
        on_upload_file: function (data) {
            $('#status_1').css({width: 0});
            $('#status_1_text_total').append('<li>File <b>' + data.data.name + '</b> successfully uploaded to the server.</li>')
        },
        on_upload_error: function (p) {
            $('#status_1_text_total').append('<li class="text-danger">File error: <b>' + p.file_name + '</b>. The server reported an error. The uploaded file size exceeds the setting on the server.</li>');
        },
        on_upload_finish: function () {
            $('#progress_1').fadeOut(500);
            $('#status_1_text_total').append('<li class="text-primary">All files successfully uploaded to the server.</li>');
        },
        max_file_size: 2.5 * 1024 * 1024,
        on_max_file_size: function (data) {
            $('#status_1_text_total').append('<li class="text-danger">File error: File <b>' + data.name + '</b> is too large, it is more than 2.5MB</li>');
        },
        cancel_element: '#cancel_upload',
        on_upload_cancel: function (data) {
            $('#progress_1').fadeOut(500);
            $('#status_1_text_total').append('<li class="text-primary">Upload file <b>' + data.file_name + '</b> canceled.</li>');
        },
        data: {
            id: 6,
            extra_param: 'all'
        }
    });

    $('#field2').easyupload({
        url: 'upload.php?id=5',
        drop_element: '#drop_files_here',
        on_upload_before: function (info) {
            $('#progress_2').fadeIn(150);
            $('#status_2_total').css({width: 0});
        },
        on_progress: function (progress) {
            $('#status_2_total').css({width: progress.progress_total + '%'}).html(parseInt(progress.progress_total) + '%');
            $('#status_2_text').html('Sending files <b>' + progress.current_file + '</b> / <b>' + progress.total_files + '</b> ');
        },
        on_upload_finish: function () {
            $('#progress_2').fadeOut(500, function () {
                $('#status_2_total').css({width: 0});
            });
        }
    });

    $('#field3').easyupload({
        url: 'upload.php',
        on_upload_before: function () {
            $('#status_3_text_total').html('Files uploading...');
        },
        on_upload_finish: function () {
            $('#status_3_text_total').html('The files were uploaded');
        }
    });

    $('#field4').easyupload({
        url: 'upload.php',
        submit_element: '#send_button_4',
        on_upload_before: function () {
            $('#status_4_text_total').html('Files uploading...');
        },
        on_upload_finish: function () {
            $('#status_4_text_total').html('The files were uploaded');
        }
    });
});