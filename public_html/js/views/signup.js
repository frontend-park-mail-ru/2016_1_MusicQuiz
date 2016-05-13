define(function (require) {

	var Backbone = require('backbone'),
		Tmpl = require('tmpl/signup'),
		User = require('models/user'),
		Session = require('models/session'),
		Client = require('models/client');


	var SignupView = Backbone.View.extend({
		events: {
			"submit ": "trySignup",
			"click #pop-up": "popup",
			"change input[type=file][class=upload-pic]": "photo"
		},

		template: Tmpl,
		model: User,

		initialize: function() {
			this.render();
			this.listenTo(Client.getSession(), 'formError', this.showError);
		},

		render: function() {
			this.$el.html(this.template);
			return this;
		},

		trySignup: function(e) {
			e.preventDefault();

			fields = {
		        'login': this.$el.find('.sign-form__login'),
		        'email': this.$el.find('.sign-form__email'),
		        'password': this.$el.find('.sign-form__password'),
		        'submitPassword': this.$el.find('.sign-form__submit-password')
		    }


			var userData = {
        		login: fields.login.val(),
        		email: fields.email.val(),
        		password: fields.password.val(),
        		submitPassword: fields.submitPassword.val()
      		};

			var user = new User();
			var error = user.validate(userData);
			var errorField = this.$el.find('.sign-form-error').text('');
			var session = Client.getSession()
			if (error != undefined ) {
				errorField.text(error);
			} 
			else {
				//Client.Session.signup(userData.login, userData.email, userData.password);
				session.signup(userData.login, userData.email, userData.password);
			}

		},

		showError: function(err) {
			errorField = this.$el.find('.sign-form-error').text(err);
		},

		photo: function(e) {

			input = $('.upload-pic')[0];
            photo = $('#photo')[0];

            var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#photo').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
		},

		popup: function(e) {
			e.preventDefault();

			this.$('.hide-layout').show();
			this.$('.pop-up__camera').show();
			this.$('.pop-up__camera__record').show();
			this.$('.pop-up__camera__buttons').show();
			this.$('.pop-up__camera__btn').show();

			var video = this.$('#video')[0],
				canvas = this.$('canvas')[0],
				photo = this.$('#photo')[0],
				preview = this.$('#preview')[0],
				context = canvas.getContext('2d'),
				vendorUrl = window.URL || window.webkitURL;
			var Mystream;
			canvas.width = 480;
			canvas.height = 480;
			navigator.getMedia = (  navigator.getUserMedia ||
									navigator.webkitGetUserMedia ||
									navigator.mozGetUserMedia || 
									navigator.msGetUserMedia);
			navigator.getMedia({
			   video: true,
			   audio: false
			}, function(stream) {
				Mystream = stream;
			   	video.src = vendorUrl.createObjectURL(Mystream);
			   	video.play();
			  	}, function(error) {
			   		alert('Ошибка! Что-то пошло не так, попробуйте позже.');
			  		});
			$('#shot')[0].addEventListener('click', function() {
				context.drawImage(video, -80, 0);
				photo.setAttribute('src', canvas.toDataURL('image/png'));
				var track = Mystream.getTracks()[0];
				track.stop();
				$('.hide-layout').hide();
				$('.pop-up__camera').hide();
				$('.pop-up__camera__record').hide();
				$('.pop-up__camera__buttons').hide();
				$('.pop-up__camera__btn').hide();
			  })

			$('#cancel')[0].addEventListener('click', function(e) {
				e.preventDefault();
				if(Mystream) {
					var track = Mystream.getTracks()[0];
					track.stop();
				}
				$('.hide-layout').hide();
				$('.pop-up__camera').hide();
				$('.pop-up__camera__record').hide();
				$('.pop-up__camera__buttons').hide();
				$('.pop-up__camera__btn').hide();
			})
			
		},

		show: function () {

            this.trigger('show');
            this.$el.show();
        },

		hide: function() {
			this.$el.hide();
		}
	})

	return new SignupView();
});