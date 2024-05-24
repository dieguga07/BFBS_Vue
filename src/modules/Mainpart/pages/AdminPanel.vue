<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { CurrentRoutine } from '../../../stores/CurrentRoutine.js'
import router from '../../../router/router.js'

export default{

    components: { UserNavbar, Footer },

    data() {
        return {
 
        }
    },

   created() {

   },

   mounted(){

    },

   methods: {

   }


}

</script>


<template>

    <main>
       <UserNavbar></UserNavbar>

        <Footer></Footer>
    </main>



</template>


<style scoped>


</style>