<template>
    <div>
        <button class = "menuButton" @click = "menuItemClicked">{{this.menuString}}</button>
    </div>
</template>



<script>
export default {
    name: "MenuItem",
    props:{
        active: Boolean,
        menuItem: String
    },

    data(){
        return{
            menuString: this.active ? this.menuItem : ''
        }
    },

    watch: { 
        active: function() { // watch it
            if(this.active){
                this.menuString = this.menuItem

                let elements = document.getElementsByClassName("menuButton");

                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.textAlign = "right"
                }

            } else {
                this.menuString = '';
                
                let elements = document.getElementsByClassName("menuButton");

                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.textAlign = "center"
                }

            }
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
    .menuButton {
    
        width: 100%;
        text-align:right;

        font-family: "Lucida Console", "Courier New", monospace;
        font-size: 30px;

        padding-top: 20px;
        border: 3px solid #00000000;
        color: #eca1ff;
        background: none;

        transition: 0.75s;
    }

    .menuButton:hover{
        color: white;
        border-bottom-color:white;
        border-bottom-right-radius: 20px;
        font-size: 50px;
        transition:0.5s;
        box-shadow:0px 3px #5e286b;

    }

    .menuButton:active{
        color: gray;
        border-bottom-color: gray;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 60px;
        transition: 0.2s;
        
    }
</style>