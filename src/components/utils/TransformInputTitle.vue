<template>
    <div class = 'title'>
        <button v-if = "!this.inputActive" class = 'projName' @click = "this.inputActive = enabled;">{{this.text}}</button>
        <input v-if = "this.inputActive"  class = 'projName projNameInput' type = 'text' v-model = "key" @keyup.enter = "valueEmit(this.key)" @blur="valueEmit(this.key)"/>
    </div>

</template>

<script>
export default {
    name: "TransformInputTitle",

    props: {
        text: String,
        enabled: Boolean
    },

    data(){
        return {
            inputActive: false,
            key: ''
        }
    },
    methods:{
        valueEmit: function(value){
            this.$emit('valueUpdate', {value: value});
            this.key = "";
            this.inputActive = false;
        }
    }    
}
</script>

<style scoped>
.title{
    display:flex;
    justify-content: center;
}
.projName{
    font-family: "Lucida Console", "Courier New", monospace;
    color: #eca1ff;
    font-size: 30px;
    text-align: center;
    border: none;
    transition:0.5s;
    background-color: #00000000;

}

.projName:hover{
    color: white;
    transition:0.5s;
    font-size:40px;
}

.projNameInput{
    border-bottom: 2px solid white;
}

.projNameInput:focus{
    outline: none;
}
</style>