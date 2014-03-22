/*jshint laxcomma: true*/
(function () {
    "use strict";

    /* Determine whether the given color is a valid CSS3 color
     * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
     */
    var colorPatterns = [

      // Hex codes (More restrictive on the top)
        '#[0-9a-f]{6}'
      , '#[0-9a-f]{3}'

      // HSL codes
      // The numbers regexs are more relaxed than what is valid
      //   - Any number of decimals are allowed
      //   - The hue is not restricted to [0 - 360]
      //   - The saturation/light is not restricted to [0% - 100%]
      , 'hsl\\s*\\(\\s*[0-9.]*\\s*,\\s*[0-9.]*%\\s*,\\s*[0-9.]*%\\s*\\)'
      , 'hsla\\s*\\(\\s*[0-9.]*\\s*,\\s*[0-9.]*%\\s*,\\s*[0-9.]*%\\s*,\\s*[0-9.]*\\s*\\)'

      // RGB codes
      , 'rgb\\s*\\(\\s*[0-9.]*\\s*,\\s*[0-9.]*\\s*,\\s*[0-9.]*\\s*\\)'
      , 'rgba\\s*\\(\\s*[0-9.]*\\s*,\\s*[0-9.]*\\s*,\\s*[0-9.]*\\s*,\\s*[0-9.]*\\s*\\)'

      , 'aliceblue'
      , 'antiquewhite'
      , 'aqua'
      , 'aquamarine'
      , 'azure'
      , 'beige'
      , 'bisque'
      , 'black'
      , 'blanchedalmond'
      , 'blue'
      , 'blueviolet'
      , 'brown'
      , 'burlywood'
      , 'cadetblue'
      , 'chartreuse'
      , 'chocolate'
      , 'coral'
      , 'cornflowerblue'
      , 'cornsilk'
      , 'crimson'
      , 'cyan'
      , 'darkblue'
      , 'darkcyan'
      , 'darkgoldenrod'
      , 'darkgray'
      , 'darkgreen'
      , 'darkgrey'
      , 'darkkhaki'
      , 'darkmagenta'
      , 'darkolivegreen'
      , 'darkorange'
      , 'darkorchid'
      , 'darkred'
      , 'darksalmon'
      , 'darkseagreen'
      , 'darkslateblue'
      , 'darkslategray'
      , 'darkslategrey'
      , 'darkturquoise'
      , 'darkviolet'
      , 'deeppink'
      , 'deepskyblue'
      , 'dimgray'
      , 'dimgrey'
      , 'dodgerblue'
      , 'firebrick'
      , 'floralwhite'
      , 'forestgreen'
      , 'fuchsia'
      , 'gainsboro'
      , 'ghostwhite'
      , 'gold'
      , 'goldenrod'
      , 'gray'
      , 'green'
      , 'greenyellow'
      , 'grey'
      , 'honeydew'
      , 'hotpink'
      , 'indianred'
      , 'indigo'
      , 'ivory'
      , 'khaki'
      , 'lavender'
      , 'lavenderblush'
      , 'lawngreen'
      , 'lemonchiffon'
      , 'lightblue'
      , 'lightcoral'
      , 'lightcyan'
      , 'lightgoldenrodyellow'
      , 'lightgray'
      , 'lightgreen'
      , 'lightgrey'
      , 'lightpink'
      , 'lightsalmon'
      , 'lightseagreen'
      , 'lightskyblue'
      , 'lightslategray'
      , 'lightslategrey'
      , 'lightsteelblue'
      , 'lightyellow'
      , 'lime'
      , 'limegreen'
      , 'linen'
      , 'magenta'
      , 'maroon'
      , 'mediumaquamarine'
      , 'mediumblue'
      , 'mediumorchid'
      , 'mediumpurple'
      , 'mediumseagreen'
      , 'mediumslateblue'
      , 'mediumspringgreen'
      , 'mediumturquoise'
      , 'mediumvioletred'
      , 'midnightblue'
      , 'mintcream'
      , 'mistyrose'
      , 'moccasin'
      , 'navajowhite'
      , 'navy'
      , 'oldlace'
      , 'olive'
      , 'olivedrab'
      , 'orange'
      , 'orangered'
      , 'orchid'
      , 'palegoldenrod'
      , 'palegreen'
      , 'paleturquoise'
      , 'palevioletred'
      , 'papayawhip'
      , 'peachpuff'
      , 'peru'
      , 'pink'
      , 'plum'
      , 'powderblue'
      , 'purple'
      , 'red'
      , 'rosybrown'
      , 'royalblue'
      , 'saddlebrown'
      , 'salmon'
      , 'sandybrown'
      , 'seagreen'
      , 'seashell'
      , 'sienna'
      , 'silver'
      , 'skyblue'
      , 'slateblue'
      , 'slategray'
      , 'slategrey'
      , 'snow'
      , 'springgreen'
      , 'steelblue'
      , 'tan'
      , 'teal'
      , 'thistle'
      , 'tomato'
      , 'turquoise'
      , 'violet'
      , 'wheat'
      , 'white'
      , 'whitesmoke'
      , 'yellow'
      , 'yellowgreen'
    ];

    // Assume that the longest regEx is also the strictest (true for color names)
    colorPatterns.sort(function (a, b) { return b.length - a.length; })

    var colorRegEx = new RegExp('(' + colorPatterns.join('|') + ')', 'i');

    function replaceFirstColorInTextNode(textNode, parentElement) {
        var textContent = textNode.textContent,
            colorMatch  = colorRegEx.exec(textContent);

        console.log(colorMatch, textContent, colorRegEx);

        if (colorMatch) {
            // A match was found. Let's get the match out.
            var color    = colorMatch[0],
                matchIdx = colorMatch.index,
                prefix   = textContent.substr(0, matchIdx),
                suffix   = textContent.substr(matchIdx + color.length);

            if (prefix) {
                parentElement.insertBefore(document.createTextNode(prefix), textNode);
            }

            // TODO (UU): This will fail if the parentElement is inside an
            // `svg` Or if otherwise it cannot take a `span` child
            var colorSpanNode = document.createElement('span');
            colorSpanNode.setAttribute('style', 'color: ' + color);
            colorSpanNode.textContent = color;

            parentElement.insertBefore(colorSpanNode, textNode);

            if (suffix) {
                var suffixNode = document.createTextNode(suffix);
                parentElement.replaceChild(suffixNode, textNode);
                return suffixNode;
            } else {
                parentElement.removeChild(textNode);
                return null;
            }
        } else {
            // No more matches, nothing to see here, move on.
            return null;
        }
    }

    function replaceColorsInElement(element) {
        var childNodes = element.childNodes,
            numNodes = childNodes.length,
            remainingTextNode;

        for(var ii = 0; ii < numNodes; ii++) {
            if (childNodes[ii].nodeType === Node.TEXT_NODE) {
                remainingTextNode = childNodes[ii];

                // TODO (UU): There probably is a better way to write this loop
                // to capture all the color groups at once and avoid rewriting
                // the DOM multiple times.
                while (remainingTextNode) {
                    remainingTextNode = replaceFirstColorInTextNode(remainingTextNode, element);
                }
            } else if (childNodes[ii].nodeType === Node.ELEMENT_NODE) {
                // Spare `<script>` tags
                if (childNodes[ii].nodeName.toUpperCase() !== 'SCRIPT') {
                    replaceColorsInElement(childNodes[ii]);
                }
            } else {
                /* Ignore all other kind of nodes */
            }
        }
    }

    function justShowMeTheColors_(optElem) {
        replaceColorsInElement(optElem || document.body);
    }

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () { return { justShowMeTheColors: justShowMeTheColors_ }; });
    } else {
        // Browser globals
        window.justShowMeTheColors = justShowMeTheColors_;
    }
})();
