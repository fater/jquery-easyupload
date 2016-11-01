![](https://img.shields.io/badge/Version-2.4-brightgreen.svg)
![](https://img.shields.io/badge/Technologies-jQuery-blue.svg)

#jQuery Easy Upload File Plugin

Version: **2.4.1**

##What does the plugin
- The plugin allows you to send multiple files to the server with Ajax method without form and page reload;
- The plugin allows to use drop area to send files;
- The plugin allows you to configure callbacks and events.

##Dependences
* **jQuery** - only jQuery library required for this plugin

##Bower Installation
`bower install jquery-easyupload --save` 

##How to use
Attach file to HTML page
```html
// jQuery Required
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>

// Easy File Upload Plugin
<script src="url-to-module/jquery-easyupload/dist/jquery.easyupload.min.js"></script>
```

##Using the initialization
```js
$([selector]).easyupload ({arguments});
```
**selector** - selector of form element `<input type="file">`

**arguments** - a JSON object contains the following parameters:

> The arguments are not required
  
Parameter|Description|Type|Default
---|---|---|---
**url** | php file location | *Text* | document.URL
**data** | Data sent to the server as an object | Object | {}
**max_file_size** | Maximum file size. If size equal 0 then unlimited size | Integer | 0
**file_name** | The name of $_FILES value  | Text | $_FILES['file']
**cancel_element** | $(Selector) of cancel element | Text | '' (Not set)
**drop_element** | $(Selector) of drop area element | Text | '' (Not set)
**submit_element** | $(Selector) of submit element. This may be a button. If this param is set on select (on change) **selector** can not be able to send automatically. | Text | '' (Not set)
**on_max_file_size** | Callback method: Run if the file size more than **max_file_size** value | Function | |


###Changelist

####v 2.4.1
- Soft code refactoring (Logic is not changed).

####v 2.4.0
- Added a new property `submit_element` as element ID. This is a button whitch sends the selected files by clicking on it.

####v 2.3.0
- Added a new property `drop_element` as element ID. It's makes dropable area for file uploading.