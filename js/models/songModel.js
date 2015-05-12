var app = app || {};


app.SongModel = Backbone.Model.extend({
    defaults: {
        getPercentagePlayed: function() {
            var currentState = app.currentSound.attributes.onPosition();
            return (currentState.position / currentState.duration) * 100;
        },
        getImage: function(){
          return this.artwork_url || "http://img3.wikia.nocookie.net/__cb20120804030609/mlpfanart/images/6/6f/Soundcloud_logo.png"
        }
    },
    initialize: function() {
        console.log('Song Initialized:', this)
    }
})
