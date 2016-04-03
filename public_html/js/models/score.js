define(function(require){

    var Backbone = require('backbone')

    var ScoreboardModel = Backbone.Model.extend({

    	default: {
    		'name': '',
    		'score': 0
    	},

    	initialize: function() {}
    });

    return ScoreboardModel;
});