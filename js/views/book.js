(function(window, undefined) {
    //"use strict";

    function GoogleBook() {
        this.Routing = new bookRouting();
    }

    var ContainerView = Backbone.View.extend({
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
        template: "<img src={volumeInfo.imageLinks.thumbnail}/>",
        render: function() {
            this.el.innerHTML = _.template(this.template, this.model.attributes);
        }
    });

    var BookListing = Backbone.Model.extend({
        initialize: function() {
            this.view = new ContainerView({
                model: this
            });
        }
    });

    var BookListings = Backbone.Collection.extend({

        createInputObject: function() {
            var input = {};
            $(':input').each(function() {
                input[this.name] = this.value;
            })
            return input;
        },

        model: BookListing,

        apikey: "AIzaSyBU9KgSbBKQMno6QgEoB75TPSRN1c16fLI",

        url: function() {
            return [
                "https://www.googleapis.com/books/v1/volumes?q=",
                this.createInputObject().genre,
                "&key=",
                this.apikey
            ].join('');
        },

        parse: function(data) {
            console.log(data);
            return data.items;
        },

        startRequests: function(){
            if(this.createInputObject().genre){
                return this.fetch();
            }
        }

    });

    var AppView = Backbone.View.extend({
        el: document.querySelector('body'),
        initialize: function(){
            this.bookCollection = new BookListings();
        },
        events: {
            "submit form": "search"
        },
        search: function(event){
            event.preventDefault();
            this.bookCollection.startRequests();
        }
    })

    var bookRouting = Backbone.Router.extend({

        initialize: function() {
            this.appView = new AppView();
            Backbone.history.start();
        },

        routes: {
            "*anything": "showResults"
        },

        showResults: function() {
            // access the value of the input, if not empty then fetch
            this.appView.bookCollection.startRequests();
        }

    })

    window.GoogleBook = GoogleBook;

})(window, undefined);
