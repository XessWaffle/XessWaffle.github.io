<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <sidebar v-bind:key = "menu.menuKey" v-bind:menuItems = "menu.menuItems" @pwdClick = "processAuth($event)"/>

    <div id = "informationSpace" :key = "this.projectKey">
        <h1 id = "header"> Projects </h1>
        <li v-for = "(project, index) in projects" v-bind:key = "index"> 
          <project :dev = "this.devMode" :project = "project" />
        </li>

        <transform-input-icon style = "padding-bottom: 3vw" :enabled = "this.devMode" icon = "mdi-plus" />
    </div>

  </div>
</template>

<script>
import Sidebar from './components/menu/Sidebar.vue'
import Project from './components/project/Project.vue'
import TransformInputIcon from './components/utils/TransformInputIcon.vue'
import {setup, getTitles, getProjects} from './server/logclient.js'
import {authenticate} from './auth/access.js'
export default {
  name: 'App',

  components: {
    "sidebar" : Sidebar,
    "project" : Project,
    "transform-input-icon":TransformInputIcon
  },

  data(){
    return{
      menu: {
        menuItems : ["Projects", "GitHub", "Contact"], 
        menuKey: 0
      },

      devMode: false,

      projectKey: 0
    }
  },

  computed:{
    titles: function() {
      return getTitles();
    },

    projects: function(){
      return getProjects();
    }
   
  },

  mounted() {
    setup(() => {this.projectKey++;});
  },

  methods: {
    processAuth: function(e){
      if(authenticate(e.value)){
        this.devMode = true;
      } else {
        this.devMode = false;
      }

      this.projectKey++;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#header{
  color: #969696;

  font-family: 'Courier New', Courier, monospace;
  font-size: 40px;
  font-style:italic;

  border: none;
  background-color: #00000000;

  text-align: Left;

  transition: 0.75s;

  padding-left: 3vw;
  padding-top: 1vw;

  border-top: 1px solid #96969670;

  width: 10vw;
}

ul {
  margin: 0px;
  padding-left: 60px;
  list-style-type: none;
}

li{
  padding: 10px;
  list-style-type: none;
}

#informationSpace{
  background:rgb(15, 0, 29);
  position: fixed;
  overflow-y: auto;
  height: 100%;
  width: 97vw;
  padding-left: 2rem;
  padding-bottom: 2rem;
  top: 0px;
}

.btntextdefault{
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 30px;
    width: 100%;
    color: #eca1ff;
}

.btntextdefault:hover{
  color: white;
  font-size: 40px;
  transition:0.5s;

  transition: 0.5s;
}

.btntextdefault:active{
  color: gray;
  transition:0.5s;
}

.btndefault {

    text-align:center;

    
    border: 3px solid #00000000;

    background: none;
    transition: 0.75s;
}

.btndefault:hover{
    border-bottom-color:white;
    border-bottom-right-radius: 20px;
    transition:0.5s;
}

.btndefault:active{
    
    border-bottom-color: gray;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 20px;
    transition: 0.1s;
    
}
</style>
