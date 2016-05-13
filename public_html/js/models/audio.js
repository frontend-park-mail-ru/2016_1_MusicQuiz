define(function(require){

    var Backbone = require('backbone')
    var $ = require('jquery')
    var User = require('models/user')

    var Audio = Backbone.Model.extend({

        getAudio: function() {
            $.ajax({
                url: "/api/music/",
                type: "GET",
                async: false,
                dataType: "audio/mpeg",
                success: function() {
                    
                }
            });
        },

        getNames: function() {
            $.ajax({
                url: "",
                type: "GET",
                async: false,
                contentType: 'application/json',
                dataType: 'json',
                success: function(resp) {
                    /*JSON 4 ответа первый правильный*/

                }

            })
        }
    })

    return Audio;

    });