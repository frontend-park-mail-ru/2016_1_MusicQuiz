define(function(require){

    var Backbone = require('backbone'),
        MainMenuView = require('views/main'),
        LoginView = require('views/login'),
        SignupView = require('views/signup'),
        GameView = require('views/game'),
        MenuView = require('views/menu'),
        ScoreboardView = require('views/scoreboard'),
        ViewManager = require('views/viewManager'),
        Session = require('models/session'),
        Client = require('models/client')
    var $page = $('#page');

    _.each([MainMenuView,
        MenuView,
        GameView,
        ScoreboardView,        
        LoginView,
        SignupView], function(view) {
        ViewManager.addView(view);
    });

    var Router = Backbone.Router.extend({
        routes: {
            'game': 'gameAction',
            'scoreboard': 'scoreboardAction',
            'login': 'loginAction',
            'signup': 'signupAction',
            'menu': 'menuAction',
            'main': 'navigateAction',
            '*default': 'navigateAction'
            
        },
        initialize: function () {
            this.listenTo(Client.getSession(), 'login', function () { this.navigate('#main', {trigger: true})}.bind(this));
        },
        defaultActions: function () {
            this.navigate('main')
            MainMenuView.show()
        },
        scoreboardAction: function () {
            ScoreboardView.show()
        },
        gameAction: function () {
            GameView.show()
        },
        loginAction: function () {
            LoginView.show()
        },
        signupAction: function () {
            SignupView.show()
        },
        menuAction: function () {
            MenuView.show()
        },
        defaultActions: function () {
            MainMenuView.show()
        },
        navigateAction: function () {
            this.navigate('menu')
            MainMenuView.show()
        }
    });

    return new Router();
});