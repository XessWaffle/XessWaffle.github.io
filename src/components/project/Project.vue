<template>
    <div :id = "this.title" class = "projectContainer">
        <div class = "header" @click = "scrollUpdate()">
            <transform-input-title :text = "this.title" :enabled = "dev" style = "grid-area:name" />

            <transform-input-paragraph :text = "this.description" :enabled = "dev" style = "grid-area: description;"/>

            <span style = "grid-area: button;" :class = "`mdi ${!this.expand ? 'mdi-chevron-right': 'mdi-chevron-down'} btntextdefault chevron`"></span>
        </div> 

        <div class = "logs" v-if = "this.expand">
            
            <li v-for = "(log, index) in logs" v-bind:key="index">
                <log :dev = "dev" :log = "log" />
            </li>

            <li><button v-if = 'dev' class = "btnlogadd btndefault btntextdefault"><span class = "mdi mdi-plus"></span></button></li>

        </div>

    </div>
</template>

<script>
import TransformInputTitle from '../utils/TransformInputTitle.vue';
import TransformInputParagraph from '../utils/TransformInputParagraph.vue';

import Log from "./Log.vue"

export default {
    name: "Project",

    components: {
        'log': Log,
        'transform-input-title': TransformInputTitle,
        'transform-input-paragraph':TransformInputParagraph
    },

    props:{
        project: Object,
        dev: Boolean,
    },

    data(){
        return{
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
    },

    methods:{
        scrollUpdate: function(){
            this.expand = !this.expand;
        }
    }



}
</script>

<style scoped>
.header{
    display:grid;

    grid-template-columns: 5fr 4fr 1fr;
    grid-template-areas: "name description button";
    border-bottom: 0px solid #8221b3;
    padding: 5px;
    border-radius: 10px;
    transition: 0.5s;
}

.header:hover{
    font-size: 20px;
    border-bottom: 2px solid #8221b3;
    transition:0.5s;
}

.logs{
    display: flex;
}

.chevron{
    font-size: 40px;
}

.btnlogadd{
    border-color: purple;
    border-right-width: 2px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 1px;
    border-left-color: #8221b356;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    width: 5vw;
    height:100%;
}

.btnlogadd:hover{
    border-color: white;
    border-right-width: 3px;
    border-top-width: 3px;
    border-bottom-width: 3px;
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
    
}

.btnlogadd:active{
    border-color: white;
    border-right-width: 3px;
    border-top-width: 3px;
    border-bottom-width: 3px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0px;
    
}


.header:hover{
    border-width:6px;
    transition:0.5s;
}

.header:active{
    color:gray;
}


</style>