![](https://img.shields.io/badge/Version-2.5-brightgreen.svg)
![](https://img.shields.io/badge/Technologies-jQuery-blue.svg)

# jQuery Easy File Upload Plugin

Version: **2.5.0**

## What does the plugin?

- The plugin allows you to send multiple files to the server only with Ajax method (without page reload);
- The plugin allows to use Drag & Drop area to upload files;
- The plugin allows you to configure callbacks and events.

## Dependencies

* **jQuery** - jQuery are required.

## Install via Bower

`bower install jquery-easyupload --save` 

## How to use

Copy this code to the head section of you site
```html
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>

// Easy File Upload plugin
<script type="text/javascript" src="url-to-module/jquery-easyupload/dist/jquery.easyupload.min.js"></script>

// Button styles
<script type="text/javascript" src="url-to-module/jquery-easyupload/dist/jquery.easyupload.min.css"></script>
```

## Options and initialization
```js
$('#selector').easyupload({/* arguments */});
```
**selector** - Selector for the element `<input type="file" id="selector" />`

**arguments** - JSON object which contains the following parameters:

> The arguments are not required
  
Parameter | Description | Type | Default
--- | --- | --- | ---
**url** | Path to the server address | string | `document.URL`
**data** | Extra data will send to the server | Object | `{}`
**max_file_size** | Maximum file size in bytes.<br />**0** - unlimited size | Integer | `0`
**file_name** | The name of the variable passed in the array (in PHP you will get in `$_FILES['file']`) | string | `'file'`
**cancel_element** | $(Selector) of cancel element | Text | `''` (Not set)
**drop_element** | $(Selector) of drop area element | Text | `''` (Not set)
**submit_element** | $(Selector) of submit element. This may be a button. If this param is set on select (on change) **selector** can not be able to send automatically. | Text | `''` (Not set)
**on_max_file_size** | Callback method: Run callback if file size more than **max_file_size** value | Function | |


### Changelist

#### v 2.5.0
- Code refactoring. Update Readme file

#### v 2.4.1
- Soft code refactoring (Logic is not changed).

#### v 2.4.0
- Added a new property `submit_element` as element ID. This is a button whitch sends the selected files by clicking on it.

#### v 2.3.0
- Added a new property `drop_element` as element ID. It's makes dropable area for file uploading.