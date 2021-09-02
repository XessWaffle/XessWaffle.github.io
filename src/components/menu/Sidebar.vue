<template>
    <div class = "sidebar-panel">

        <button id = "name">{{this.name}}</button>

        <ul id = "menuHolder">
            <li v-for = "(item, index) in menuItems" v-bind:key = "index">
                <menu-item v-bind:menuItem = "item" />
            </li>
        </ul>    
    </div>
</template>


<script>
import MenuItem from './MenuItem.vue'
export default {

    name: "Sidebar",

    components: { MenuItem },
    
    data(){
        return{
            name: "XessWaffle"
        }
    },

    props: {
        menuItems: Array
    }
}
</script>

<style scoped>
    #name{
        color: #ffffff;
        
        top:0px;

        font-family: "Lucida Console", "Courier New", monospace;
        font-size: 30px;

        border: none;
        background-color: #00000000;

        text-align: Left;

        transition: 30px;

        width: 100%;
    }

   #name:hover{
        transition:0.5s;
        font-size:40px;
   }

    #menuHolder{
        position:relative;
        list-style-type: none;
        margin: 0px;
        padding-left: 0px;
        padding-right: 0px;

        width: 100%;
        
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: #300346;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 1rem 20px 2rem 20px;
        width: 300px;
    }
</style>