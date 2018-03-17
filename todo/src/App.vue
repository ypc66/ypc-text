<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}
html, body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
a {
  text-decoration: none;
}
ul,li {
  list-style: none;
}

#app {
  padding: 15px;
}
nav>ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

nav>ul>li>a {
  display: inline-block;

  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  color: #337ab7;
  font-size: 14px;
}

nav>ul>li>a:hover {
  color: #23527c;
}

.router-link-active {
  background-color: #eee;
}

.form{
  margin: 0 auto;
  margin-top: 100px;
  width: 300px;
  display: flex;
  flex-direction: column;
}
.form>h2 {
  margin-bottom: 10px;
  font-weight: 500;
}
.form-control {
  height: 22px;
  padding: 10px;
}

.form>button {
  box-sizing: initial;
  margin-top: 8px;
  padding: 10px 16px;

  height: 24px;
  background-color: #337ab7;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
}
.form>button:hover {
  background-color: #286090;
}
</style>
