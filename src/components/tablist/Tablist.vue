<template>
    <div>
        <ul id = "tablist">
            <li v-for= "(item, index) in tabItems" v-bind:key="index"> 
                <button v-bind:class = "[item == selected ? 'activetab' : 'tab']" @click = "selected = item">{{item}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Tablist',

    data(){
        return{
            selected: ""
        }
        
    },

    props: {
        tabItems:Array
    }

}
</script>


<style scoped>
    #tablist{
        
    }
</style>