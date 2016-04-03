define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/scoreboard'),
		scores = require('collections/score')

	var scoreboardView = Backbone.View.extend({
		template: tmpl,

		initialize: function() {
			
			this.collection = new scores([
				{
					name: 'Гиви',
					score: 7
				},
				{
					name: 'Ахмед',
					score: 4
				},
				{
					name: 'Витас',
					score: 10
				},
				{
					name: 'Насрулла',
					score: 8
				},
				{
					name: 'Ишмат',
					score: 9
				},
				{
					name: 'Буратино',
					score: 2
				},
				{
					name: 'Гоги',
					score: 3
				},
				{
					name: 'Паша-светомузыка',
					score: 1
				},
				{
					name: 'Ирина Аллегрова',
					score: 5
				},
				{
					name: 'Абдурахим',
					score: 6
				}
			])


			this.render()
		},

		render: function() {
			var html = this.template({
				'scores': this.collection.toJSON()
			});
			this.$el.html(html)
			return this
		},

		show: function () {
            this.trigger('show');
            this.$el.show();
        },

		hide: function() {
			this.$el.hide()
		}
	})

	return new scoreboardView()

});