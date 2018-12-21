
<template>
	<div>
		<nav>
		  	<ul>
		    	<li>
		      		<router-link to="/login" class="active">登陆</router-link>
		   	 	</li>
		   	 	<li>
		      		<router-link to="/signUp">注册</router-link>
		    	</li>
		  	</ul>
		</nav>
		<form class="form signup">
			<h2>注册新用户</h2>
			<input v-model="signupUsername" type="username" id="inputUsername" class="form-control" placeholder="username" required autofocus>
			<input v-model="signupPassword" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
			<input v-model="emailAddress" type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
			<button v-on:click="pushMessage" type="submit">注册</button>
		</form>
	</div>
</template>

<script>
	import AV from 'leancloud-storage';
	var APP_ID = 'yNNBTXJgenclC7LkXQ9bxLdX-gzGzoHsz';
	var APP_KEY = 'DR3xYJDazO6gWTHv0Tttz81X';
	
	AV.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});

	export default {
		name: 'Signup',
		data() {
			return {
				signupUsername: '',
				signupPassword: '',
				emailAddress: ''
			}
		},
		methods: {
			pushMessage: function() {
				var username = this.signupUsername;
				var password = this.signupPassword;
				var email = this.emailAddress;
				var that = this.$router;

				var user = new AV.User();
				user.setUsername(username);
				user.setPassword(password);
				user.setEmail(email);
				user.signUp().then(function (loginedUser) {
				  	that.push({
				  		path: '/home'
				  	})
				}, (function (error) {
					alert(JSON.stringify(error));
				}));
				
			}
		}
	}
</script>
