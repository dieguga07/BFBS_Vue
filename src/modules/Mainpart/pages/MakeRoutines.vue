<script>

import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import router from '../../../router/router';
import { UserContext } from '../../../stores/UserContext';

export default{

    components: { UserNavbar, Footer },

    data() {
        const usercontext = UserContext()
    return {
        token:usercontext.token,
        exercises:[],
        lastPage:false,
        selectedExercise: null,
        searchTerm: '',
        page:1,
        lastPage:false,
        url:`http://localhost:8000/api/exercise?page=${this.page}`,
        category: "main",
        userSearch:"",
        defaultImage: "../../../assets/images/pesas.jpg",
    }
    },

    mounted(){
        this.getExercises(this.url)
    },

    methods: {

        async getExercises(urlActive) {
            try {
                
                const respuesta = await fetch(`${urlActive}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                const data = await respuesta.json();
                console.log(data)
                this.exercises = data.data;

                if(data.next_page_url === null){
                    this.lastPage = true
                }else{
                    this.lastPage = false
                }

                console.log(this.exercises);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        },


        async brazosCategory(){
            this.page = 1
            this.category = "brazos"
            const brazosUrl = `http://localhost:8000/api/exercise-category/brazos?page=${this.page}`
            await this.getExercises(brazosUrl)
        },

        async piernasCategory(){
            this.page = 1
            this.category = "piernas"
            const piernasUrl = `http://localhost:8000/api/exercise-category/piernas?page=${this.page}`
            await this.getExercises(piernasUrl)
        },

        async abdomenCategory(){
            this.page = 1
            this.category = "abdomen"
            const abdomenUrl = `http://localhost:8000/api/exercise-category/abdomen?page=${this.page}`
            await this.getExercises(abdomenUrl)
        },

        async pechoCategory(){
            this.page = 1
            this.category = "pecho"
            const pechoUrl = `http://localhost:8000/api/exercise-category/pecho?page=${this.page}`
            await this.getExercises(pechoUrl)
        },

        async espaldaCategory(){
            this.page = 1
            this.category = "espalda"
            const espaldaUrl = `http://localhost:8000/api/exercise-category/espalda?page=${this.page}`
            await this.getExercises(espaldaUrl)
        },

        async hombrosCategory(){
            this.page = 1
            this.category = "hombros"
            const hombrosUrl = `http://localhost:8000/api/exercise-category/hombros?page=${this.page}`
            await this.getExercises(hombrosUrl)
        },


        async allExercises(){
            this.page = 1
            this.category = "main"
            const allUrl = `http://localhost:8000/api/exercise?page=${this.page}`
            await this.getExercises(allUrl)
        },

        async searchExercises() {
            this.page = 1;
            this.category = "search";
            if (this.userSearch.trim() !== "") {
                const searchUrl = `http://localhost:8000/api/exercise-search/search?query=${this.userSearch}&page=${this.page}`
                await this.getExercises(searchUrl)
            } else {
                this.exercises = []
            }
        }, 

        showExerciseInfoModal(exercise) {
            this.selectedExercise = exercise;
        },

        closeExerciseInfoModal() {
            this.selectedExercise = null;
        },

        pushexercise(exercise){
            router.push(`/private/addRoutines/${exercise.id}`);
        },

        async nextPage(category) {
            if (!this.lastPage && this.category !== "search") {
                this.page += 1;
                const nextPageUrl = category === "main" ? `http://localhost:8000/api/exercise?page=${this.page}` : `http://localhost:8000/api/exercise-category/${category}?page=${this.page}`
                await this.getExercises(nextPageUrl)
            } else if ( !this.lastPage && this.category === "search") {
                this.page += 1;
                const searchUrl = `http://localhost:8000/api/exercise-search/search?query=${this.userSearch}&page=${this.page}`
                await this.getExercises(searchUrl)
            }
        },

        async previousPage(category) {
            if (this.page !== 1 && this.category !== "search") {
                this.page -= 1
                const previousPageUrl = category === 'main' ? `http://localhost:8000/api/exercise?page=${this.page}` : `http://localhost:8000/api/exercise/${category}?page=${this.page}`
                await this.getExercises(previousPageUrl)
            } else if (this.page !== 1 && this.category === "search") {
                this.page -= 1
                const searchUrl = `http://localhost:8000/api/exercise-search/search?query=${this.userSearch}&page=${this.page}`
                await this.getExercises(searchUrl);
            }
        },

    },

}

</script>


<template>

    <main>

        <UserNavbar></UserNavbar>   

        <section class="contenedor">

            <p class="contenedor_title">CREA NUEVAS RUTINAS</p>
            
            <div class="contenedor_filters">
                <label for="search" class="hidden_label">Buscar</label>
                <input v-model="userSearch" @keyup.enter="searchExercises" id="search" name="search" type="search" placeholder="Search...">
                
                <div class="filter">
                    <i class="fa-solid fa-filter fa-2xl" style="color: #000000;"></i>  
                
                    <div class="filter_btns oculto">
                        <p @click="brazosCategory" :class="{ 'category_selection': category === 'brazos' }"> Brazos</p>
                        <p @click="piernasCategory" :class="{ 'category_selection': category === 'piernas' }"> Piernas</p>
                        <p @click="abdomenCategory" :class="{ 'category_selection': category === 'abdomen' }"> Abdomen</p>
                        <p @click="pechoCategory" :class="{ 'category_selection': category === 'pecho' }"> Pecho</p>
                        <p @click="espaldaCategory" :class="{ 'category_selection': category === 'espalda' }"> Espalda</p>
                        <p @click="hombrosCategory" :class="{ 'category_selection': category === 'hombros' }"> Hombros</p>
                        <p @click="allExercises" :class="{ 'category_selection': category === 'main' }"> Todos</p>
                    </div>
                </div> 

            </div>

  

        </section>
       
        <section class="contenedor_exercises">

            <!-- Modal -->
            <div class="modal" v-if="selectedExercise">

                <div class="modal__content">
                <a class="close_modal" @click="closeExerciseInfoModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>
                    <h2>{{ selectedExercise.name }}</h2>
                    <img :src="selectedExercise.image ? selectedExercise.image  : 'https://web-back.perfectgym.com/sites/default/files/styles/460x/public/equipment%20%286%29.jpg?itok=bC0T32-K' " :alt="selectedExercise.name">
                    <p>{{ selectedExercise.description }}</p>
                </div>

            </div>

            <div class="card" v-for="exercise in exercises" :key="exercise.id">

                <p>{{exercise.name}}</p>
                <img :src="exercise.image ? exercise.image  : 'https://web-back.perfectgym.com/sites/default/files/styles/460x/public/equipment%20%286%29.jpg?itok=bC0T32-K' " :alt="exercise.name">

                <div class="card__btns">

                    <a @click="pushexercise(exercise)"><img src="../../../assets/images/plus.svg" alt="añadir"></a>
                    <a @click="showExerciseInfoModal(exercise)"> <img src="../../../assets/images/info.svg" alt="info"> </a>
                    
                </div>

            </div>

        </section>

        <section class="paginate">

            <i @click="previousPage(category)" class="fa-solid fa-chevron-left fa-2xl" style="color: #000000;"> </i>
            <p>{{ page }}</p>
            <i @click="nextPage(category)" class="fa-solid fa-chevron-right  fa-2xl" style="color: #000000;"></i>

        </section>

        <Footer></Footer>

    </main>

</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

.hidden_label{
    user-select: none;
    color: transparent;
    width: 0px;
}

.category_selection{
    color:rgba(64, 216, 119, 1);
}


.oculto{
    display: none;
}

.contenedor_filters{
    display: flex;
}

.filter{
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: row;
}

.filter:hover .oculto{
    display: unset;
   
}

.filter_btns{
    position: absolute;
    display: none;
    justify-content:start;
    flex-direction: column;
    border: 1px solid black;
    background-color: white;
    left: 50%;
    top: 50%;
}

.filter_btns p{
    font-size: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}

.paginate{

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: 50px;
    height: 100px;
  
}

.paginate i{

    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
}

.paginate p{

    font-size: 25px;
    margin-left: 20px;
}


.contenedor{

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 150px;
    height: 100px;
    gap: 40px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.contenedor{
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.contenedor_title{
    font-size: 4vw;
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
    text-align: center;
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
    padding-bottom: 150px;
    margin: 0 150px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 100px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    min-height: 50vh;
}

.card{

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: center;
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
    width: 200px;
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

@media screen and (max-width:700px){

    .contenedor {
        gap: 40px; 
        margin-top: 60px;
    }

    .contenedor_exercises{
        gap: 20px;
        padding-bottom: 50px;
    }

    .modal__content{
        width: 40vh;
    }

    .filter_btns{
        
        left: -26px;
    }

    .contenedor input{
       width:180px;
    }

}



</style>