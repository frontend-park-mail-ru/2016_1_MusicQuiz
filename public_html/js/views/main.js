define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/main'),
		Session = require('models/session'),
		Client = require('models/client')


	var mainView = Backbone.View.extend({

		initialize: function() {
			this.template = tmpl
			this.render()
		},

		data: {
			isAuth: 1
		},

		render: function() {
			var html = this.template({
				'username': Client.getSession().get('username')/*,
				'score': Client.getSession().get('score')*/
			})
			this.$el.html(html)
			return this;
		},

		show: function () {
			this.render()
            this.trigger('show');
            this.$el.show();
            console.log(Client.getSession().get('username'))
        },

		hide: function() {
			this.$el.hide()
		}
	})

	return new mainView();
});