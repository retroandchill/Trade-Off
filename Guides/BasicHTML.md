# HTML Quick Start
## <head> - The Header Tag
The header tag is a section you place only once at the top of the HTML file. The header is pretty much what you expect it to be. Whatever you want loaded FIRST (Ie: Before the actual page content loads in) - You place inside of the head tag. This usually consists of the stylesheets (CSS references), the important Javascript files (Form controllers) and the title of the current page.

```HTML
<head>
    <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="semantic/dist/semantic.min.js"></script>
    <title>Main Page</title>
</head>
```
This probably is an example of what you're most likely going to be seeing at the top of each of your pages. 

### Stylesheet linking
**<link rel="stylesheet" type="text/css" href="<SOMELINK>"** -- This line adds whatever CSS file is pointed to by the href internal link, to the website, allowing the CSS classes to be used in the webpage itself. You most likely will not have to use anything other than the example I listed above unless you add your own CSS class. 
```HTML
<link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">
```
This line will universally add support for EVERYTHING included in Semantic-UI. 

### <script> - Adding javascript
The <script> tag includes javascript to the file. It's the same deal with the Stylesheet linking.

Example 1:
Include everything located in the 'semantic/dist/semantic.min.js' file.
```HTML
<script src="semantic/dist/semantic.min.js"></script>"
```

Example 2:
You can do inline javascript too without pointing it to a file. Don't actually do this.
```HTML
<script>
    var inlineValue = "Don't ever do inline javascript. Conrad will punt a chair across the room in sadness.";
    console.log(inlineValue);
</script>
```

## Body Block
After you close the head block, the remainder of your HTML file can go inside of a body block. This simply says to load all of this content as soon as the header is done loading.

There are a few important things you need to know. 

### <div> - The Divider Tag

This is literally the most important HTML tag you will be using.

The most common way you'll be using this is <div class="something something something">

Example 1:
A simple example in which the CSS elements 'ui' and 'segment' are applied to some content inside of the HTML.
```HTML
<div class="ui segment">
    Hello! This text has CSS stuff added onto it because it's inside a div!
</div>
```

Example 2:
Divs stack. The text "Hello there!" has both the CSS classes "ui" and "segment" applied to it.
However the text "This is a thing" only has the CSS class "ui" applied to it.
```HTML
<div class="ui">
    <div class="segment">
        Hello there!
    </div>
    This is a thing!
</div>
```
