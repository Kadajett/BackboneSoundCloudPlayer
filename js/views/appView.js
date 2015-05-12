var app = app || {};

$(function(){
  app.AppView = Backbone.View.extend({
    el: $('#appView'),
    playingImage: $('#playingImage'),
    playedPercentage: $('#progressBar'),
    searchInput: $('#searchInput'),
    setPlayImage: function(image){
      if(image){
        this.playingImage.attr("src", image);
      }else{
        this.playingImage.attr("src", 'http://img3.wikia.nocookie.net/__cb20120804030609/mlpfanart/images/6/6f/Soundcloud_logo.png')
      }
    },
    initialize: function(){
      var self = this;
      setInterval(function() {
            if(app.currentSound){
              self.playedPercentage.css('width', app.currentSound.attributes.getPercentagePlayed() + "%");
            }
        }, 100)
      app.songs_collection.fetch().done(function(){
        app.songs_collection_view = new app.SongsCollectionView();
      })
    //   SC.stream("/tracks/204870469", function(sound){
    // // app.currentSound = sound;
    // app.currentSound = new app.SongModel(sound);
    // app.currentSound.attributes.play();
    // self.setPlayImage();
    // });

    },
    events: {
      'click #playButton': 'playMusic',
      'click #searchButton': 'startSearch',
      "keyup #searchInput" : "keyPressEventHandler"
    },
    keyPressEventHandler: function(event){
      if(event.keyCode == 13){
        this.startSearch();
      }
    },
    startSearch: function(){
      var self = this;
      app.songs_collection.reset();
      app.songs_collection.setParams({q: self.searchInput.val()})
      app.songs_collection.fetch();
    },
    getTracks: function(){

    },
    pauseMusic: function(){
      app.currentSound.attributes.pause();
    },
    playMusic: function(){
      app.currentSound.attributes.togglePause();
    }
  })
})
