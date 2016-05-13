define(function (require) {

	var Backbone = require('backbone'),
		Session = require('models/session'),
		User = require('models/user'),
		$ = require('jquery');

	var Client = Backbone.Model.extend({
		session: new Session(),

		getSession: function() {
      		return this.session;
    	},

    	login: function(email, password) {
    		this.session.login(email, password)
    	}
	})
	return new Client();
});