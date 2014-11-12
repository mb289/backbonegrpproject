//https://www.googleapis.com/books/v1/volumes?q=search+terms:keyes&key=AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI
window.onload = app;

// runs when the DOM is loaded
function app() {

    // load some scripts 
    loader.load({
        url: "./bower_components/jquery/dist/jquery.min.js"
    }, {
        url: "./bower_components/lodash/dist/lodash.min.js"
    }, {
        url: "./bower_components/backbone/backbone.js"
    }, {
        url: "./bower_components/pathjs/path.min.js"
    }, {
        url: "./js/views/book.js"
    }).then(function() {
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        
        var items = new GoogleBook();
        //start app?
    })

}

