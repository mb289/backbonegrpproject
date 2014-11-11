(function(window, undefined) {
    //"use strict";

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
    
    GoogleBook.prototype.createInputObject = function(){

        var input = {};
        $(':input').each(function(){
            input[this.name] = this.value;
        });
        console.log(input);
        return input;
    }

    GoogleBook.prototype.queryAPI = function() {
        
        var input = this.createInputObject();

        var url = [
            "https://www.googleapis.com/books/v1/volumes",
            "?q=",
            this.input.genre,
            "&key=",
            this.options.key,
        ];
        
        return $.get(url.join('')).then(function(data) {
            return data;
        });
    };
    GoogleBook.prototype.makeGoogleBookRequest = function(data) {
        $.when(
            this.queryAPI("items", data)
        ).then(function(data) {
            console.log(data);
            //debugger;
            if (!(data.items instanceof Array)

            ) {
                throw new Error("Shit Doesn't Work!");
            }
            data.items.forEach(function(data) {
                new ContainerView(data);
            });
        });
    };
    GoogleBook.prototype.init = function() {
        this.makeGoogleBookRequest("The Alchemist");

    };
    window.GoogleBook = GoogleBook;
})(window, undefined);
