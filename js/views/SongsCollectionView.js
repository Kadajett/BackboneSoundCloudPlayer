var app = app || {};

app.SongsCollectionView = Backbone.View.extend({
    el: $('#songListContainer'),
    initialize: function() {
        var self = this;
        app.songs_collection.on('add', this.renderSingle, this)
        app.songs_collection.on('reset', this.deleteAr, this)
        this.render();
        setInterval(function() {
            self.el.style.height = (window.innerHeight - 50) + "px"
        }, 100)
    },
    deleteAr: function() {
        $(this.el).html('');
    },
    renderSingle: function(Song) {
        var self = this;
        $(self.el).append(new app.SongView({
            model: Song
        }).render().el)
    },
    render: function() {
        var self = this;
        _.each(app.songs_collection.toArray(), function(Song) {
            $(self.el).append(new app.SongView({
                model: Song
            }).render().el);


        })

    }
})
