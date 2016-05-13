define(function(require){

    var Backbone = require('backbone')
    var $ = require('jquery')
    var User = require('models/user')

    var Session = Backbone.Model.extend({
        defaults: {
            id: '',
            username: '',
            score: 0,
    		authorized: false
        },
    	
    	initialize: function() {
        },

        login: function (email, password) {

            $.ajax({
                type: 'PUT',
                url: '/api/session/',
                data: JSON.stringify({
                    'email': email,
                    'password': password
                }),
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                success: function (resp) {
                    this.set('id', resp.id)
                    this.set('authorized', true)
                    this.userData()
                    this.trigger('login')
                }.bind(this),
                error: function () {
                    this.trigger('formError', 'Ошибка! Неверный логин и/или пароль!')
                }.bind(this)
            })
        },

        logout: function () {
            $.ajax({
                type: 'DELETE',
                url: '/api/session/',
                dataType: 'json',
                contentType: 'application/json',
                success: function () {
                    this.set('authorized', false)
                }
            })
        },

        signup: function (login, email, password) {
            $.ajax({
                type: 'PUT',
                url: '/api/user',
                dataType: 'json',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    'login': login,
                    'email': email,
                    'password': password
                }),
                success: function () {
                    this.login(email, password)
                }.bind(this),
                error: function () {
                    this.trigger('formError', 'Ошибка! Данная почта уже используется!')
                }.bind(this)
            })
        },

        isAuthorized: function() {
            return this.get('authorized');
        },

        userData: function() {
            var self = this;
            var response;
            $.ajax({
                type: 'GET',
                url: '/api/user/' + this.id,
                async: false,
                dataType: 'json',
                success: function(resp) {
                    console.log(resp)
                    this.set('username', resp.login)
                    console.log(this.get('username'))
                }.bind(this),
                error: function(resp){
                }.bind(this)
            }).done(function(){

            })
        }
    })

        return Session

    });

