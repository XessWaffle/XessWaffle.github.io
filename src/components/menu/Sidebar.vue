<template>
    <div class = "sidebar-panel" @mouseenter = "hover(true)" @mouseleave = "hover(false)">

        <div v-if = "this.active">
            <button id = "name" @click = "menuInteractEvent({name: 'Home'})">{{this.active ? "XessWaffle": ""}}</button>
            <div id = "menuHolder">
                <li v-for = "(item, index) in menuItems" v-bind:key = "index">
                    <menu-item v-bind:key = "itemKey" v-bind:active = "this.active" v-bind:menuItem = "item" @menuItemClicked = "menuInteractEvent($event)"/>
                </li>
            </div> 
            <div v-if = "this.active" style = "padding: 10px; display:flex; justify-content: space-between">
                <button class = "btnpwd" id = "one" @click = "sendClick(1)"></button>
                <button class = "btnpwd" id = "two" @click = "sendClick(2)"></button>
                <button class = "btnpwd" id = "three" @click = "sendClick(3)"></button>
                <button class = "btnpwd" id = "four" @click = "sendClick(4)"></button>
                <button class = "btnpwd" id = "five" @click = "sendClick(5)"></button>
                <button class = "btnpwd" id = "six" @click = "sendClick(6)"></button>
            </div>
        </div>

        <div v-if = "!this.active" style= "display: flex; flex-direction: column; justify-content: space-around; height: 100%; width: 100%;" >
            <span class = " btntextdefault mdi mdi-chevron-right"></span>
        </div>
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
        hover: function(val){
            this.active = val;
        },

        sendClick: function(btnval){
            this.$emit("pwdClick", {value: btnval});
        },

        menuInteractEvent: function(e){
            this.$emit("menuInteractEvent", e);
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
        width: 2rem;
        transition: 0.75s;
        height:100%;

        padding-left: 0px;
        padding-right: 0px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .sidebar-panel:hover{
        width: 20rem;
        transition:0.7s;
        padding-left: 2rem;
        padding-right: 1rem;

    }

    .btnpwd{
        width: 2rem;
        height: 2rem;
        border: 2px solid purple;
        border-radius: 5px;
        box-shadow: none;
        background:none;
        transition: 0.5s;
    }

    .btnpwd:hover{
        border: 2px solid whitesmoke;
        background-color: #440464;
        box-shadow: 4px 4px rgb(55, 19, 85);
        transition: 0.5s;

    }

    .btnpwd:active{
        border-color:gray;
        background-color: whitesmoke;
        box-shadow: none;
        transition: 0.1s;
    }
</style>