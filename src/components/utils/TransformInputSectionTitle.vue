<template>
    <div class = 'title'>
        <button v-if = "!this.inputActive" class = 'projName' @click = "this.inputActive = enabled;">{{this.text}}</button>
        <input v-if = "this.inputActive"  class = 'projName projNameInput' type = 'text' v-model = "key" @keyup.esc = "this.inputActive = !this.inputActive" @keyup.enter = "valueEmit(this.key)" @blur="valueEmit(this.key)"/>
    </div>

</template>

<script>
export default {
    name: "TransformInputSectionTitle",

    props: {
        text: String,
        enabled: Boolean,
        expanded: Boolean,
        align: String,
    },

    data(){
        return {
            inputActive: false,
            key: '',
        }
    },
    methods:{
        valueEmit: function(value){
            if(this.key != ""){    
                this.$emit('valueUpdate', {value: value});
                this.key = "";
                this.inputActive = false;
            }
        },
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
    font-size: 40px;
    color: white;
    border: none;
    transition:0.5s;
    background-color: #ad66ff1a;

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