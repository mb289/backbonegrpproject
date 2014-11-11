(function(window, undefined) {
    "use strict";
    
    var containerView = Backbone.View.extend({
        tagName: "div",
        idName: "container",
        initialize: function(opts) {
            this.options = _.extend({}, {
                    $container: $('#viewerCanvas')
                },
                opts
            );
            //put element into DOM
            this.options.$container.append(this.el);
            this.render();
        },
        template: "<h1>{title}</h1><hr><ul><li>{authors}</li><li>{categories}</li></ul>",
        render: function() {
            this.el.innerHTML = _.template(this.template, this.options);
        }
    });

    function GoogleBook(options) {
            this.options = _.extend({}, options, {
                key: "AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI",
            });
            this.init();
        }
        //https://www.googleapis.com/books/v1/volumes?q=search+terms:keyes&key=AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI
    GoogleBook.prototype.queryAPI = function(search, terms) {
        var url = [
            "https://www.googleapis.com/books/v1/volumes",
            "?q=search+",
            this.options.search,
            "terms:",
            this.options.terms,
            "keyes&key=AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI",
            this.options.key,
        ];
        return $get(url.join('')).then(function() {
            return arguments[0];
        });
    };
    GoogleBook.prototype.makeGoogleBookRequest = function(input) {
        $.when(
            this.queryAPI("search", input)
        ).then(function() {
            if (!arguments[0] ||
                !arguments[0].response ||
                !arguments[0].response.books ||
                !(arguments[0].response.books instanceof Array)
            ) {
                throw new Error("array of books from queryAPI");
            }
            arguments[0].response.books.forEach(function(data) {
                new ContainerView(data);
            });
        });
    };
    GoogleBook.prototype.init = function() {
        var self = this;
        this.GoogleBook().then(function(input) {
            self.makeGoogleBookRequest(input);
        });

    };
    window.GoogleBook = GoogleBook;
})(window, undefined);
