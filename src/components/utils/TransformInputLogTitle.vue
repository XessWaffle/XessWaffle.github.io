<template>
    <div class = 'title'>
        <button v-if = "!this.inputActive" class = 'logtitlefont' :style = "`font-size = ${this.fontsize};`"  @click = "this.inputActive = enabled;">{{this.text}}</button>
        <input v-if = "this.inputActive" class = 'logtitlefont logInput' :style = "`font-size = ${this.fontsize};`"  type = 'text' v-model = "key" @keyup.esc = "this.inputActive = !this.inputActive" @keyup.enter = "valueEmit(this.key)" @blur="valueEmit(this.key)"/>
    </div>

</template>

<script>
export default {
    name: "TransformInputLogTitle",

    props: {
        text: String,
        enabled: Boolean,
        fontsize: String
    },

    data(){
        return {
            inputActive: false,
            key: ''
        }
    },
    methods:{
        valueEmit: function(value){
            if(this.key != ""){    
                this.$emit('valueUpdate', {value: value});
                this.key = "";
                this.inputActive = false;
            }
        }
    }    
}
</script>

<style scoped>
.title{
    display:flex;
    justify-content: center;
}

.logtitlefont{
    font-family: "Lucida Console", "Courier New", monospace;

    color: purple;

    background: none;
    border: 2px solid #00000000;
    transition:0.2s;
}

.logtitlefont:hover{
    color:white;
    transition:0.2s;
}

.logInput{
    border-bottom: 2px solid white;
}

.logInput:focus{
    outline: none;
}
</style>