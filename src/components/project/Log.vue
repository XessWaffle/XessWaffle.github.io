<template>
    <div>
        <div class = "log">
            <div class = "header">
                <h4 class = "log-t">{{log.logTitle}}</h4>
                <h6 class = "log-d">{{log.date}}</h6>
            </div>

            <p class = "log-p">{{log.log}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Log",
    
    props:{
        log: Object
    }

}
</script>

<style scoped>
.header{
    display:flex;
    flex-direction: column;
    text-align:center;
    padding-left:1vw;
    padding-right:1vw;
    border-bottom: 1px solid purple;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: purple;

    transition:0.5s;

}

.log-t:hover{
    color:black;
    transition: 0.3s;
}

.log-d:hover{
    color:black;
    transition: 0.3s;
}

.log-p{
    font-size: 15px;
    text-align: left;
}

.log{
    width: 25vw;
    height: 80vh;
    overflow-y:auto;

    font-family: "Lucida Console", "Courier New", monospace;
}
</style>