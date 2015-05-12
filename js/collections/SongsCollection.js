var app = app || {};

app.SongsCollection = Backbone.Collection.extend({
    model: app.SongModel,
    url: function(res) {
        var self = this;
        var time = Date.now();
        var list = null;

        if (self.params) {
            return 'https://api.soundcloud.com/tracks?streamable=true&client_id=f450934db7fc221db76648ea6d02b741&' + self.params;
        }

        return 'https://api.soundcloud.com/tracks?streamable=true&client_id=f450934db7fc221db76648ea6d02b741';
    },
    setParams: function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (!object[key]) {
                    delete object[key];
                }
            }
        }
        this.params = $.param(object);
    },
    clearParams: function() {
        this.params = null;
    }
})

app.songs_collection = new app.SongsCollection();
