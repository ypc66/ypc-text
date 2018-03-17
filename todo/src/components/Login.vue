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
	<form class="form login">
		<h2>登陆</h2>
		<input v-model="username" type="username" class="form-control" placeholder="username" required autofocus>
		<input v-model="password" class="form-control" type="password" placeholder="Password" required>
		<button v-on:click="login" type="submit">登陆</button>
	</form>
</div>
</template>

<script>
	import AV from 'leancloud-storage';
	
	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				var that = this.$router
				
				var username = this.username;
				var password = this.password;

				AV.User.logIn(username, password).then(function (loginedUser) {
				  	that.push('/home')
				}, function (error) {
				  alert(JSON.stringify(error));
				});
			}
		}
	}
</script>
