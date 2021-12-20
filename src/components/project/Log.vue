<template>
    <div class = "log">
        
        <div style = "overflow-y:auto; overflow-wrap: break-word;">
            <div class = "header">
                <transform-input-log-title :text = "log.logTitle" :enabled = "dev" fontsize = "20px" @valueUpdate = "notifyLogTitle($event)"/>
                <transform-input-log-title :text = "log.date" :enabled = "dev" fontsize = "15px" @valueUpdate = "notifyLogDate($event)"/>
            </div>

            <transform-input-log-paragraph :text = "log.log" :enabled = "dev" @valueUpdate = "notifyLogContent($event)"/>
        </div>

        <div style = "display:flex; overflow-x: auto;">
            <li v-for = "(image, index) in this.log.images" :key = "index">
                 <image-container :dev = "dev" :image = "image" @imageDelete = "imageDelete($event)"/>
            </li>
        </div>

        <div style = "display: flex; justify-content: space-evenly">
            <button v-if = "dev" class = "btndefault btntextdefault" @click = "shift(-1)"><span class = "mdi mdi-arrow-left"></span></button>

            <div class = "btntextdefault" style = "display: flex; justify-content:space-evenly">
                <button v-if = "dev && !this.deleting" class = "btndefault btntextdefault" @click = "this.deleting = true"><span class = "mdi mdi-minus"></span></button>
                <button v-if = "dev && this.deleting" class = "btndefault btntextdefault" @click = "confirmDelete()"><span class = "mdi mdi-check"></span></button>
                <button v-if = "dev && this.deleting" class = "btndefault btntextdefault" @click = "this.deleting = false"><span class = "mdi mdi-close"></span></button>
            </div>

            <button v-if = "dev" class = "btndefault btntextdefault" @click = "shift(1)"><span class = "mdi mdi-arrow-right"></span></button>

            <label v-if = "dev" class = "btndefault btntextdefault">
                <input type = "file" v-if = "dev" accept = "image" style = "display: none;" @change = "upload"/>
                <span class = "mdi mdi-upload"></span>
            </label>
                
        </div>
    </div>
</template>

<script>
import TransformInputLogParagraph from '../utils/TransformInputLogParagraph.vue'
import TransformInputLogTitle from '../utils/TransformInputLogTitle.vue'
import ImageContainer from '../utils/ImageContainer.vue'
export default {
    name: "Log",
    
    data(){
        return{
            deleting:false
        }
    },

    components:{
        'transform-input-log-paragraph': TransformInputLogParagraph,
        'transform-input-log-title':TransformInputLogTitle,
        'image-container': ImageContainer
    },

    props:{
        log: Object,
        dev: Boolean
    },

    methods:{
        notifyLogTitle: function(e){
            this.$emit('logTitleUpdate', {id: this.log.id, new: e.value});
        },

        notifyLogDate: function(e){
            this.$emit('logDateUpdate', {id: this.log.id, new: e.value});
        },

        notifyLogContent: function(e){
            this.$emit('logContentUpdate', {id: this.log.id, new: e.value});
        },

        shift: function(direction){
            this.$emit('shiftLog', {id: this.log.id, direction: direction});
        },

        imageDelete(e){
            this.$emit("imageDelete", {id: this.log.id, imageData: e});
        },

        confirmDelete: function(){
            this.$emit("deleteLog", {id: this.log.id});
            this.deleting = false;
        },

        upload: function(e){

            const image = e.target.files[0];
            const reader = new FileReader();

            let emitCallback = (base64) => this.$emit("logImageUpdate", {id: this.log.id, base64: base64});

            reader.onload = function(){
                let base64 = reader.result;
                emitCallback(base64);
            };

            reader.readAsDataURL(image);

        }
    }

}
</script>

<style scoped>
.log{
    display: flex;
    justify-content:space-between;

    flex-direction:column;

    width: 25vw;
    height: 60vh;

    padding: 5px;

    border:2px solid purple;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 4px 4px #b784f163;

    font-family: "Lucida Console", "Courier New", monospace;

    transition:0.5s;
}

.log:hover{
    transition: 0.5s;
    width: 30vw;
    border-width: 3px;
}

.header{
    text-align:center;
    padding-left:1vw;
    padding-right:1vw;
    border-bottom: 1px solid purple;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: purple;

    transition:0.5s;

}

</style>