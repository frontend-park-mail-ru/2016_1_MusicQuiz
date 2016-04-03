define(function(require){

	var Backbone = require('backbone'),
		ScoreboardModel = require('models/score'),
		_ = require('underscore')

	var ScoreBoard = Backbone.Collection.extend({

		model: ScoreboardModel,

		comparator : function(userScore) {
			return -userScore.get('score')
		}

	})

	return ScoreBoard
})

