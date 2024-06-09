<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { UserContext } from '../../../stores/UserContext';
import { CurrentRoutine } from '../../../stores/CurrentRoutine';

export default {
    components: { UserNavbar, Footer },

    data() {
        const usercontext = UserContext()
        const currentRoutine = CurrentRoutine()
        return {
            token:usercontext.token,
            routines:[],
            storedRoutines: { exercises: [] },
            currentRoutine: currentRoutine, 
            modalRemoveCurrentRoutine:false,
            modalAddCurrentRoutine:false,
            current_routine:currentRoutine.exercises,
            rutine_name:"Nombre de la rutina",
            user_id:usercontext.id,
            modalRemoveUserRoutine:false,
            modalEditUserRoutine:false,
            routineSelectedId:0,
            editRoutineSelected: { exercises: [] }, 
            editRoutineID:0
        }
    },

    
    mounted() {

        this.getUserRoutines()

        const storedData = localStorage.getItem('currentRoutine')

        if (storedData) {
            this.storedRoutines = JSON.parse(storedData)

            console.log("stored",this.storedRoutines)
        }

    },
    
    methods: {

        setCurrentRoutine(routine) {
            localStorage.setItem('currentRoutine', JSON.stringify(routine))
            this.storedRoutines = routine
        },

        async getUserRoutines(){

            try{
                const response = await fetch(`https://bfbslaravel-production.up.railway.app/api/get-user-routines/${this.user_id}`,{
                        method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`
                            },
                })
                if (response.ok) {
                        const responseData = await response.json()
                        this.routines = responseData

                    } else {
                        throw new Error('Error al obtener las rutinas al usuario')
                    }    
            }catch (error){
                console.error('Error al obtener las rutinas al usuario:', error)
            }
        },

        async addUserRoutines(routine_id){

            const userId = parseInt(this.user_id)

            try{
                const response = await fetch(`https://bfbslaravel-production.up.railway.app/api/create-user-routine/${userId}/${routine_id}`,{
                    method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        },

                })
                if (response.ok) {
                        const responseData = await response.json();
                        this.getUserRoutines()

                    } else {
                        throw new Error('Error al asignar rutina al usuario')
                    }
            }catch (error){
                console.error('Error al asignar la rutina al usuario:', error)
            }
        },

         
        async addCurrentRoutine(){
            try {
                const routineData = {
                    routine_name: this.rutine_name,
                        exercises: this.storedRoutines.exercises.map(exercise => ({
                            exercise_id: exercise.id,
                            serie: exercise.serie,
                            repetition: exercise.repetition
                    }))
                };  
                const response = await fetch('https://bfbslaravel-production.up.railway.app/api/create-routine', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify(routineData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const new_routine_id = parseInt(responseData.routine)

                    this.clearCurrentRoutine();
                    this.addUserRoutines(new_routine_id)
                    localStorage.removeItem('currentRoutine')
                    this.storedRoutines.exercises = []
                    this.closeAddCurrentRutineModal()
                    this.current_routine.exercises = []

                } else {
                    throw new Error('Error al agregar la rutina')
                }
            } catch (error) {
                console.error('Error al agregar la rutina:', error)
            }
        },


        openRemoveUserRoutine(routineId){
            this.modalRemoveUserRoutine = true
            this.routineSelectedId = routineId
        },

        closeRemoveUserRoutine(){
            this.modalRemoveUserRoutine = false
            this.routineSelectedId = 0
        },

// ------------------------------------------------------------------------------------

        openEditUserRoutine(routine, id) {
            this.modalEditUserRoutine = true

            this.editRoutineSelected = {
                exercises: routine.exercises.map(exercise => ({
                    id: exercise.id,
                    name: exercise.name,
                    image: exercise.image,
                    repetition: exercise.repetitions ? exercise.repetitions : exercise.repetition,
                    serie: exercise.series ? exercise.series : exercise.serie, 
                }))
            }

            this.editRoutineID = id;
        },

        closeEditUserRoutine(){
            this.modalEditUserRoutine = false
            this.editRoutineSelected = { exercises: [] }
        },

// ------------------------------------------------------------------------------------

        closeAllCurrentRutineModal(){
            this.modalRemoveCurrentRoutine = false
        },

        openAllCurrentRutineModal(){
            this.modalRemoveCurrentRoutine = true
        },

// ------------------------------------------------------------------------------------

        openAddCurrentRutineModal(){
            this.modalAddCurrentRoutine = true
        },

        closeAddCurrentRutineModal(){
            this.modalAddCurrentRoutine = false
        },

       async removeUserRoutine(routine_id){
            try{
                const response = await fetch(`https://bfbslaravel-production.up.railway.app/api/delete-routine/${routine_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        },
                    });

                if (response.ok) {

                    this.getUserRoutines()
                    this.closeRemoveUserRoutine()

                } else {
                    throw new Error('Error al agregar la rutina')
                }
        
            }catch(error){
                console.error('Error al eliminar la rutina:', error)
            }
        }, 

        editUserRoutine(exercises,id){
            this.removeAllCurrentRutine()
            this.removeUserRoutine(id)
            this.setCurrentRoutine(exercises)  
            this.closeEditUserRoutine()
        },

        removeAllCurrentRutine(){
           
           localStorage.removeItem('currentRoutine')
           this.storedRoutines = { exercises: [] }
           this.closeAllCurrentRutineModal()
           this.currentRoutine.removeExercises()
       },

        removeExercise(exerciseId) {
            const index = this.storedRoutines.exercises.findIndex(exercise => exercise.id === exerciseId)
            if (index !== -1) {
                this.storedRoutines.exercises.splice(index, 1)
                localStorage.setItem('currentRoutine', JSON.stringify(this.storedRoutines))
            }
        },

        clearCurrentRoutine() {
            localStorage.removeItem('currentRoutine')
            this.storedRoutines = { exercises: [] }
            this.currentRoutine.removeExercises()
        }
                

    },


}

</script>

<template>

    <main>

        <UserNavbar></UserNavbar>
  
        <section>
           
             <!-- All Current Routine Modal -->

            <div class="modal" v-if="modalRemoveCurrentRoutine">

                <div class="modal__content">
                <a class="close_modal" @click="closeAllCurrentRutineModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>¿Estás seguro de que quieres borrar la rutina actual entera?</p>

                    <div class="modal__btn">
                        <button @click="removeAllCurrentRutine" class="yes_btn"> Si </button>
                        <button @click="closeAllCurrentRutineModal" class="no_btn" > No </button>
                    </div>
                
                </div>

            </div>

            <!-- Delete Routine Modal -->

            <div class="modal" v-if="modalRemoveUserRoutine">

                <div class="modal__content">
                <a class="close_modal" @click="closeRemoveUserRoutine"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>¿Estás seguro de que quieres borrar la rutina seleccionada?</p>

                    <div class="modal__btn">
                        <button @click="removeUserRoutine(routineSelectedId)" class="yes_btn"> Si </button>
                        <button @click="closeRemoveUserRoutine" class="no_btn" > No </button>
                    </div>
                
                </div>

            </div>

            <!-- Edit Routine Modal -->

            <div class="modal" v-if="modalEditUserRoutine">

                <div class="modal__content">
                <a class="close_modal" @click="closeEditUserRoutine"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p class="small_letter">¿Estás seguro de que quieres editar esta rutina? Perderas la que estes creando en este momento</p>

                    <div class="modal__btn">
                        <button @click="editUserRoutine(editRoutineSelected,editRoutineID)" class="yes_btn"> Si </button>
                        <button @click="closeEditUserRoutine" class="no_btn" > No </button>
                    </div>
                
                </div>

            </div>

            <!-- Add Current Routine Modal -->

            <div class="modal" v-if="modalAddCurrentRoutine">

                <div class="modal__content_2">
                <a class="close_modal" @click="closeAddCurrentRutineModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>Escriba el nombre de la rutina que va a crear:</p>
                    <input type="text" v-model="rutine_name">

                    <div class="modal__btn">
                        <button @click="addCurrentRoutine" class="yes_btn"> Guardar </button>
                    </div>
                
                </div>

            </div>

            <p id="your_routines">TUS RUTINAS</p>
  
            <article class="routines_container" >

            <div v-if="routines.length === 0" class="no_routines">
                <p>No tienes rutinas creadas.</p>
            </div>


           <div v-if="routines.length !== 0" >
                <section class="routine" v-for="routine in routines" :key="routine.routine_id">

                    <p id="title">{{ routine.routine_name }}</p>

                    <div class="routine_content">

                            <div class="routine__exercise" v-for="exercise in routine.exercises" :key="exercise.id">

                                <p>{{ exercise.name }}</p>
                                <img :src="exercise.image ? exercise.image  : 'https://web-back.perfectgym.com/sites/default/files/styles/460x/public/equipment%20%286%29.jpg?itok=bC0T32-K' " :alt="exercise.name">
                                <p>{{ exercise.repetitions }} repeticiones</p>
                                <p>{{ exercise.series }} series</p>

                            </div>

                    </div>

                    <div class="routine__btn">

                        <button value="editRutine" @click="openEditUserRoutine(routine,routine.routine_id)"><i class="fa-solid fa-pen fa-2xl" style="color: #000000;"></i></button>
                        <button value="removeRoutine" @click="openRemoveUserRoutine(routine.routine_id)"><i class="fa-solid fa-trash fa-2xl" style="color: #000000;"></i></button>
                    </div>

                </section>

           </div>
            
        </article>

        <!-------------------------------------------------- DIVISOR --------------------------------------------->
  
        <article class="current_routine_container">

            <p id="create_title">TU RUTINA ACTUAL</p>

            <section class="routine">

                <p id="title"></p>

                    <div class="routine_content">

                            <div class="routine__exercise" v-for="exercise in storedRoutines.exercises" :key="exercise.id">

                                <p @click="removeExercise(exercise.id)" class="delete_exercise">x</p>
                                <p>{{ exercise.name}}</p>
                                <img :src="exercise.image ? exercise.image  : '../../../assets/images/pesas.jpg' " :alt="exercise.name">
                                <p>{{ exercise.serie}} series</p>
                                <p>{{ exercise.repetition}} repeticiones</p>

                            </div>

                    </div>

                    <div class="routine__btn2">

                        <button id="add" value="addCurrentRoutine" @click="openAddCurrentRutineModal"  ><i class="fa-solid fa-circle-plus fa-flip-horizontal fa-2xl" style="color: #000000;"></i></button>
                        <button id="remove" value="removeCurrentRoutine" @click="openAllCurrentRutineModal"> <i class="fa-solid fa-trash fa-2xl position_close" style="color: #000000;"></i></button>
                    </div>

                </section>
          
        </article>

      </section>

    </main>

    <Footer></Footer>

</template>
  

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

.small_letter{
    font-size: 15px;
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
    z-index: 3;
}

.delete_exercise{
    position: absolute;
    top: 15px;
    left: 165px;
    display: flex;
    border-radius: 100%;
    width: 20px;
    height: 22px;
    justify-content: center;
    color: rgba(9, 9, 9, 1);
    box-shadow: 2px 1px 14px 3px rgb(52 51 51 / 54%);
    cursor: pointer;
    background-color: white;
    z-index: 2;
    
}


.modal__content a{
    margin-top: 20px;
    display: flex;
    align-self: start;
    cursor: pointer;
   
}

.modal__content i{
    padding-top: 5px;
    padding-left: 10px;
}

.modal__btn  {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.modal__btn button {
    width: 20vh;
    height: 5vh;
    border: 1px solid black;
}

.yes_btn{
    background-color: rgba(64, 216, 119, 1);
    cursor: pointer;
}


.no_btn{
    background-color: rgba(241, 90, 99, 1);
    cursor: pointer;
}

.modal__content p{
    width: 80%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: justify;
    text-align: center;
}

.modal__content{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 70vh;
    height: 30vh;
    border-radius: 25px;
    gap: 40px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


.modal__content_2{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 70vh;
    height: 30vh;
    border-radius: 25px;
    gap: 20px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.modal__content_2 i{
    padding-top: 5px;
    padding-left: 10px;
}

.modal__content_2 a{
    margin-top: 20px;
    display: flex;
    align-self: start;
    cursor: pointer;
}

.modal__content_2 p{
    width: 80%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: justify;
    text-align: center;
}

.modal__content_2 input{
    width: 50%;
    height: 40px;
}


#add{
    background-color: rgba(64, 216, 119, 1);
    border: 1px solid black;

}

#remove{
    background-color: rgba(254, 83, 83, 1);
    border: 1px solid black;
}


#your_routines {
    margin-top:  5%;
    margin-bottom:  5%;
    margin-left: 5%;
    font-size: 30px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.routines_container{
    width: 100%;
    min-height: 50vh;
    padding-left: 5%;
    margin-bottom: 125px;
}

.no_routines{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8vh;
}
  
.routine {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    position: relative;
    margin-top: 40px;
}

.routine #title{
    margin-bottom: 10px;
    font-size: 30px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.routine_content{

    display: flex;
    flex-direction: row;
    border: 1px solid black;
    height: 200px;
    width: calc(100% - 70px);
    overflow-x: scroll;
    overflow-y: scroll; 
}

.routine_content::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}  

.routine_content::-webkit-scrollbar-thumb {
    background-color: rgba(62, 60, 60, 0.478);
    border-radius: 5px;
}  

.routine_content::-webkit-scrollbar-track  {
    background-color: rgba(255, 255, 255, 0.5); 
    border-radius: 20px;
}  

.routine__exercise{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    width: 200px;
    align-items: center;
    gap: 5px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    text-align: center;
    position: relative;
}


.routine__exercise img{
    width: 150px;
    height: 100px;
}
  

.routine__btn2{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    right: 21px;
}

.routine__btn{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    right: 21px;
    padding-top: 2px;
  
}
  
.routine__btn2 button{
    height: 47.70%;
    width: 50px;
}

.routine__btn button{
    height: 40.99%;
    width: 50px;
}


.current_routine_container{
    min-height: 50vh;
    margin-left: 5%;
    margin-bottom: 5%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


.current_routine_container #create_title {
    margin-bottom:  5%;
    font-size: 30px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


@media screen and (max-width:400px){

    .routine__btn button{
        height: 35.99%;
    }

}


</style>
  