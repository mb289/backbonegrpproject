(function(window, undefined) {
    //"use strict";

    function GoogleBook() {
         
        this.bookCollection = new BookListings();
        
        this.Routing();

        }

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
        template: "<h1>{volumeInfo.description}</h1>",
        render: function() {

            this.el.innerHTML = _.template(this.template, this.model);
        }
    });

    var BookListing = Backbone.Model.extend({
        initialize: function(){
            this.view = new containerView({ model: this 
                });
        }
    });

    var BookListings = Backbone.Collection.extend({

        createInputObject: function(){
            var input = {};
            $(':input').each(function(){
                input[this.name] = this.value;
            })
            return input;
        },

        model: BookListing,

        apikey: "AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI",

        url: function(){

            return [
            "https://www.googleapis.com/books/v1/volumes?q=",
            this.createInputObject().genre,
            "&key=",
            this.apikey
            ].join('');
        },

        parse: function(data){
            return data.items;
        },

    });

    // var bookRouting = Backbone.Routing.extend({

    // })

    GoogleBook.prototype.Routing = function() {
        
        var self = this;

        Path.map("#/results").to(function(){

            self.bookCollection.fetch();

    });

        Path.root("#/")
        Path.listen();
};


    window.GoogleBook = GoogleBook;

})(window, undefined);


    
        //https://www.googleapis.com/books/v1/volumes?q=search+terms:keyes&key=AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI
    
    // GoogleBook.prototype.createInputObject = function(){

    //     var input = {};
    //     $(':input').each(function(){
    //         input[this.name] = this.value;
    //     });
    //     console.log(input);
    //     return input;
    // }

    // GoogleBook.prototype.queryAPI = function() {
        
    //     var input = this.createInputObject();

    //     var url = [
    //         "https://www.googleapis.com/books/v1/volumes",
    //         "?q=",
    //         input.genre,
    //         "&key=",
    //         this.options.key,
    //     ].join('');
        
    //     console.log(url);
        
    //     return $.get(url).then(function(data) {
    //         console.log(data);
    //         return data;
    //     });
    // };
    
    // GoogleBook.prototype.makeGoogleBookRequest = function(data) {
    //     $.when(
    //         this.queryAPI(data)
    //     ).then(function(data) {
    //         console.log(data);
    //         //debugger;
    //         if (!(data.items instanceof Array)

    //         ) {
    //             throw new Error("Shit Doesn't Work!");
    //         }
    //         data.items.forEach(function(data) {
    //             new containerView({ model: data});
    //         });
    //     });
    // };
    

