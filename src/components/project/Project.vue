<template>
    <div :id = "this.title" class = "projectContainer">
        <div class = "header">
            <div style = "grid-area: delete; display:flex; flex-direction:row;" >
                <span v-if = "!this.deleting && dev" class = "mdi mdi-delete btndelete" @click = "this.deleting = true"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-check btndeleteconfirm" @click = "this.deleting = false; confirmDelete();"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-close btndeleteconfirm" @click = "this.deleting = false"></span>
            </div>

            <transform-input-title :text = "this.title" :enabled = "dev" style = "grid-area:name" @valueUpdate = "titleChange($event)" @click = "scrollUpdate()"/>

            <transform-input-paragraph :text = "this.description" :enabled = "dev" style = "grid-area: description;" @valueUpdate = "descriptionChange($event)" @click = "scrollUpdate()"/>

            <span style = "grid-area: button;" :class = "`mdi ${!this.expand ? 'mdi-chevron-right': 'mdi-chevron-down'} btntextdefault chevron`" @click = "scrollUpdate()"></span>
        </div> 

        <div class = "logs" v-if = "this.expand" :key = "this.logKey">
            
            <li v-for = "(log, index) in logs" v-bind:key="index">
                <log :dev = "dev" :log = "log" @imageDelete = "deleteImage($event)" @deleteLog = "deleteLog($event)" @shiftLog = "shiftLog($event)" @logImageUpdate = "addImage($event)" @logTitleUpdate = "logTitleChange($event)" @logDateUpdate = "logDateChange($event)" @logContentUpdate = "logContentChange($event)"/>
            </li>

            <li><button v-if = 'dev' class = "btnlogadd btndefault btntextdefault" @click = "addLog()"><span class = "mdi mdi-plus"></span></button></li>

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
            expand: false,
            deleting: false,
            logKey: 0
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
        },

        confirmDelete: function(){
            this.$emit("deleteProject", {projectName: this.title});
        },

        titleChange: function(e){
            this.$emit("titleUpdate", {id: this.project.id, newAlias: e.value});
        },

        descriptionChange: function(e){
            this.$emit("descriptionUpdate", {id: this.project.id, newDescription: e.value});
        },

        addLog: function(){
            this.$emit("addLog", {id: this.project.id});
        },

        deleteLog: function(e){
            this.$emit("deleteLog", {id: this.project.id, logData: e});
        },

        addImage: function(e){
            this.$emit("addImage", {id: this.project.id, logData: e});
        },

        deleteImage: function(e){
            this.$emit("deleteImage", {id: this.project.id, logData: e});
        },

        shiftLog: function(e){
            this.$emit("shiftLog", {id: this.project.id, logData: e, callback: () => {this.logKey++;}});
        },

        logTitleChange: function(e){
            this.$emit("logTitleUpdate", {id: this.project.id, logData: e});
        },
        
        logDateChange: function(e){
            this.$emit("logDateUpdate", {id: this.project.id, logData: e});
        },

        logContentChange: function(e){
            this.$emit("logContentUpdate", {id: this.project.id, logData: e});
        }
    }



}
</script>

<style scoped>
.header{
    display:grid;

    grid-template-columns:0.5fr 5fr 4fr 1fr;
    grid-template-areas: "delete name description button";
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
    overflow-x:auto;
}

.chevron{
    font-size: 40px;
}

.btndelete{
    font-size: 30px;
    text-align: center;
    color: #00000000;
    transition:0.5s;
}

.btndelete:hover{
    color: white;
    transition:0.5s;
}

.btndeleteconfirm{
    font-size: 30px;
    text-align: center;
    color: gray;
    transition:0.2s;
}

.btndeleteconfirm:hover{
    color: white;
    transition:0.2s;
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