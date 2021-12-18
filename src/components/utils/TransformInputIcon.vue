<template>
    <div class = 'container'>
        <button v-if = "!this.inputActive" class = 'defaultButton' @click = "this.inputActive = enabled;"><span :class = "'mdi ' + this.icon"></span></button>
        <input v-if = "this.inputActive"  class = 'defaultButton lightweightInput' type = 'text' v-model = "key" @keyup.enter = "valueEmit(this.key)" @blur="valueEmit(this.key)"/>
    </div>

</template>

<script>
export default {
    name: "TransformInputIcon",

    props: {
        icon: String,
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
.container{
    display:flex;
    justify-content: center;
}

.lightweightInput{
    border-bottom: 2px solid black;
}

.lightweightInput:focus{
    outline: none;
}
</style>