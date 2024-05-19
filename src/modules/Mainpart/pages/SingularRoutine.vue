<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { defineStore } from 'pinia';
import { CurrentRoutine } from '../../../stores/CurrentRoutine.js'
import router from '../../../router/router.js'

export default{

    components: { UserNavbar, Footer },

    data() {
        return {
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
                const token = 
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWU4M2FkZWMxMGFlYjY5ZjBjMTA0MmUwM2VkYzM0MmVhMGU4ODliMDZiYmJlMTk1YmYxNzQwMzExYmExNDMzODAzZGFmZWQzODkwNDA0ZTUiLCJpYXQiOjE3MTU3MDQ4MDEuMDg0MDc3LCJuYmYiOjE3MTU3MDQ4MDEuMDg0MDgsImV4cCI6MTc0NzI0MDgwMC44NjU0OTIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.H4MsZKRnv3g_50jd2BgntiLu00K1hAzTxbFG22kyBCtF03eKiwpDqKaaL0DtJDRkoaJ4Z0b2eHqbjL_kYdieaMIsSp56kYE_0XQpuw-UoaKHLo_s2Sap-eTIgk_FN1k8V-3bSM8tF-N6BKTuA2ButIijwtDqCspcrkTRFy7UxGL21zO7mYPqBcYNOrwgHBQJzzwGhfP_7z0S-YGORbU3kd5kjO7TrLTiAgSZSsSXK3z08K2CaxQN526yYIxfS74P5RBY5Ji7h54xhKsCHU6GbN_ExfSIPLSP3LmJYJRRtog5ca5LKKaXrZYAcfJWyOTbKbzUgdx6MutbKvOEHxRyfO-Znv5bTBCIvfdR5feHBa95PIg-O7MlvAJRiOcgPkx259TnewC_3OabvgehhW2mL1X0PemyS2GvY7ghgvk9OApO8i9xC5YhFOAnLbUee-Fx0J5qpQdF5kIe-v3HO4QXixpuynlzwosHM-LUGPY0EV2ujFt7MYX_OctGuCpAPKUyaPHWbB5W9I4dYikBcBtQarh7Y-VexkFGDj3ZCQ8ErQzJWjDY1DWzxf1VIqAAEdIWR-YzLtw5SZoQvsA9gCWZACC1_QEdsPomHc-l36I2YPISZ3xNyDSwE7fKXXTf9nCGYs1bp3gdyJxSkvdQ4zOpE7-TfCO0t7IDZU0iXuV2uSM"
                const respuesta = await fetch(`http://localhost:8000/api/exercise/${this.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
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