#jQuery Easy Upload File Plugin

Version: **2.4.0**

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
**selector** - an object that is a form element `<input type="file">`

COMING SOON...
OR SEE EXAMPLES...


###Changelist

####v 2.4.0
- Added a new property `submit_element` as element ID. This is a button whitch sends the selected files by clicking on it.

####v 2.3.0
- Added a new property `drop_element` as element ID. It's makes dropable area for file uploading.