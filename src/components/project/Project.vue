<template>
    <div :id = "this.title" class = "projectContainer" :style = "getContainerStyle()">
        <div class = "header" :style = "getHeaderExpansionStyle()">
            <div style = "grid-area: delete; display:flex; flex-direction:row;" >
                <span v-if = "!this.deleting && dev" class = "mdi mdi-delete btndelete" @click = "this.deleting = true"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-check btndeleteconfirm" @click = "this.deleting = false; confirmDelete();"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-close btndeleteconfirm" @click = "this.deleting = false"></span>
            </div>
            <h2 id = "index" v-if = "!this.dev && !this.expand">{{this.index + 1}}</h2>

            <transform-input-title  align = "left" :text = "this.title" :enabled = "dev" :expanded = "this.expand" style = "grid-area:name; line-height: 100px;" @valueUpdate = "titleChange($event)" @click = "scrollUpdate(true)"/>

            <transform-input-paragraph :text = "this.description" :enabled = "dev" style = "grid-area: description;" @valueUpdate = "descriptionChange($event)" @click = "scrollUpdate(true)"/>

            <span style = "grid-area: button; font-size: 40px;" :style = "getRotationStyle()" class = "mdi mdi-chevron-right btntextdefault chevron" @click = "scrollUpdate(!this.expand)"></span>
        </div>

        <div class = "information" v-if = "this.expand">
            <li v-for = "(section, index) in this.overview" :key = "index">
                <overview-section :section = "section" :dev = "dev" :reversed = "index % 2 == 0" @imageUpdate = "sectionImageUpdate($event)" @titleUpdate = "sectionTitleUpdate($event)" @contentUpdate = "sectionContentUpdate($event)" @deleteSection = "deleteSection($event)"/>
            </li>
            <li><button v-if = 'dev' class = "btndefault btntextdefault" @click = "addSection()"><span class = "mdi mdi-plus"></span></button></li>
        </div>

        <h4 v-if = "this.expand && this.logs.length > 0" class = "sectionTitle"> Logs </h4>  
        <div class = "logs" :style = "getExpansionStyle()" :key = "this.logKey">
            
            <div class = "logs" v-if = "this.expand">
                <li v-for = "(log, index) in logs" v-bind:key="index">
                    <log :dev = "dev" :log = "log" @imageDelete = "deleteImage($event)" @deleteLog = "deleteLog($event)" @shiftLog = "shiftLog($event)" @logImageUpdate = "addImage($event)" @logTitleUpdate = "logTitleChange($event)" @logDateUpdate = "logDateChange($event)" @logContentUpdate = "logContentChange($event)"/>
                </li>
            </div>
            <li><button v-if = 'dev' class = "btnlogadd btndefault btntextdefault" @click = "addLog()"><span class = "mdi mdi-plus"></span></button></li>

        </div>
 

    </div>
</template>

<script>
import TransformInputTitle from '../utils/TransformInputTitle.vue';
import TransformInputParagraph from '../utils/TransformInputParagraph.vue';
import OverviewSection from '../utils/OverviewSection.vue'

import Log from "./Log.vue"

export default {
    name: "Project",

    components: {
        'log': Log,
        'transform-input-title': TransformInputTitle,
        'transform-input-paragraph':TransformInputParagraph,
        'overview-section': OverviewSection
    },

    props:{
        project: Object,
        dev: Boolean,
        expanded: Boolean,
        index: Number
    },

    data(){
        return{
            expand: this.expanded,
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
        },

        overview: function(){
            return this.project.sections;
        }
    },

    methods:{
        getHeaderExpansionStyle(){
            let ret = "";
            
            if(this.expand){
                ret = "border-bottom: 2px solid #8221b3;";
            }

            return ret;
        },

        getContainerStyle: function(){
            let ret = "transition: 0.5s; display:inline-block;"
            if(this.expand){
                ret += "position: absolute; top: 0px; left: 2rem;";
                ret += "width: 98vw; height: 100vh;"
                ret += "z-index: 998;"
                ret += "background: rgb(15, 0, 29);"
                ret += "overflow-y: auto;"
            }

            return ret;
        },
        getRotationStyle: function(){
            let ret = 'transition:0.5s;'
            ret += "transform-origin: 50% 50%;"
            if(this.expand){
                ret += 'transform: rotate(90deg);'
                
            } else {
                ret += 'transform: rotate(0deg);'
            }

            return ret;
        },

        getExpansionStyle: function(){
            let ret = 'transition: 0.5s;'

            if(!this.expand){
                ret += 'max-height:0px'
                
            } else {
                ret += 'max-height: 100%'
            }

            return ret;
        },

        scrollUpdate: function(val){
        
            if(this.expand && this.dev){
                this.expand = val;
            } else {
                this.expand = !this.expand;
            }

            this.$emit("expandEvent", {id: this.project.id, expanded: this.expand});

            this.logKey++;
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

        addSection: function(){
            this.$emit("addSection", {id: this.project.id});
        },

        deleteSection: function(e){
            this.$emit("deleteSection", {id: this.project.id, sectionData: e});
        },
        
        sectionTitleUpdate: function(e){
            this.$emit("sectionTitleUpdate", {id: this.project.id, sectionData: e});
        },

        sectionContentUpdate: function(e){
            this.$emit("sectionContentUpdate", {id: this.project.id, sectionData: e});
        },

        sectionImageUpdate: function(e){
            this.$emit("sectionImageUpdate", {id: this.project.id, sectionData: e});
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

.sectionTitle{
  color: #969696;

  font-family: 'Courier New', Courier, monospace;
  font-size: 30px;
  font-style:italic;

  border: none;
  background-color: #00000000;

  text-align: left;

  transition: 0.75s;

  padding-left: 3vw;

  border-top: 1px solid #96969670;

  width: 10vw;
}

.header{
    display:grid;
    grid-template-columns:0.5fr 5fr 4fr 1fr;
    grid-template-areas: "delete name description button";
    border-bottom: 0px solid #8221b3;
    color: #00000000;
    padding: 5px;
    font-size: 30px;
    border-radius: 10px;
    transition: 0.1s;
}

.header:hover{
    border-bottom: 2px solid #8221b3;
    transition:0.5s;
    color: rgba(255, 255, 255, 0.411);
}

.header:active{
    border-bottom: 2px solid white;
    transition:0.5s;
    color: rgba(255, 255, 255, 1);
}

#index{
    grid-area:delete;
    text-align:center;
    width:100%;
    height:100%;

}


.logs{
    display: flex;
    flex-direction: row;
    overflow-x:auto;
}

.information{
    display: flex;
    flex-direction: column;
    height:auto;
    overflow-x:hidden;
}


.chevron{
    line-height: 100px;
    font-size: 40px;
    text-align:center;
}

.btndelete{
    line-height: 100px;
    font-size: 40px;
    text-align: center;
    color: #00000000;
    transition:0.5s;
}

.btndelete:hover{
    
    color: white;
    transition:0.5s;
}

.btndeleteconfirm{
    line-height: 100px;
    font-size: 40px;
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