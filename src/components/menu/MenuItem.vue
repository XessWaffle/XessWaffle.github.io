<template>
    <div>
        <button id = "menuButton" @click = "menuItemClicked">{{menuItem}}</button>
    </div>
</template>



<script>
export default {
    name: "MenuItem",
    props:{
        menuItem: String
    },

    data(){
        return{

        }
    },

    methods:{
        menuItemClicked: function(){
            this.$emit("menuItmClicked", {name: this.menuItem});
        }
    }


}
</script>




<style scoped>

</style>