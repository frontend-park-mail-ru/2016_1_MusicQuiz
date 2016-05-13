define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game'),
		Audio = require('models/audio'),
		WaveSurfer = require('wavesurfer');


	var gameView = Backbone.View.extend({
		template: tmpl,
		events: {
			"click .container__game ": "playAudio",
			"click .song_name": "stopAudio"
		},
		initialize: function() {
			this.render()
		},

		render: function() {
			this.$el.html(this.template)
			return this;
		},

		show: function () {
            this.trigger('show');
            this.$el.show();
        },

		hide: function() {
			this.$el.hide()
		},

		playAudio: _.once(function() {

			var wavesurfer = WaveSurfer.create({
			    container: '#waveform',
			    waveColor: '#000066',
			    progressColor: '#000066',
			    fillParent: true,
			    height: 96,
			    hideScrollbar: true,
			    barWidth: 1,
			    pixelRatio: 1,
			    loopSelection: false,
  				backend: 'MediaElement'/*,
			    cursorColor : 'transparent'*/
			});

			wavesurfer.on('ready', function () {
			    wavesurfer.play();
			});
			wavesurfer.load('/api/music/1');
			
		}),

		stopAudio: function() {
			$('#audio')[0].stop()
		},


	})

	return new gameView()
});