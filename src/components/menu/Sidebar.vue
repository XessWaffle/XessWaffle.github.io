<template>
    <div class = "sidebar-panel" @mouseenter = "hover" @mouseleave = "hover">

        <button id = "name">{{this.active ? "XessWaffle": "XE"}}</button>
        <ul id = "menuHolder">
            <li v-for = "(item, index) in menuItems" v-bind:key = "index">
                <menu-item v-bind:key = "itemKey" v-bind:active = "this.active" v-bind:menuItem = "item" />
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
            active: false,
            itemKey: 0
        }
    },

    props: {
        menuItems: Array
    },

    methods:{
        hover: function(){
            this.active = !this.active;
        }
    }
}
</script>

<style scoped>


    #name{
        color: #ffffff;
        
        top:0px;

        font-family: 'Courier New', Courier, monospace;
        font-size: 30px;
        font-style:italic;

        border: none;
        background-color: #00000000;

        text-align: Left;

        transition: 0.75s;

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
        padding-bottom:10px;
        padding-top:0px;
        border-top: 2px solid #3d1253;
        border-bottom: 2px solid #3d1253;

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
        width: 3vw;
        transition: 0.75s;
    }

    .sidebar-panel:hover{
        width: 20vw;
        transition:0.7s;
    }
</style>