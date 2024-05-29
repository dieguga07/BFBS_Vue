<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { UserContext } from '../../../stores/UserContext';
import { CurrentRoutine } from '../../../stores/CurrentRoutine.js'
import router from '../../../router/router.js'

export default{

    components: { UserNavbar, Footer },

    data() {
        const usercontext = UserContext();
        return {
            token:usercontext.token,
            id:null,
            exercise:[],
            currentRutine:CurrentRoutine(),
            series: 0,
            repetitions: 0
        }
    },

   created() {
    const { id } = this.$route.params
    this.id = id

   },

   mounted(){
        this.getProductByID()
    },

   methods: {

    async getProductByID() {
            try {
                const respuesta = await fetch(`http://localhost:8000/api/exercise/${this.id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                const data = await respuesta.json();
                this.exercise = data;
                console.log(this.exercise);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {
                this.loader = false;
            }
        },


        addToRoutine(exercise){

            const seriesValue = this.series;
            const repetitionsValue = this.repetitions;

            const exerciseData = {
                id: exercise.id,
                name:exercise.name,
                image:exercise.image,
                serie: seriesValue,
                repetition: repetitionsValue
            };


            let currentRoutine = this.currentRutine.exercises;

            currentRoutine.push(exerciseData);

            this.currentRutine.exercises = currentRoutine;

            router.push("/private/myRoutines");
            
            console.log(exerciseData);
        }


   }


}

</script>


<template>



<main>

    <UserNavbar></UserNavbar>

    <section class="container">

        

        <p>{{ exercise.name }}</p> 

        <img :src="exercise.image" :alt="exercise.name">

        <form class="container_form">

            <input type="text" placeholder="Series" v-model="series">

            <input type="text" placeholder="Repetitions"  v-model="repetitions">

            <button @click="addToRoutine(exercise)">ADD EXERCISE</button>

        </form>

        <router-link to="/private/makeRoutines"><i class="fa-solid fa-xmark fa-2xl" style="color: #000000;"></i></router-link>

    </section>
   
    <Footer></Footer>
   
</main>



</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
  
    padding-top: 5%;
    padding-bottom: 10%;

    form{
        padding-bottom: 30px;
    }

    img{
        width: 250px;
        height: 200px;
    }


    p{
        width: 250px;
        font-size: 30px;
        padding-bottom: 15px;
    }

    button {
        width: 250px;
        color:white;
        background-color: rgba(19, 169, 73, 1);
        border-radius: 10px;
        height: 40px;
        border: none;
        font-family: "Goldman", sans-serif;
        font-style: normal;
        font-size: 20px;
    }

}


.container_form input {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 50px;
    border: none;
    color:rgb(5, 5, 5);
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(0, 0, 0);
    margin-top: 15px;
    margin-bottom: 15px;
    
}

</style>