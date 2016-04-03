define(function(require){

    var Backbone = require('backbone'),
        MainView = require('views/main'),
        LoginView = require('views/login'),
        SignupView = require('views/signup'),
        GameView = require('views/game'),
        ScoreboardView = require('views/scoreboard'),
        ViewManager = require('views/viewManager')
    var $page = $('#page');

    _.each([MainView,
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
            '*default': 'defaultActions'
        },

        defaultActions: function () {
            //$page.html(MainView.render().el)
            this.navigate('main')
            MainView.show()
        },
        scoreboardAction: function () {
           // $page.html(ScoreboardView.render().el)
            ScoreboardView.show()
        },
        gameAction: function () {
          //  $page.html(GameView.render().el)
            GameView.show()
        },
        loginAction: function () {
          //  $page.html(LoginView.render().el)
            LoginView.show()
        },
        signupAction: function () {
          //  $page.html(SignupView.render().el)
            SignupView.show()
        }
    });

    return new Router();
});