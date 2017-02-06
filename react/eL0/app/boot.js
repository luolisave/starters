var React = window.React;
var ReactDOM = window.ReactDOM;

ReactDOM.render((
    <ReactApp.com.fxrate></ReactApp.com.fxrate>
), document.getElementById('reactAppDiv'));

/*
 * Boot with Class name
*/
function renderEls(elements) {
    for (var i = 0; i < elements.length; i++) {
        if( $(elements[i]).attr('meta') !== undefined ) {
            var meta = $(elements[i]).attr('meta');
        }
        ReactDOM.render(<ReactApp.com.fxrate meta={meta} />, elements[i]);
    }
}

renderEls(document.getElementsByClassName("OttFxRate"));