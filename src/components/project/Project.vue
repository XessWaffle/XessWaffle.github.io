<template>
    <div>

        <div class = "header">
            <h1 class = "projName">{{this.title}}</h1>

            <p class = "desc-p">{{description}}</p>

            <button v-if = "!this.expand" class = "projectButton" @click = "this.expand = !this.expand">
                <span class="mdi mdi-chevron-right"></span>
            </button>
            <button v-if = "this.expand" class = "projectButton" @click = "this.expand = !this.expand">
                <span class="mdi mdi-chevron-down"></span>
            </button>
            
        </div> 

       
        
        <div class = "logs" v-if = "this.expand">
            
            <li v-for = "(log, index) in logs" v-bind:key="index">
                <log :log = log />
            </li>

        </div>

    </div>
</template>

<script>

import Log from "./Log.vue"

export default {
    name: "Project",

    components: {
        log: Log
    },

    props:{
        project: Object,
    },

    data(){
        return{
            showLog: false,
            expand: false
        }
    },

    computed:{
        title: function(){
            return this.project.title;
        },

        description: function(){
            return this.project.description;
        },

        logs: function(){
            return this.project.logs;
        }
    }



}
</script>

<style scoped>
.header{
    display:grid;

    grid-template-columns: 6fr 3fr 1fr;
    grid-template-areas: "name description button";

    padding: 5px;
    border-top: 4px solid #3d1253;
    transition: 0.5s;
}

.header:hover{
    border-top:6px solid #3d1253;
    font-size: 20px;
    transition:0.5s;
}

.projName{
    grid-area: name;
    font-family: "Lucida Console", "Courier New", monospace;
    color: #eca1ff;
}

.projName:hover{
    color: #3d1253;
    transition:0.1s;
}

.desc-p{
    grid-area: description;
    text-align: center;
    font-family: "Lucida Console", "Courier New", monospace;
    
}

.logs{
    border-top: 2px solid #8221b3;
    display: flex;
}

.projectButton {
    
    grid-area:button;

    text-align:center;

    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 30px;
    width: 10vh;
    padding-top: 20px;
    border: 3px solid #00000000;
    color: #eca1ff;
    background: none;
    transition: 0.75s;
}

.projectButton:hover{
    color: black;
    border-bottom-color:black;
    border-bottom-right-radius: 20px;
    font-size: 40px;
    transition:0.5s;
    box-shadow:0px 3px #5e286b;

}

.projectButton:active{
    color: gray;
    border-bottom-color: gray;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 20px;
    transition: 0.1s;
    
}
</style>