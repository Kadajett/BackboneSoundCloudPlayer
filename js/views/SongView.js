var app = app || {};

app.SongView = Backbone.View.extend({
    template: _.template($('#songTemplate').html()),
    commentTemplate: _.template($('#commentTemplate').html()),
    commentBox: $('#commentsBox'),
    initialize: function() {
        console.log('Init Song View');

        this.render();
    },
    events: {
        'click .playButton': 'playSong'
    },
    playSong: function() {
        var self = this;

        if (app.currentSound) {
            self.commentBox.html('');
            app.currentSound.attributes.stop();
            delete app.currentSound;
        }

        SC.stream("/tracks/" + this.model.id,{
            ontimedcomments: function(comments) {
                self.commentBox.prepend(self.commentTemplate(comments[0]))
            }
        }, function(sound) {
            // app.currentSound = sound;
            app.app_view.setPlayImage(self.model.attributes.artwork_url);
            app.currentSound = new app.SongModel(sound);
            app.currentSound.attributes.play();
        });
    },
    deleteEl: function() {
        this.remove();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})
