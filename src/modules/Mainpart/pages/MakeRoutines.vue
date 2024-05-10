<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import router from '../../../router/router';

export default{

    components: { UserNavbar, Footer },

    data() {
    return {
        exercises:[],
        lastPage:false,
        selectedExercise: null,
        searchTerm: '',
        page:1,
    }
    },

    mounted(){
        this.getProducts()
    },

    methods: {

        async getProducts() {
            try {
                const token = 
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWU4NmM3YWM0ODllYTI3MGViOGI2ZWM3Mjc2ZThkMGRiOTc3ZTZkYWI3NTk1M2UwOGMzNDYzMWUzMjNmY2QxZmVmOTQ1OGU4YWFkOWVjY2QiLCJpYXQiOjE3MTQ5OTA5NzkuNzM1OTU0LCJuYmYiOjE3MTQ5OTA5NzkuNzM1OTYsImV4cCI6MTc0NjUyNjk3OS4wMzQ0MTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.mQ_0Fs8m7bn4MwkXf97TPDhM2QVjzGvl20hcTtG-_utBZBHO3YmXGOeishtXdaZlJ8NOxED_3CItD4aoUhRp4Mrvonk2lt6E38kxj-CYOCcPzdPDz0M5bhd1iJ6hz6NIg-q8nbLpLD3m0RAqqYxj8anneiKBTfXUCc7JgVxC3Vi9bUMChpITo9z7O0XVO9h_p7GMHf0O6pPDi5Dai6GFbf_DbngqC26tO1DpBvz42ZSJ2WezCk0aV6y4SwX650trNdRsAqa6miTfv6waIWF5_lls-V9y68qK92fuffAyoWw5ayRxmpOPTdL0mSMiIVdagCMKOtIaFSP18fu2HXNK0Qe1q6_hPjNL4t8c7k9GuAWbGEcRRG8hTUZooQcBLhud5BUIgaiVJVNw4TwqZWUNoxv1tibBIeGdDO7fpEZTtXGT4XfFpdLBli-aSmgYzaXnIjIlm5rtNTmKyryfHjxJ8Vmg3fIjroJoLy08_b3GFN2qR40jGvJmeANpNNXNUvZBqojVDza8JNyHhNj57l5my533CmxwvZB-QG2voiJuV5xl7Q4XbYjOSQTCpeY0i5e2FwiTvnxWuC0NGnTcShpdHRGRexZkfan8Cp6sJ6vWjYAUv4AWB36U8orIThT7AOW2BTAOtJf4wMtRlnWlh1SNNagWnK8esq8XIhlgDVBhPGA"; 
                const respuesta = await fetch(`http://localhost:8000/api/exercise?page=${this.page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await respuesta.json();
                this.exercises = data.data;
                console.log(this.exercises);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {
                this.loader = false;
            }
        },

        showExerciseInfoModal(exercise) {
            this.selectedExercise = exercise;
        },

        closeExerciseInfoModal() {
            this.selectedExercise = null;
        },

        searchExercise() {
            return this.exercises.filter(exercise => 
                exercise.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            )

        },

        pushexercise(exercise){
            router.push(`/private/addRoutines/${exercise.id}`);
        }

    }


}

</script>


<template>

    <main>

        <UserNavbar></UserNavbar>   


        <section class="contenedor">

            <p>MAKE YOUR NEW ROUTINE</p>
            
            <div>
                <input type="search" v-model="searchTerm" placeholder="Search...">
                <i class="fa-solid fa-filter fa-2xl" style="color: #000000;"></i>
            </div>
        

        </section>
       
        <section class="contenedor_exercises">

            <!-- Modal -->
            <div class="modal" v-if="selectedExercise">

                <div class="modal__content">
                <a class="close_modal" @click="closeExerciseInfoModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>
                    <h2>{{ selectedExercise.name }}</h2>
                    <img :src="selectedExercise.image" alt="image">
                    <p>{{ selectedExercise.description }}</p>
                </div>

            </div>

            <div class="card" v-for="exercise in searchExercise()" :key="exercise.id">

                <p>{{exercise.name}}</p>
                <img :src="exercise.image" alt="image">

                <div class="card__btns">

                    <a @click="pushexercise(exercise)"><img src="../../../assets/images/plus.svg" alt="añadir"></a>
                    <a @click="showExerciseInfoModal(exercise)"> <img src="../../../assets/images/info.svg" alt="info"> </a>
                    
                </div>

            </div>


        </section>

        <Footer></Footer>

        

    </main>

</template>


<style scoped>

.contenedor{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    height: 100px;
    gap: 40px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.contenedor p{
    font-size: 4vw;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.contenedor input{
    font-family: "Goldman", sans-serif;
    font-style: normal;
    max-width: 40%;
    min-height: 40px;
    min-width: 250px;
    border: 1px solid black;
    padding-left: 20px;
   
}

.contenedor input::placeholder{
     color: rgba(0, 0, 0, 0.462);
 }

.modal{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.fa-2xl {
    font-size: 32px;
}

.fa-solid{
    margin-left: 20px
}

.modal__content a{
    margin-top: 30px;
    display: flex;
    align-self: start;
   
}

.modal__content p{
    width: 80%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: justify;
}

.modal__content{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 55vh;
    height: 75vh;
    border-radius: 40px;
    gap: 40px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.modal__content img{
    width: 70%;
    height:40%;
  
}


section .contenedor_exercises{
    min-height: 80vh;
}


.contenedor_exercises{
    display: grid;
    justify-content: center;
    justify-items: center;
    padding-top: 50px;
    padding-bottom: 200px;
    margin: 0 150px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 100px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.card{
     display: flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     font-family: "Goldman", sans-serif;
    font-style: normal;
}

.card p{

    margin-bottom: 10px;
    font-size: 15px;
    max-width: 100%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: center;
}

.card__btns{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:10px;
    background-color: black;
    height: 50px;
    width: 100%;
    color: antiquewhite;
}

.card img{
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.card a img{
    width: 35px;
    height:35px;

}




</style>