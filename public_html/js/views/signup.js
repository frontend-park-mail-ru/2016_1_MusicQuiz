define(function (require) {

	var Backbone = require('backbone')
	var Tmpl = require('tmpl/signup')
	var User = require('models/user')

	var SignupView = Backbone.View.extend({
		events: {
			"submit ": "submit",
			"click #pop-up": "popup",
			"change input[type=file][class=upload-pic]": "photo"
		},

		template: Tmpl,
		model: User,

		initialize: function() {
			this.render()
		},

		render: function() {
			this.$el.html(this.template)
			return this;
		},

		submit: function(e) {
			e.preventDefault()

			fields = {
		        'login': this.$el.find('.sign-form__login'),
		        'email': this.$el.find('.sign-form__email'),
		        'password': this.$el.find('.sign-form__password'),
		        'submitPassword': this.$el.find('.sign-form__submit-password')
		    }

		    errorField = this.$el.find('.sign-form-error').text('')

			var userData = {
        		login: fields.login.val(),
        		email: fields.email.val()
      		};
			
			var user = new User()
			var error = user.validate(userData)
			
			if (error != undefined ) {
				errorField.text(error)
			} 
			else {
				alert('YOU SIGNED UP')
			}

		},

		photo: function(e) {

			input = $('.upload-pic')[0]
            photo = $('#photo')[0]

            var reader = new FileReader()

	        reader.onload = function (e) {
	            $('#photo').attr('src', e.target.result)
	        }

	        reader.readAsDataURL(input.files[0])
		},

		popup: function(e) {
			e.preventDefault()

			this.$('.hide-layout').css("display", "block")
			this.$('.pop-up__camera').css("display", "block")
			this.$('.pop-up__camera__record').css("display", "block")
			this.$('.pop-up__camera__buttons').css("display", "block")
			this.$('.pop-up__camera__btn').css("display", "inline-block")

			var video = document.getElementById('video'),
			canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			photo = document.getElementById('photo')
			preview = document.getElementById('preview'),
			vendorUrl = window.URL || window.webkitURL
			console.log(video)
			console.log(this.$('#video'))
			var Mystream
			canvas.width = 480
			canvas.height = 480
			navigator.getMedia = (  navigator.getUserMedia ||
									navigator.webkitGetUserMedia ||
									navigator.mozGetUserMedia || 
									navigator.msGetUserMedia)
			navigator.getMedia({
			   video: true,
			   audio: false
			}, function(stream) {
				Mystream = stream
			   	video.src = vendorUrl.createObjectURL(Mystream)
			   	video.play()
			  	}, function(error) {
			   		alert('Ошибка! Что-то пошло не так, попробуйте позже.')
			  		});
			document.getElementById('shot').addEventListener('click', function() {
			   context.drawImage(video, -80, 0)
			   photo.setAttribute('src', canvas.toDataURL('image/png'))

			var track = Mystream.getTracks()[0]
			track.stop()
			$('.hide-layout').css("display", "none")
			$('.pop-up__camera').css("display", "none")
			$('.pop-up__camera__record').css("display", "none")
			$('.pop-up__camera__buttons').css("display", "none")
			$('.pop-up__camera__btn').css("display", "none")


			  })

			document.getElementById('cancel').addEventListener('click', function(e) {
				e.preventDefault()
				if(Mystream) {
					var track = Mystream.getTracks()[0]
					track.stop()
				}
				$('.hide-layout').css("display", "none")
				$('.pop-up__camera').css("display", "none")
				$('.pop-up__camera__record').css("display", "none")
				$('.pop-up__camera__buttons').css("display", "none")
				$('.pop-up__camera__btn').css("display", "none")
			})
			
		},

		show: function () {
            this.trigger('show');
            this.$el.show();
        },

		hide: function() {
			this.$el.hide()
		}
	})

	return new SignupView()
});