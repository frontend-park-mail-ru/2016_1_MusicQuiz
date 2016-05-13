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
    			var error = "Ошибка: невалидный логин"
    			return error;
    		}

            emailValidator = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            if($.trim(attrs.email) === "" || !emailValidator.test($.trim(attrs.email))) {
                var error = "Ошибка: невалидный e-mail"
                return error;
            }

            $.trim(attrs.password)
            $.trim(attrs.submitPassword)
            
            if(attrs.password.length < 6) {
                var error = "Ошибка: невалидный пароль"
                return error;
            }

            if(attrs.password !== attrs.submitPassword) {
                var error = "Ошибка: пароли не совпадают"
                return error;
            }

    	}
    });




    return UserModel;
});