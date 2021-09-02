<template>
    <div class = "sidebar_panel">
        <ul>
            <li v-for = "(item, index) in menuItems" v-bind:key = "index">
                <menu-item v-bind:menuItem = "item" />
            </li>
        </ul>    
    </div>
</template>


<script>
import MenuItem from './MenuItem.vue'
export default {

    name: "Sidebar",

    components: { MenuItem },
    props: {
        menuItems: Array
    }
}
</script>

<style scoped>
    .sidebar-panel {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
</style>