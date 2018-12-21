<template>
	<div class="container">
		<nav>
			<a v-on:click="logout">退出登陆</a>
		</nav>
		<form>
			<input v-on:keyup.enter="input_text" v-model="whatText" type="text">
		</form>
		<div>
			<ul class="text-list">
				<li v-for="(item, index) in texts">
					<input v-bind:value="item" v-bind:id="index">
					<label v-bind:for="index" >modify</label>
					<span v-on:click="deleteText(index)">delete</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import AV from 'leancloud-storage';
	var Text = AV.Object.extend('Text');
		
	var currentUserId;

	
	var textlists = [];
	
	export default {
		name: 'Home',
		data() {
			return {
				whatText: '',
				texts: textlists,
			}
		},
		
		mounted: function() {
			this.$nextTick(function () {
				
				textlists = [];
			    
			    var currentUser = AV.User.current();
			    currentUserId = currentUser['id'];

			   
			    var query = new AV.Query('Text');
			    
			    query.equalTo('userID', currentUserId);

			    // query.descending('createdAt');
			    query.find().then(function (lists) {
			    	
			    	lists.forEach(function(list) {
			    		
			    		let textlist = list.get('textList')
			    		
			    		textlists.push(textlist);

			    	})
			    })
			    // 将数组赋值给 data 里的 todos
			    this.texts = textlists;
			    console.log('this.texts' + this.texts)

			 })
			
		},
		methods: {
			
			logout: function() {
				AV.User.logOut();
				this.$router.push('/')
			},
			
			input_text: function() {
				
				var whatText = this.whatText;
				if (whatText == '') {
					alert('请输入待办事项');
					return 0;
				}
	
				var userID;
				this.texts.push(whatText);
				
				var text = new Text();
				text.set('textList', whatText);
				text.set('owner', AV.User.current());
				text.set('userID', currentUserId)
				text.save().then(function (text) {
				  
				  userID = text.id;
				  todo.set('myId', userID);
				  todo.save();
				}, function (error) {
				  console.error('Failed to create new object, with error message: ' + error.message);
				});

				
				this.whatText = '';
				
			},

			
			deleteText: function(index) {
				
				var textContent = this.texts[index];

				this.texts.splice(index, 1);
				var query = new AV.Query('Text');
				query.equalTo('textList', textContent)
				query.find().then(function(results) {
					var currentID = results[0]['id'];
					var deleteTodo = AV.Object.createWithoutData('Text', currentID);
					deleteText.destroy().then(function (success) {
					
					}, function (error) {
					    alert(error)
					});
				})

				
			}
		}
	}
</script>

<style>
	.container>nav {
		display: flex;
		justify-content: flex-end;	
	}
	nav>a {
		margin-right: 50px;
		padding: 5px 6px;
		color: #23527c;
		font-size: 14px;
	}
	nav>a:hover {
		background-color: #333;
		color: #fff;
	}
	form {
		margin-top: 10%;
	}
	.container input {
		width: 300px;
		height: 40px;
		padding-left: 5px;
	}
	.text-list label {
		position: absolute;
		line-height: 40px;
		margin-left: 10px;
		cursor: pointer;
		color: #999;
	}
	.text-list label:hover, .text-list span:hover {
		color: #333;
		text-shadow: 1px #111;
	}
	.text-list span {
		position: absolute;
		margin-left: 70px;
		line-height: 40px;
		cursor: pointer;
		color: #999;
	}
	
</style>
