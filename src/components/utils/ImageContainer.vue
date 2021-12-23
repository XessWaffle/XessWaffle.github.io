<template>
    <div style='display: flex; flex-direction: column; justify-content: space-evenly; height: 20vh; width: 10vw;'>
        <img class='base64image' :src = "this.image.base64"/> 

        <div style = "width: 100%; text-align:center; display:flex; flex-direction:row;" >
            <span v-if = "!this.deleting && dev" class = "mdi mdi-delete btndelete" @click = "this.deleting = true"></span>
            <span v-if = "this.deleting && dev" class = "mdi mdi-check btndeleteconfirm" @click = "this.deleting = false; confirmDelete();"></span>
            <span v-if = "this.deleting && dev" class = "mdi mdi-close btndeleteconfirm" @click = "this.deleting = false"></span>
        </div>

    </div>
</template>

<script>
export default {
    name: "ImageContainer",

    props:{
        image: Object,
        dev: Boolean
    },

    data(){
        return{
            deleting: false
        }
    },

    methods: {
        confirmDelete: function(){
            this.$emit("imageDelete", {id: this.image.id});
        }
    }
}
</script>

<style scoped>
.btndelete{
    font-size: 30px;
    text-align: center;
    color: #00000000;
    transition:0.5s;

    width: 100%;
    height: 100%;
}

.btndelete:hover{
    color: white;
    transition:0.5s;
}

.btndeleteconfirm{
    font-size: 30px;
    text-align: center;
    color: gray;
    transition:0.2s;
}

.btndeleteconfirm:hover{
    color: white;
    transition:0.2s;
}
</style>