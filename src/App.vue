<template>
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <sidebar v-bind:key = "menu.menuKey" v-bind:menuItems = "menu.menuItems" @pwdClick = "processAuth($event)"/>

    <div id = "informationSpace" :key = "this.projectKey">
        <h1 id = "header"> Projects </h1>
        <li v-for = "(project, index) in projects" v-bind:key = "index"> 
          <project :dev = "this.devMode" :project = "project" 
                    @titleUpdate = "titleUpdate($event)" 
                    @descriptionUpdate = "descriptionUpdate($event)" 
                    @deleteProject = "deleteProject($event)"
                    @addLog = "addLog($event)"
                    @deleteLog = "deleteLog($event)"
                    @addImage = "addImage($event)"
                    @deleteImage = "deleteImage($event)"
                    @shiftLog = "shiftLog($event)"
                    @logTitleUpdate = "updateLogTitle($event)"
                    @logDateUpdate = "updateLogDate($event)"
                    @logContentUpdate = "updateLogContent($event)"/>
        </li>

        <transform-input-icon v-if = "this.devMode" style = "padding-bottom: 3vw" :enabled = "this.devMode" icon = "mdi-plus" @valueUpdate = "createProject($event)"/>
    </div>

  </div>
</template>

<script>
import Sidebar from './components/menu/Sidebar.vue'
import Project from './components/project/Project.vue'
import TransformInputIcon from './components/utils/TransformInputIcon.vue'
import {setup, createProject, deleteProject, updateTitle, updateDescription, addLog, shiftLog, deleteLog, updateLogDate, updateLogTitle, updateLogContent, deleteImage, addImage} from './server/logclient.js'
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

      servedData: {
        titles: [],
        projects: []
      },

      projectKey: 0
    }
  },

  computed:{
    titles: function() {
      return this.servedData.titles;
    },

    projects: function(){
      return this.servedData.projects;
    }
   
  },

  mounted() {
    setup((data) => {
      this.servedData = data;
      this.projectKey++;
    
    });
  },

  methods: {
    servedDataUpdateCallback: function(data){
      this.servedData = data;
    }, 

    refreshCallback: function(){
      this.projectKey++;
    },

    combinedCallback: function(data){
      this.servedDataUpdateCallback(data);
      this.refreshCallback();
    },

    processAuth: function(e){
      if(authenticate(e.value)){
        this.devMode = true;
      } else {
        this.devMode = false;
      }

      this.projectKey++;
    },

    createProject: function(e){
      createProject(e.value, this.combinedCallback);
    },

    deleteProject: function(e){
      deleteProject(e.projectName, this.combinedCallback);
    },

    titleUpdate: function(e){
      updateTitle(this.servedData, e, this.combinedCallback);
    },

    descriptionUpdate: function(e){
      updateDescription(this.servedData, e, this.combinedCallback);
    },

    addLog: function(e){
      addLog(this.servedData, e, this.servedDataUpdateCallback);
    },

    shiftLog: function(e){
      shiftLog(this.servedData, e, this.servedDataUpdateCallback);
    },

    deleteLog: function(e){
      deleteLog(this.servedData, e, this.servedDataUpdateCallback);
    },

    addImage: function(e){
      addImage(this.servedData, e, this.servedDataUpdateCallback);
    },

    deleteImage: function(e){
      deleteImage(this.servedData, e, this.servedDataUpdateCallback);
    },

    updateLogTitle: function(e){
      updateLogTitle(this.servedData, e, this.servedDataUpdateCallback);
    },
    
    updateLogDate: function(e){
      updateLogDate(this.servedData, e, this.servedDataUpdateCallback);
    },
    
    updateLogContent: function(e){
      updateLogContent(this.servedData, e, () => {});
    },

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

/* width */
::-webkit-scrollbar {
  border-width: 3px;
  
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(15, 0, 29);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(87, 0, 114);
  border-width:3px;
  border-radius:2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(101, 0, 141)
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
