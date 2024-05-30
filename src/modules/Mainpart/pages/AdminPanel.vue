<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { UserContext } from '../../../stores/UserContext';
export default{

    components: { UserNavbar, Footer },

    data() {
        const usercontext = UserContext()
        return {
            user_section:true,
            users:[],
            exercises:[],
            token:usercontext.token,
            DeleteExerciseModal:false,
            DeleteUserModal:false,
        }
    },

   created() {
    this.getAllUsers()
    this.getAllExercises()
   },

   mounted(){

    },

   methods: {


        openDeleteExerciseModal(exercise_id){
            this. DeleteExerciseModal= true
        },

        closeDeleteExerciseModal(){
            this. DeleteExerciseModal= false
        },

         openDeleteUserModal(user_id){
            this. DeleteUserModal= true
        },

        closeDeleteUserModal(){
            this. DeleteUserModal= false
        },

        user_sectionState(){
            this.user_section = true
        },

        exercise_sectionState(){
            this.user_section = false
        },

        async getAllUsers(){
            
            try {
                const response = await fetch('http://localhost:8000/api/get-all-users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                this.users = data

                console.log(this.users);
            } catch (error) {
                console.error('Error:', error);
                return null;
            }

        },

        async getAllExercises(){
            
            try {
                const response = await fetch('http://localhost:8000/api/get-all-exercises', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                this.exercises = data

                console.log(this.exercises);
            } catch (error) {
                console.error('Error:', error);
                return null;
            }

        }

   }


}

</script>


<template>

    <main>

       <UserNavbar></UserNavbar>

       <section>


           <!-- DeleteUser Modal -->

             <div class="modal" v-if="DeleteUserModal">

                <div class="modal__content">
                <a class="close_modal" @click="closeDeleteUserModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>¿Estás seguro de que quieres borrar este usuario?</p>

                    <div class="modal__btn">
                        <button @click="" class="yes_btn"> Si </button>
                        <button @click="closeDeleteUserModal" class="no_btn" > No </button>
                    </div>
                
                </div>

            </div>


            
           <!-- DeleteExercise Modal -->

             <div class="modal" v-if="DeleteExerciseModal">

                <div class="modal__content">
                <a class="close_modal" @click="closeDeleteExerciseModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>¿Estás seguro de que quieres borrar este ejercicio?</p>

                    <div class="modal__btn">
                        <button @click="" class="yes_btn"> Si </button>
                        <button @click="closeDeleteExerciseModal" class="no_btn" > No </button>
                    </div>
                
                </div>

            </div>

        <div class="section_btns">

            <button @click="user_sectionState" :class="{ 'selected_section': user_section }">Usuarios</button>
            <button @click="exercise_sectionState" :class="{ 'selected_section': !user_section }">Ejercicios</button>

        </div>

       

            <article v-if="user_section">

                <form class="add_form">
                    <i class="fa-solid fa-user-plus fa-xl" style="color: #000000;"></i>
                    <input type="text" placeholder="Nombre">
                    <input type="text" placeholder="Email">
                    <input type="text" placeholder="Contraseña">
                    <input type="text" placeholder="Admin Rol">

                    <button class="add_button">Añadir usuario</button>

                </form>

                <input type="search" placeholder="Buscar..." class="search">

                <div class="table-container">
                                            
                        <table border="1" class="table">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Admin Rol</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                            <tr v-for="user in users">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.admin}}</td>
                                <td><i class="fa-solid fa-pen fa-lg" style="color: #ffd642;"></i></td>
                                <td><i @click="openDeleteUserModal(user.id)" class="fa-solid fa-circle-xmark fa-lg" style="color: #b30c00;"></i></td>
                            </tr>
                           
                        </table>
                </div>        
                     
            </article>


            <article  v-if="!user_section">

                <form class="add_form">

                    <i class="fa-solid fa-dumbbell fa-lg" style="color: #000000;"></i>
                    <input type="text" placeholder="Nombre">
                    <input type="text" placeholder="Url imagen">
                    <input type="text" placeholder="Description">
                    
                    <button class="add_button">Añadir ejercicios</button>

                </form>

                <input type="search" placeholder="Buscar..." class="search">

                <div class="table-container">
                                            
                        <table border="1" class="table">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Description</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                            <tr v-for="exercise in exercises">
                                <td>{{exercise.id}}</td>
                                <td>{{exercise.name}}</td>
                                <td><img :src="exercise.image" :alt="exercise.image"></td>
                                <td>{{exercise.description}}</td>
                                <td><i class="fa-solid fa-pen fa-lg" style="color: #ffd642;"></i></td>
                                <td><i @click="openDeleteExerciseModal(exercise.id)" class="fa-solid fa-circle-xmark fa-lg" style="color: #b30c00;"></i></td>
                            </tr>
                           
                        </table>
                </div>   

            </article>

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
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.modal__content a{
    margin-top: 20px;
    display: flex;
    align-self: start;
   
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
}


.no_btn{
    background-color: rgba(241, 90, 99, 1);
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



.table-container {
    width: 100%;
    max-height: 400px; 
    overflow: auto; 
    margin-top: 20px;
    margin-bottom:50px;
}
.table-container {
    width: 100%;
    max-height: 400px; 
    overflow: auto; 
    margin-top: 20px;
    margin-bottom: 50px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.table th,
.table td {
    border: 1px solid black;
    padding: 8px;
    max-width: 150px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

.table td img {
width: 50px;
height: 50px;
}

.table td {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
}

.table td:hover {
    overflow: visible;
    white-space: normal;
}

.add_button{
    background-color:rgba(64, 216, 119, 1);
    height: 45px;
    width: 120px;
}


.search{
    width: 250px;
    height: 40px;

}

.add_form {
    display: grid;
    width: 100%;
    gap: 10px;
    margin-top: 40px;
    margin-bottom: 40px;
    justify-content: center;
    align-items: center;
    grid-auto-flow: column;
    max-width: 800px;
}


.add_form input[type="text"], .adduser_form button {
    width: 100%;
    max-width: 300px; 
    height: 30px;
    border: solid 1px black;
}


section{
    display: flex;
    flex-direction: column;
    align-items: center; 
    min-height:100vh ;
}


.section_btns{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}


.section_btns button{
    width: 120px;
    height: 50px;
    border: solid 1px black ;
}

.section_btns button:hover{

    border: solid 1px black ;

    scale: 1.02;
}


.selected_section{
    background-color: rgba(64, 216, 119, 1);
}




</style>