<template>
    <div class = 'title'>
        <button v-if = "!this.inputActive" class = 'projName' :style = "getExpandedStyle()" @click = "this.inputActive = enabled;">{{this.text}}</button>
        <input v-if = "this.inputActive"  class = 'projName projNameInput' :style = "getExpandedStyle()" type = 'text' v-model = "key" @keyup.esc = "this.inputActive = !this.inputActive" @keyup.enter = "valueEmit(this.key)" @blur="valueEmit(this.key)"/>
    </div>

</template>

<script>
export default {
    name: "TransformInputTitle",

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

        getExpandedStyle: function(){
            let ret = "transition: 0.5s;";

            console.log(this.expanded);

            if(this.expanded){ 
                ret += 'color: #969696;'
                ret += "font-family: 'Courier New', Courier, monospace;"
                ret += `text-align: ${this.align};`
                ret += 'font-style: italic;'
                ret += 'font-weight: bold;'
                ret += 'font-size: 40px;'
                ret += 'padding-left: 0px;'
            } else {
                ret += 'text-align: center;'
                ret += 'font-style: normal;'
                ret += 'font-size: 30px;'
            }

            return ret;
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
    border: none;
    width: 100%;
    height:100%;
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