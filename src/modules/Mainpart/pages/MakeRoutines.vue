<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';

export default{

    components: { UserNavbar, Footer },

    data() {
    return {
        exercises:[],
        lastPage:false,
        selectedExercise: null,
    }
    },

    mounted(){
        this.getProducts()
    },

    methods: {

        async getProducts() {
            try {
                const token = 
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTdjMTdmN2QwMTU3NWNjYjkwYzFkN2YwOTg0MGVlMjEyNzRhY2UwNWEwOWJkZGNiZTIwYzRiZWY5ZWNlZTI5Yzk5OGZjMjA2ZDUyYjZlNzEiLCJpYXQiOjE3MTQ1ODg5MTAuNTI2NjY1LCJuYmYiOjE3MTQ1ODg5MTAuNTI2NjcxLCJleHAiOjE3NDYxMjQ5MDkuOTc1MjQ3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.X-wLLPrZWBjmfp8xDDcodpvLD4iIOg3nKxjDzM_A8yj8oRn5qpiz9wQ_Ghq9isEPoeWXzn1v7-JN8kJ4XHeT1K44D7nDGxGdTOBS_LCFzkg7VLm41tCuqmPCelIL0wCNAHyRIeJ2wKTLYD4IDZP1WvZacayGcb2Y_f310QxvfP3HhDpzLY58CY4ijn7dHBQ7f-gaZVUKS9EnMM58r8Ruyo4Q9QT_XEaBZhDjqQke1-9_qkVs8pEBwxJVKUgFvg00hmbQYoeH1Z9LNUfc7Q0hV7sF6J9BEkqlU1rweDgALjtKem-d_8LpeFYlXXzfShcYG7N2RroxFqIkLmckiw839y9gzNs0AlQMddnPrqqy6Xv_BmBItl5H8yLe7OEBgBxei8e9xd0W-4bUys30SnRo3DBeeXoZEGHXii5-p1LJkF1crCCItbIc6-c-A-N_ShCShCcUj5Kh1YpNEG8bd5PZjCHRy4mSNuBwdMT_MbI3-DrtLN0txESC-ktl-irghrVSaYDg-Gub41Mxegyd5PSK_Q-v74dGGqiQhd4FDE4Bj3v34HPq-lQGtI-oonYI1R-9dWMQjLA0OVwpIcZg2sHPFIG8-SC95vh79bLhksyi2AFsuKo41JDDONYCaB4V-YNB-nPU07FOXBLUH7dAlcd_uL6VUTVBahilr6qJIuFCx4M"; 
                const respuesta = await fetch(`http://localhost:8000/api/exercise`, {
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
            // Método para mostrar el modal con la información del ejercicio
            this.selectedExercise = exercise;
        },

        closeExerciseInfoModal() {
            // Método para cerrar el modal
            this.selectedExercise = null;
        },






    }


}

</script>


<template>

    <main>

        <UserNavbar></UserNavbar>   

        <section class="contenedor_exercises">

              <!-- Modal -->
        <div class="modal" v-if="selectedExercise">

            <div class="modal__content">
                <span class="close" @click="closeExerciseInfoModal">&times;</span>
                <h2>{{ selectedExercise.name }}</h2>
                <img :src="selectedExercise.image" alt="image">
                <p>{{ selectedExercise.description }}</p>
            </div>

        </div>

            <div class="card" v-for="exercise in exercises" :key="exercise.id">

                <p>{{exercise.name}}</p>
                <img :src="exercise.image" alt="image">

                <div class="card__btns">

                    <a><img src="../../../assets/images/plus.svg" alt="añadir"></a>
                    <a @click="showExerciseInfoModal(exercise)"> <img src="../../../assets/images/info.svg" alt="info"> </a>
                    
                    
                </div>

            </div>



      

        </section>

        <Footer></Footer>

        

    </main>

</template>


<style scoped>



.modal{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.423);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.modal__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 400px;
    height: 500px;
}

.modal__content img{
    width: 200px;
    height: 200px;
}


section{
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