define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/login'),
		User = require('models/user'),
		Client = require('models/client');

	var loginView = Backbone.View.extend({
		template: tmpl,

		events: {
			"submit ": "tryLogin"
		},

		initialize: function () {
			this.render();
			this.listenTo(Client.getSession(), 'formError', this.showError);
		},

		render: function () {
			this.$el.html(this.template())
			return this
		},

		show: function () {
            this.trigger('show');
            this.$el.show();
        },

		hide: function () {
			this.$el.hide()
		},

		tryLogin: function (e) {
			e.preventDefault()

        	fields = {
		        'email': this.$el.find('.sign-form__email'),
		        'password': this.$el.find('.sign-form__password')
		    }

			var userData = {
        		email: fields.email.val(),
        		password: fields.password.val()
      		};

			var user = new User();
			var errorField = this.$el.find('.sign-form-error').text('');

			var session = Client.getSession()

			if (userData.password.length === 0 || userData.email.length === 0) {
				this.showError('Ошибка! Неверный логин и/или пароль!!!');
			} 
			else {
				Client.login(userData.email, userData.password);
				//console.log(Client.getSession().username)
				//session.login(userData.email, userData.password);
			}


		},
		showError: function (err) {
			errorField = this.$el.find('.sign-form-error').text(err);
		}
	})

	return new loginView()
});