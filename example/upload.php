<?php
$json = array();
$json['result'] = 'All files are uploaded!';
$json['action'] = 'some_action';
$json['data'] = array('name' => $_FILES['file']['name'], 'size' => $_FILES['file']['size']);
$json['return_data_to_client'] = $_POST;

echo json_encode ($json);