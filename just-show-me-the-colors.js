/*jshint laxcomma: true*/
(function () {
    "use strict";

    /* The value of Node.TEXT_NODE and Node.ELEMENT_NODE as they are not defined
     * on IE7
     */
    var TEXT_NODE = 3,
        ELEMENT_NODE = 1;

    /* Determine whether the given color is a valid CSS3 color
     * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
     */
    var colorPatterns = [

      // Hex codes
        '#[0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f][0-9a-f])?'

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

      , '\\baliceblue\\b'
      , '\\bantiquewhite\\b'
      , '\\baqua\\b'
      , '\\baquamarine\\b'
      , '\\bazure\\b'
      , '\\bbeige\\b'
      , '\\bbisque\\b'
      , '\\bblack\\b'
      , '\\bblanchedalmond\\b'
      , '\\bblue\\b'
      , '\\bblueviolet\\b'
      , '\\bbrown\\b'
      , '\\bburlywood\\b'
      , '\\bcadetblue\\b'
      , '\\bchartreuse\\b'
      , '\\bchocolate\\b'
      , '\\bcoral\\b'
      , '\\bcornflowerblue\\b'
      , '\\bcornsilk\\b'
      , '\\bcrimson\\b'
      , '\\bcyan\\b'
      , '\\bdarkblue\\b'
      , '\\bdarkcyan\\b'
      , '\\bdarkgoldenrod\\b'
      , '\\bdarkgray\\b'
      , '\\bdarkgreen\\b'
      , '\\bdarkgrey\\b'
      , '\\bdarkkhaki\\b'
      , '\\bdarkmagenta\\b'
      , '\\bdarkolivegreen\\b'
      , '\\bdarkorange\\b'
      , '\\bdarkorchid\\b'
      , '\\bdarkred\\b'
      , '\\bdarksalmon\\b'
      , '\\bdarkseagreen\\b'
      , '\\bdarkslateblue\\b'
      , '\\bdarkslategray\\b'
      , '\\bdarkslategrey\\b'
      , '\\bdarkturquoise\\b'
      , '\\bdarkviolet\\b'
      , '\\bdeeppink\\b'
      , '\\bdeepskyblue\\b'
      , '\\bdimgray\\b'
      , '\\bdimgrey\\b'
      , '\\bdodgerblue\\b'
      , '\\bfirebrick\\b'
      , '\\bfloralwhite\\b'
      , '\\bforestgreen\\b'
      , '\\bfuchsia\\b'
      , '\\bgainsboro\\b'
      , '\\bghostwhite\\b'
      , '\\bgold\\b'
      , '\\bgoldenrod\\b'
      , '\\bgray\\b'
      , '\\bgreen\\b'
      , '\\bgreenyellow\\b'
      , '\\bgrey\\b'
      , '\\bhoneydew\\b'
      , '\\bhotpink\\b'
      , '\\bindianred\\b'
      , '\\bindigo\\b'
      , '\\bivory\\b'
      , '\\bkhaki\\b'
      , '\\blavender\\b'
      , '\\blavenderblush\\b'
      , '\\blawngreen\\b'
      , '\\blemonchiffon\\b'
      , '\\blightblue\\b'
      , '\\blightcoral\\b'
      , '\\blightcyan\\b'
      , '\\blightgoldenrodyellow\\b'
      , '\\blightgray\\b'
      , '\\blightgreen\\b'
      , '\\blightgrey\\b'
      , '\\blightpink\\b'
      , '\\blightsalmon\\b'
      , '\\blightseagreen\\b'
      , '\\blightskyblue\\b'
      , '\\blightslategray\\b'
      , '\\blightslategrey\\b'
      , '\\blightsteelblue\\b'
      , '\\blightyellow\\b'
      , '\\blime\\b'
      , '\\blimegreen\\b'
      , '\\blinen\\b'
      , '\\bmagenta\\b'
      , '\\bmaroon\\b'
      , '\\bmediumaquamarine\\b'
      , '\\bmediumblue\\b'
      , '\\bmediumorchid\\b'
      , '\\bmediumpurple\\b'
      , '\\bmediumseagreen\\b'
      , '\\bmediumslateblue\\b'
      , '\\bmediumspringgreen\\b'
      , '\\bmediumturquoise\\b'
      , '\\bmediumvioletred\\b'
      , '\\bmidnightblue\\b'
      , '\\bmintcream\\b'
      , '\\bmistyrose\\b'
      , '\\bmoccasin\\b'
      , '\\bnavajowhite\\b'
      , '\\bnavy\\b'
      , '\\boldlace\\b'
      , '\\bolive\\b'
      , '\\bolivedrab\\b'
      , '\\borange\\b'
      , '\\borangered\\b'
      , '\\borchid\\b'
      , '\\bpalegoldenrod\\b'
      , '\\bpalegreen\\b'
      , '\\bpaleturquoise\\b'
      , '\\bpalevioletred\\b'
      , '\\bpapayawhip\\b'
      , '\\bpeachpuff\\b'
      , '\\bperu\\b'
      , '\\bpink\\b'
      , '\\bplum\\b'
      , '\\bpowderblue\\b'
      , '\\bpurple\\b'
      , '\\bred\\b'
      , '\\brosybrown\\b'
      , '\\broyalblue\\b'
      , '\\bsaddlebrown\\b'
      , '\\bsalmon\\b'
      , '\\bsandybrown\\b'
      , '\\bseagreen\\b'
      , '\\bseashell\\b'
      , '\\bsienna\\b'
      , '\\bsilver\\b'
      , '\\bskyblue\\b'
      , '\\bslateblue\\b'
      , '\\bslategray\\b'
      , '\\bslategrey\\b'
      , '\\bsnow\\b'
      , '\\bspringgreen\\b'
      , '\\bsteelblue\\b'
      , '\\btan\\b'
      , '\\bteal\\b'
      , '\\bthistle\\b'
      , '\\btomato\\b'
      , '\\bturquoise\\b'
      , '\\bviolet\\b'
      , '\\bwheat\\b'
      , '\\bwhite\\b'
      , '\\bwhitesmoke\\b'
      , '\\byellow\\b'
      , '\\byellowgreen\\b'
    ];

    var allowSpans = [

        // These elements allow `span` tags inside them natively
        'abbr', 'address', 'article', 'aside', 'b', 'bdi', 'bdo', 'blockquote', 'body', 'button', 'caption', 'cite', 'code', 'data', 'datalist', 'dd', 'dfn', 'dialog', 'div', 'dt', 'em', 'fieldset', 'figure', 'figcaption', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'i', 'kbd', 'label', 'legend', 'li', 'main', 'mark', 'meter', 'nav', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'small', 'span', 'strong', 'sub', 'sup', 'summary', 'td', 'th', 'time', 'u', 'var',

        // These elements allow `span` tags inside them if their parents allow
        // it. Since we descend into an element only if it allows span, when we
        // reach these elements, the parent always allows `span` tags.
        'ins', 'del', 'map', 'noscript', 'a', 'object', 'video', 'audio', 'canvas'
      ];

    function spanValidIn(elem) {
        var elemType = elem.nodeName.toLowerCase();

        for(var ii = 0; ii < allowSpans.length; ii++) {
            if (allowSpans[ii] === elemType) {
                return true;
            }
        }

        if (elemType === 'details') {
            // Technically allowed only if `span` is preceded by `summary`
            // element however, we allow it unconditionally.
            // Garbage In = Garbage Out
            return true;
        }

        if (elemType === 'menu') {
            // `span` are allowed only if the type of the menu is toolbar
            return elem.getAttribute('type') === 'toolbar';
        }

        return false;
    }


    // Assume that the longest regEx is also the strictest (true for color names)
    colorPatterns.sort(function (a, b) { return b.length - a.length; });

    var colorRegEx = new RegExp('(' + colorPatterns.join('|') + ')', 'i');

    function replaceFirstColorInTextNode(textNode, parentElement) {
        var textContent = textNode.textContent,
            colorMatch  = colorRegEx.exec(textContent);

        if (colorMatch) {
            // A match was found. Let's get the match out.
            var color    = colorMatch[0],
                matchIdx = colorMatch.index,
                prefix   = textContent.substr(0, matchIdx),
                suffix   = textContent.substr(matchIdx + color.length);

            if (prefix) {
                parentElement.insertBefore(document.createTextNode(prefix), textNode);
            }

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

    function replaceColorsInElement(element, parentAllowsSpans) {
        var childNodes = element.childNodes,
            numNodes = childNodes.length,
            remainingTextNode,
            currentChild;

        for(var ii = 0; ii < numNodes; ii++) {
            currentChild = childNodes[ii];

            if (currentChild.nodeType === TEXT_NODE && parentAllowsSpans) {
                remainingTextNode = currentChild;

                // TODO (UU): There probably is a better way to write this loop
                // to capture all the color groups at once and avoid rewriting
                // the DOM multiple times.
                while (remainingTextNode) {
                    remainingTextNode = replaceFirstColorInTextNode(remainingTextNode, element);
                }
            } else if (currentChild.nodeType === ELEMENT_NODE) {
                // Do not color the node if the user has set
                // `data-do-not-color` attribute on the node.
                if (currentChild.getAttribute('data-do-not-color') === null) {
                    replaceColorsInElement(currentChild, spanValidIn(currentChild));
                }
            } else {
                /* Ignore all other kind of nodes */
            }
        }
    }

    function justShowMeTheColors_(optElem) {
        var operateOnElem = optElem || document.body;
        replaceColorsInElement(operateOnElem, spanValidIn(operateOnElem));
    }

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () { return { justShowMeTheColors: justShowMeTheColors_ }; });
    } else {
        // Browser globals
        window.justShowMeTheColors = justShowMeTheColors_;
    }
})();
