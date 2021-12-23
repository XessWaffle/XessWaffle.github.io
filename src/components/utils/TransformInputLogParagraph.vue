<template>
    <div class = 'paragraph'>
        <p v-if = "!this.inputActive" class = 'para' @click = "this.inputActive = enabled;">{{this.key}}</p>
        <textarea rows = '20' v-if = "this.inputActive"  class = 'para lightweightInput' type = 'text' v-model = "key" @keyup.esc = "this.inputActive = !this.inputActive" @blur="valueEmit(this.key)"></textarea>
    </div>

</template>

<script>
export default {
    name: "TransformInputLogParagraph",

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
            if(value != ''){
                this.$emit('valueUpdate', {value: value});
                this.inputActive = false;
            }
        }
    }    
}
</script>

<style scoped>
.paragraph{
    display:flex;
    justify-content: center;
    padding: 5px;
}
.para{
    font-family: "Lucida Console", "Courier New", monospace;
    text-align: left;
    border: none;
    color:rgb(125, 85, 151);
    font-size: 15px;
    background-color: #00000000;
    white-space: pre-wrap;
    overflow-wrap:break-word;
}

.para:hover{
    color: white;
    transition:0.5s;
}

.lightweightInput{
    width:100%;
    height: auto;
    border-bottom: 2px solid black;
}

.lightweightInput:focus{
    outline: none;
}
</style>