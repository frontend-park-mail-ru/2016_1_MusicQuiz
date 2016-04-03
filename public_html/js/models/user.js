define(function(require){

    var Backbone = require('backbone')
    var $ = require('jquery')

    var UserModel = Backbone.Model.extend({

    	default: {
    		name: "",
    		email: "",
    		password: ""
    	},

    	initialize: function() {},

    	validate: function(attrs, options) {

            loginValidator = /^[a-z0-9~!$%^&*_=+]*$/i
    		if($.trim(attrs.login) === "" || !loginValidator.test($.trim(attrs.login))) {
    			var error = "Error: Invalid login"
    			return error
    		}

            emailValidator = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            if($.trim(attrs.email) === "" || !emailValidator.test($.trim(attrs.email))) {
                var error = "Error: Invalid e-mail"
                return error
            }

            if($.trim(attrs.password).length < 6) {
                var error = "Error: Invalid password"
            }


    	}
    });




    return UserModel;
});