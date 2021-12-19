<template>
    <div class = 'paragraph'>
        <p v-if = "!this.inputActive" class = 'para' @click = "this.inputActive = enabled;">{{this.key}}</p>
        <textarea v-if = "this.inputActive"  class = 'para lightweightInput' type = 'text' v-model = "key" @blur="valueEmit(this.key)"></textarea>
    </div>

</template>

<script>
export default {
    name: "TransformInputParagraph",

    props: {
        text: String,
        enabled: Boolean
    },

    data(){
        return {
            inputActive: false,
            key: this.text
        }
    },
    methods:{
        valueEmit: function(value){
            this.$emit('valueUpdate', {value: value});
            this.inputActive = false;
        }
    }    
}
</script>

<style scoped>
.paragraph{
    display:flex;
    justify-content: center;
}
.para{
    font-family: "Lucida Console", "Courier New", monospace;
    text-align: center;
    border: none;
    color: gray;
    font-size: 15px;
    background-color: #00000000;
    overflow-y:auto;
    overflow-wrap:break-word
}

.para:hover{
    color: white;
    transition:0.5s;
}

.lightweightInput{
    width:100%;
    height: 100%;
    border-bottom: 2px solid white;
}

.lightweightInput:focus{
    outline: none;
}
</style>