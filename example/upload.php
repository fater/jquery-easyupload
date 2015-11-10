<?php
$json = [];
$json['result'] = 'All files are uploaded!';
$json['action'] = 'some_action';

$json['data'] = [];
foreach($_FILES as $item)
{
	$json['data'][] = array('name' => $item['name'], 'size' => $item['size']);
}

$json['return_data_to_client'] = $_POST;

echo json_encode ($json);