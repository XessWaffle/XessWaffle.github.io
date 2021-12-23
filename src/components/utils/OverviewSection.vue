<template>
    <div class = "section">
        <div :style = "getBackground(section)">

            <transform-input-section-title class = "sectionTitle" :align = "`${!this.reversed ? 'left': 'right'}`" :enabled = "dev" :text = "this.section.title" @valueUpdate = "titleUpdate($event)"/>
            <transform-input-paragraph class = "sectionParagraph" :text = "section.text" :enabled = "dev" @valueUpdate = "contentUpdate($event)"/>
        
        </div>

        <div class = "sectionDev" style = "display: flex; flex-direction: row" v-if = "this.dev">
            <label v-if = "dev" class = "btndefault btntextdefault">
                <input type = "file" v-if = "dev" accept = "image" style = "display: none;" @change = "upload"/>
                <span class = "mdi mdi-upload"></span>
            </label>
            <div style = "width: 100%; grid-area: delete; display:flex; flex-direction:row;" >
                <span v-if = "!this.deleting && dev" class = "mdi mdi-delete btndefault btntextdefault" @click = "this.deleting = true"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-check btndefault btntextdefault" @click = "this.deleting = false; confirmDelete();"></span>
                <span v-if = "this.deleting && dev" class = "mdi mdi-close btndefault btntextdefault" @click = "this.deleting = false"></span>
            </div>
        </div>
    </div>
</template>

<script>
import TransformInputParagraph from './TransformInputParagraph.vue';
import TransformInputSectionTitle from './TransformInputSectionTitle.vue';
export default {
    name: "OverviewSection",

    components:{
        'transform-input-section-title':TransformInputSectionTitle,
        'transform-input-paragraph': TransformInputParagraph
    },

    props:{
        dev: Boolean,
        section: Object,
        reversed: Boolean,
    },

    data(){
        return{
            deleting: false
        }
    },

    methods:{
        confirmDelete: function(){
            this.$emit("deleteSection", {id: this.section.id});
        },

        getBackground: function(section){
            //
            let ret = `background-image: linear-gradient(to ${this.reversed ? 'left': 'right'}, rgba(0,0,0,0.0), rgba(15,0,29,1) 75%), url(${section.image});`
            ret += 'background-size: 100%;'
            ret += 'background-repeat: repeat-y;'
            ret += `display: flex; justify-content: space-between; flex-direction: ${!this.reversed ? 'row': 'row-reverse'};`
            ret += `padding-${!this.reversed ? 'left': 'right'}: 5vw;`
            return ret;
        },

        titleUpdate: function(e){
            this.$emit("titleUpdate", {id: this.section.id, title: e.value});
        },

        contentUpdate: function(e){
            this.$emit("contentUpdate", {id: this.section.id, text: e.value});
        },

        upload: function(e){
            
            const image = e.target.files[0];
            const reader = new FileReader();

            let emitCallback = (base64) => this.$emit("imageUpdate", {id: this.section.id, image: base64});

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
.sectionParagraph{
    width: 50%;
}

.sectionTitle{
    width: 25%;
}

.section{

}
</style>