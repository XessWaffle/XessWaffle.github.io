<template>
    <div>
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
  components: { MenuItem },
    props: {
        menuItems: Array
    }
}
</script>

<style scoped>

</style>