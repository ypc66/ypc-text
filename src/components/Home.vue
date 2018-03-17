<template>
	<div class="container">
		<nav>
			<a v-on:click="logout">退出登陆</a>
		</nav>
		<form>
			<input v-on:keyup.enter="input_todo" v-model="whatTodo" type="text">
		</form>
		<div>
			<ul class="todo-list">
				<li v-for="(item, index) in todos">
					<input v-bind:value="item" v-bind:id="index">
					<label v-bind:for="index" >modify</label>
					<span v-on:click="deleteTodo(index)">delete</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import AV from 'leancloud-storage';
	// 在leancloud创建 Todo 类
	var Todo = AV.Object.extend('Todo');
		
	var currentUserId;

	// 储存当前用户所有 todo 事项，页面重新加载时需要加载给用户
	var todolists = [];
	
	export default {
		name: 'Home',
		data() {
			return {
				whatTodo: '',
				todos: todolists,
			}
		},
		// 进入 Home 页面时需要获取当前用户从而获得已经输入的todo
		// 只有在 mounted 周期时才能获取到当前用户
		// 
		mounted: function() {
			this.$nextTick(function () {
				// 初始化
				todolists = [];
			    // 获取当前用户及用户ID
			    var currentUser = AV.User.current();
			    currentUserId = currentUser['id'];

			    // 查找实例化
			    var query = new AV.Query('Todo');
			    // 在 Todo 类里查找 userID 为当前用户ID的对象
			    query.equalTo('userID', currentUserId);

			    // query.descending('createdAt');
			    query.find().then(function (lists) {
			    	// 遍历查找结果
			    	lists.forEach(function(list) {
			    		// 获取对象的 todolist 文本内容
			    		let todolist = list.get('todoList')
			    		// 将每条 todo 添加到 todolist数组
			    		todolists.push(todolist);

			    	})
			    })
			    // 将数组赋值给 data 里的 todos
			    this.todos = todolists;
			    console.log('this.todos' + this.todos)

			 })
			
		},
		methods: {
			//退出登陆
			logout: function() {
				AV.User.logOut();
				this.$router.push('/')
			},
			// 输入 todo 事项后
			input_todo: function() {
				// 在页面添加 todo 事项
				var whatTodo = this.whatTodo;
				if (whatTodo == '') {
					alert('请输入待办事项');
					return 0;
				}
				// 暂时保存当前 todo 的 id
				var userID;
				this.todos.push(whatTodo);
				// 添加到 leancloud
				var todo = new Todo();
				todo.set('todoList', whatTodo);
				todo.set('owner', AV.User.current());
				todo.set('userID', currentUserId)
				todo.save().then(function (todo) {
				  // 成功保存之后，需要在这里取得ID，删除用
				  userID = todo.id;
				  todo.set('myId', userID);
				  todo.save();
				}, function (error) {
				  console.error('Failed to create new object, with error message: ' + error.message);
				});

				// 清空输入框，方便下次输入
				this.whatTodo = '';
				
			},

			// 删除 todo 事项
			deleteTodo: function(index) {
				// 获取该todo文本 以查找leancloud该todo对象
				var todoContent = this.todos[index];

				this.todos.splice(index, 1);
				var query = new AV.Query('Todo');
				query.equalTo('todoList', todoContent)
				query.find().then(function(results) {
					var currentID = results[0]['id'];
					var deleteTodo = AV.Object.createWithoutData('Todo', currentID);
					deleteTodo.destroy().then(function (success) {
					    // 删除成功
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
	.todo-list label {
		position: absolute;
		line-height: 40px;
		margin-left: 10px;
		cursor: pointer;
		color: #999;
	}
	.todo-list label:hover, .todo-list span:hover {
		color: #333;
		text-shadow: 1px #111;
	}
	.todo-list span {
		position: absolute;
		margin-left: 70px;
		line-height: 40px;
		cursor: pointer;
		color: #999;
	}
	
</style>