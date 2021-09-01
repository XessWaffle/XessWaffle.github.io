<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <xess-menu v-bind:key = "menu.menuKey" v-bind:menuItems = "menu.menuItems"/>
</template>

<script>
import Menu from './components/menu/Menu.vue'

export default {
  name: 'App',
  components: {
    "xess-menu" : Menu
  },

  data(){
    return{
      menu: {
        menuItems : ["One", "Two", "Three"], 
        menuKey: 0
        }
        
      
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
</style>
