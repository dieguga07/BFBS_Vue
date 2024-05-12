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
            currentRutine:CurrentRoutine()
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
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWU4NmM3YWM0ODllYTI3MGViOGI2ZWM3Mjc2ZThkMGRiOTc3ZTZkYWI3NTk1M2UwOGMzNDYzMWUzMjNmY2QxZmVmOTQ1OGU4YWFkOWVjY2QiLCJpYXQiOjE3MTQ5OTA5NzkuNzM1OTU0LCJuYmYiOjE3MTQ5OTA5NzkuNzM1OTYsImV4cCI6MTc0NjUyNjk3OS4wMzQ0MTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.mQ_0Fs8m7bn4MwkXf97TPDhM2QVjzGvl20hcTtG-_utBZBHO3YmXGOeishtXdaZlJ8NOxED_3CItD4aoUhRp4Mrvonk2lt6E38kxj-CYOCcPzdPDz0M5bhd1iJ6hz6NIg-q8nbLpLD3m0RAqqYxj8anneiKBTfXUCc7JgVxC3Vi9bUMChpITo9z7O0XVO9h_p7GMHf0O6pPDi5Dai6GFbf_DbngqC26tO1DpBvz42ZSJ2WezCk0aV6y4SwX650trNdRsAqa6miTfv6waIWF5_lls-V9y68qK92fuffAyoWw5ayRxmpOPTdL0mSMiIVdagCMKOtIaFSP18fu2HXNK0Qe1q6_hPjNL4t8c7k9GuAWbGEcRRG8hTUZooQcBLhud5BUIgaiVJVNw4TwqZWUNoxv1tibBIeGdDO7fpEZTtXGT4XfFpdLBli-aSmgYzaXnIjIlm5rtNTmKyryfHjxJ8Vmg3fIjroJoLy08_b3GFN2qR40jGvJmeANpNNXNUvZBqojVDza8JNyHhNj57l5my533CmxwvZB-QG2voiJuV5xl7Q4XbYjOSQTCpeY0i5e2FwiTvnxWuC0NGnTcShpdHRGRexZkfan8Cp6sJ6vWjYAUv4AWB36U8orIThT7AOW2BTAOtJf4wMtRlnWlh1SNNagWnK8esq8XIhlgDVBhPGA"; 
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
           this.currentRutine.addExercise(exercise);
           router.push("/private/myRoutines")
           console.log(exercise);
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

            <input type="text" placeholder="Series">

            <input type="text" placeholder="Repetitions">

            <button @click="addToRoutine(exercise)">ADD EXERCISE</button>

        </form>

        <router-link to="/private/makeRoutines"><i class="fa-solid fa-xmark fa-2xl" style="color: #000000;"></i></router-link>

    </section>
   
    <Footer></Footer>
   
</main>



</template>


<style scoped>

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