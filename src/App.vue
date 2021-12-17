<template>
  <div>
    <sidebar v-bind:key = "menu.menuKey" v-bind:menuItems = "menu.menuItems"/>

    <div id = "informationSpace">
      <ul id = "p-list" :key = "this.projectKey">
          <li v-for = "(project, index) in projects" v-bind:key = "index"> 
            <project :project = "project" />
          </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Sidebar from './components/menu/Sidebar.vue'
import Project from './components/project/Project.vue'
import {setup, getTitles, getProjects} from './server/logclient.js'
export default {
  name: 'App',

  components: {
    "sidebar" : Sidebar,
    "project" : Project
  },

  data(){
    return{
      menu: {
        menuItems : ["Projects", "GitHub", "Contact"], 
        menuKey: 0
      },

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

ul {
  margin: 0px;
  padding-left: 60px;
  list-style-type: none;
}

li{
  padding-top: 10px;
}

#informationSpace{
  position: fixed;
  overflow-y: auto;
  height: 100vh;
  width: 97vw;
  left: 3vw;
  top: 0px;
}
</style>
