Just Show Me The Colors
=======================

There is a [demo](http://musically-ut.github.io/just-show-me-the-colors/) of this library in use.

Import this library, call `justShowMeTheColors()` after the DOM has rendered,
and see all _colors_ mentioned in the document get rendered in the _correct_
color.

````HTML
<html>
    <body>
        ...

        <script src="./just.show.me.the.colors.js"></script>
        <script>
            justShowMeTheColors();
        </script>
    </body>
</html>
````

Works on the following format of colors:

 - red
 - orangered
 - #456aad
 - #46d
 - hsl(240, 75%, 75%)
 - hsla(240, 75%, 75%, 0.5)
 - rgb(123, 45, 67)
 - rgba(123, 45, 67, 0.5)

If you do not want colors to be replaced in some elements, add the data attribute
`data-do-not-color` to them and their children will be spared.

If you want colors to be replaced on only one element (and all its children),
then you can call `justShowMeTheColors(elementToColor)`.

Dependencies
============

None. This should be compatible with _most_ browsers out there.

TODO
====

 - A _bookmarklet_ version
 - Handle text inside `svg` 
 - Not optimized for speed
