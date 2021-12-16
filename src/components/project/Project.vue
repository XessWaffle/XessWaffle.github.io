<template>
    <div>
        <h1 id = "title">{{this.title}}</h1>
        
        <h3 id = "desc-t">Description</h3>
        <p id = "desc-p">{{description}}</p>
        
        <button id = "log" @click = "this.showLog = !this.showLog">Show Logs</button>
        <div id = "logs">
            <ul v-if = "this.showLog">
                <li v-for = "(log, index) in logs" v-bind:key="index">
                    
                    <h4 class = "log-d">{{log.date}}</h4>
                    <p class = "log-p">{{log.log}}</p>

                </li>
            </ul>

        </div>

    </div>
</template>

<script>
export default {
    name: "Project",

    props:{
        title: String,
        description: String,
        logs: Array
    },

    data(){
        return{
            showLog: true,
        }
    },



}
</script>