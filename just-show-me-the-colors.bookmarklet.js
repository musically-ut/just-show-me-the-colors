/** Bookmarklet for just-show-me-the-colors.
 * See http://musically-ut.github.io/just-show-me-the-colors/ for the
 * actual bookmark-let link.
 */
!function () {
    if (typeof window.justShowMeTheColors === 'undefined') {
        var script = document.createElement('script');
        script.onload = function () { window.justShowMeTheColors(); };
        script.src = '//musically-ut.github.io/just-show-me-the-colors/just-show-me-the-colors.min.js';
        document.body.appendChild(script);
    } else {
        window.justShowMeTheColors();
    }
}();
