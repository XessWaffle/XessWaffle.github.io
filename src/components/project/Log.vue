<template>
    <div class = "log">
        
        <div style = "overflow-y:auto; overflow-wrap: break-word;">
            <div class = "header">
                <transform-input-log-title :text = "log.logTitle" :enabled = "dev" fontsize = "20px"/>
                <transform-input-log-title :text = "log.date" :enabled = "dev" fontsize = "15px"/>
            </div>

            <transform-input-log-paragraph :text = "log.log" :enabled = "dev"/>
        </div>

        <div style = "display: flex; justify-content: space-evenly">
            <button v-if = "dev" class = "btndefault btntextdefault"><span class = "mdi mdi-arrow-left"></span></button>
            <button v-if = "dev" class = "btndefault btntextdefault"><span class = "mdi mdi-minus"></span></button>
            <button v-if = "dev" class = "btndefault btntextdefault"><span class = "mdi mdi-arrow-right"></span></button>
        </div>
    </div>
</template>

<script>
import TransformInputLogParagraph from '../utils/TransformInputLogParagraph.vue'
import TransformInputLogTitle from '../utils/TransformInputLogTitle.vue'
export default {
    name: "Log",
    
    data(){
        return{

        }
    },

    components:{
        'transform-input-log-paragraph': TransformInputLogParagraph,
        'transform-input-log-title':TransformInputLogTitle
    },

    props:{
        log: Object,
        dev: Boolean
    }

}
</script>

<style scoped>
.log{
    display: flex;
    justify-content:space-between;

    flex-direction:column;

    width: 25vw;
    height: 80vh;

    padding: 5px;

    border:2px solid purple;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 4px 4px #b784f163;

    font-family: "Lucida Console", "Courier New", monospace;

    transition:0.5s;
}

.log:hover{
    transition: 0.5s;
    width: 50vw;
    border-width: 3px;
}

.header{
    text-align:center;
    padding-left:1vw;
    padding-right:1vw;
    border-bottom: 1px solid purple;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: purple;

    transition:0.5s;

}

</style>