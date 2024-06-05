<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';
import { UserContext } from '../../../stores/UserContext';
import Toast from '../components/Toast.vue';

export default{

    components: { UserNavbar, Footer, Toast },


    data() {
        const usercontext = UserContext()
        return {
            user_section:true,

            users:[],
            exercises:[],

            token:usercontext.token,

            DeleteExerciseModal:false,
            DeleteUserModal:false,

            SelectedUserId:0,
            SelectedExerciseID:0,

            filteredUsers:[],
            filteredExercises:[],

            userSearchTerm: "",
            exerciseSearchTerm:"",

            userName:"",
            userEmail:"",
            userPassword:"",
            userAdmin:0,

            exerciseName:"",
            exerciseImage:"",
            exerciseDescription:"",

            showToast: false,
            toastClass: "",
            toastMessage: "",

            editExericeModal:false,
            editUserModal:false,

            editUserName:"",
            editUserEmail:"",
            editUserPassword:"",

            editExerciseName:"",
            editExerciseImg:"",
            editExerciseDescription:"",

            validEditUserName: false,
            validEditUserEmail: false,
            validEditUserPassword: true,
            editUserNameMessage: "",
            editUserEmailMessage: "",
            editUserPasswordMessage: "",
            validEditExerciseName: false,
            validEditExerciseDescription: false,
            editExerciseNameMessage: "",
            editExerciseDescriptionMessage: "",

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
            this.SelectedExerciseID = exercise_id
        },

        closeDeleteExerciseModal(){
            this. DeleteExerciseModal= false
            this.SelectedExerciseID = 0
        },

         openDeleteUserModal(user_id){
            this. DeleteUserModal= true
            this.SelectedUserId = user_id
        },

        closeDeleteUserModal(){
            this. DeleteUserModal= false
            this.SelectedUserId = 0
        },

        user_sectionState(){
            this.user_section = true
        },

        exercise_sectionState(){
            this.user_section = false
        },

        searchUsers() {
            const term = this.userSearchTerm.toLowerCase();
            this.filteredUsers = this.users.filter(user =>
                user.name.toLowerCase().includes(term) || user.id.toString().includes(term) || user.email.toLowerCase().includes(term)
            )
        },

        searchExercises() {
            const term = this.exerciseSearchTerm.toLowerCase();
            this.filteredExercises = this.exercises.filter(exercise => exercise.name.toLowerCase().includes(term) || exercise.id.toString().includes(term)
            )
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
                    throw new Error('Error al obtener los usuarios')
                }
                const data = await response.json()
                this.users = data
                this.filteredUsers = data

                console.log(this.users)
            } catch (error) {
                console.error('Error:', error)
               
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
                    throw new Error('Error al obtener los usuarios')
                }
                const data = await response.json();
                this.exercises = data
                this.filteredExercises = data

                console.log(this.exercises)
            } catch (error) {
                console.error('Error:', error)
            }

        },

        async createUser() {
            const userData = {
                name: this.userName,
                email: this.userEmail,
                password: this.userPassword,
                admin: this.userAdmin,
            }
            try {
                const response = await fetch('http://localhost:8000/api/create-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    const data = await response.json();
                    this.userEmail=""
                    this.userName=""
                    this.userPassword=""
                    this.getAllUsers()
                    this.showToastMessage('green', 'Usuario creado con éxito')
                }
                else{
                    throw new Error('Error al crear el usuario')
                }
            } catch (error) {
                this.showToastMessage('red','Error al crear el usuario, revise el email o la contraseña')
            
            }
        },

        async createExercise() {
            try {
                const response = await fetch('http://localhost:8000/api/create-exercise', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify({
                        name: this.exerciseName,
                        image: this.exerciseImage,
                        description: this.exerciseDescription
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    this.exerciseName=""
                    this.exerciseImage=""
                    this.exerciseDescription=""
                    this.getAllExercises()
                    this.showToastMessage('green', 'Ejercicio creado con éxito');
                }
                else{
                    throw new Error('Error al crear el usuario')
                }
            
            } catch (error) {
                this.showToastMessage('red','Error al crear el ejercicio, revise el formulario')
            }
        },

        async removeUser(user_id){
            try{
                const response = await fetch(`http://localhost:8000/api/deleteUser/${user_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        },
                    });

                if (response.ok) {
                    const message = await response.json();
                    if(message.msg === "No puede eliminar un usuario administrador."){
                        this.closeDeleteUserModal()
                        this.showToastMessage('red','Error al eliminar el usuario,no se puede eliminar un usuario administrador')
                    }else{
                        this.getAllUsers()
                        this.closeDeleteUserModal()
                        this.showToastMessage('green','Usuario eliminado con éxito')
                    }
                    
                } else {
                    throw new Error('Error al agregar la rutina');
                }
        
            }catch(error){
                this.showToastMessage('red','Error al eliminar el usuario,intentelo de nuevo')
                console.error('Error al eliminar la rutina:', error);
            }
        }, 

        async removeExercise(exercise_id){
            try{
                const response = await fetch(`http://localhost:8000/api/deleteExercise/${exercise_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        },
                    });

                if (response.ok) {
                    this.getAllExercises()
                    this.closeDeleteExerciseModal()
                    this.showToastMessage('green','Ejercicio eliminado con éxito')
                } else {
                    throw new Error('Error al agregar la rutina')
                }
        
            }catch(error){
                this.showToastMessage('red','Error al eliminar el ejercicio,intentelo de nuevo')
                console.error('Error al eliminar la rutina:', error)
            }
        }, 

        showToastMessage(toastClass, message) {
            this.toastClass = toastClass
            this.toastMessage = message
            this.showToast = true

            setTimeout(() => {
                this.showToast = false
            }, 5000)

        },

        openEditUserModal(user){
            this.editUserModal = true
            this.SelectedUserId=user.id
            this.editUserName = user.name
            this.editUserEmail = user.email
        },

        closeEditUserModal(){
            this.editUserModal = false
        },

        openEditExerciseModal(exercise){
            this.editExericeModal = true
            this.SelectedExerciseID = exercise.id
            this.editExerciseName = exercise.name
            this.editExerciseImg = exercise.image
            this.editExerciseDescription = exercise.description
        },

        closeEditExerciseModal(){
            this.editExericeModal = false
        },

        checkEditUserName() {
            if (this.editUserName.trim() === "") {
                this.editUserNameMessage = "Este campo no puede estar vacío."
                return this.validEditUserName = false
            } else if (this.editUserName.length < 3) {
                this.editUserNameMessage = "El nombre debe tener al menos 3 caracteres."
                return this.validEditUserName = false
            }
            this.editUserNameMessage = "";
            this.validEditUserName = true;
        },

        checkEditUserEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (this.editUserEmail.trim() === "") {
                this.editUserEmailMessage = "Este campo no puede estar vacío."
                return this.validEditUserEmail = false;
            } else if (!regex.test(this.editUserEmail)) {
                this.editUserEmailMessage = "Por favor, introduce un email válido."
                return this.validEditUserEmail = false;
            }
            this.editUserEmailMessage = "";
            this.validEditUserEmail = true;
        },

        checkEditUserPassword() {
            if (this.editUserPassword && this.editUserPassword.length < 3) {
                this.editUserPasswordMessage = "La contraseña debe tener al menos 3 caracteres."
                return this.validEditUserPassword = false
            }
            this.editUserPasswordMessage = ""
            this.validEditUserPassword = true
        },

        sendEditUserForm() {

            this.checkEditUserName()
            this.checkEditUserEmail()
            this.checkEditUserPassword()

            if (this.validEditUserName && this.validEditUserEmail && this.validEditUserPassword) {
                this.editUser()
            }else{
                this.showToastMessage("yellow","Revise el Formulario")
            }
        },

        checkEditExerciseName() {
            if (this.editExerciseName.trim() === "") {
                this.editExerciseNameMessage = "Este campo no puede estar vacío."
                return this.validEditExerciseName = false
            } else if (this.editExerciseName.length < 3) {
                this.editExerciseNameMessage = "El nombre debe tener al menos 3 caracteres."
                return this.validEditExerciseName = false
            }
            this.editExerciseNameMessage = ""
            this.validEditExerciseName = true
        },

        checkEditExerciseDescription() {
            if (this.editExerciseDescription.trim() === "") {
                this.editExerciseDescriptionMessage = "Este campo no puede estar vacío."
                return this.validEditExerciseDescription = false
            }
            this.editExerciseDescriptionMessage = ""
            this.validEditExerciseDescription = true
        },

        sendEditExerciseForm() {

            this.checkEditExerciseName()
            this.checkEditExerciseDescription()

            if (this.validEditExerciseName && this.validEditExerciseDescription) {
                this.editExercise()
            }else{
                this.showToastMessage("yellow","Revise el Formulario")
            }
        },

        async editUser() {
            try {
                const response = await fetch(`http://localhost:8000/api/edit-user/${this.SelectedUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify({
                        name: this.editUserName,
                        email: this.editUserEmail,
                        password: this.editUserPassword
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    this.getAllUsers();
                    this.closeEditUserModal();
                    this.showToastMessage('green', 'Usuario actualizado con éxito')
                } else {
                    throw new Error('Error al actualizar el usuario')
                }
            } catch (error) {
                this.showToastMessage('red', 'Error al actualizar el usuario, revise que el correo no esta en uso')
                console.error('Error al actualizar el usuario:', error)
            }
        },

        async editExercise() {
            try {
                const response = await fetch(`http://localhost:8000/api/updateExercise/${this.SelectedExerciseID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify({
                        name: this.editExerciseName,
                        image: this.editExerciseImg,
                        description: this.editExerciseDescription
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    this.getAllExercises();
                    this.closeEditExerciseModal();
                    this.showToastMessage('green', 'Ejercicio actualizado con éxito');
                } else {
                    throw new Error('Error al actualizar el ejercicio');
                }
            } catch (error) {
                this.showToastMessage('red', 'Error al actualizar el ejercicio, revise el formulario');
                console.error('Error al actualizar el ejercicio:', error);
            }
        },

        
    },

    watch: {
    editUserName: function () {
        this.checkEditUserName()
    },
    editUserEmail: function () {
        this.checkEditUserEmail()
    },
    editUserPassword: function () {
        this.checkEditUserPassword()
    },
    editExerciseName: function () {
        this.checkEditExerciseName()
    },
    editExerciseDescription: function () {
        this.checkEditExerciseDescription()
    },
}


}

</script>


<template>

    <main>

       <UserNavbar></UserNavbar>

       <section>

        <Toast v-if="showToast" :toastClass="toastClass" :message="toastMessage" />

           <!-- DeleteUser Modal -->

             <div class="modal" v-if="DeleteUserModal">

                <div class="modal__content">
                <a class="close_modal" @click="closeDeleteUserModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>¿Estás seguro de que quieres borrar este usuario?</p>

                    <div class="modal__btn">
                        <button @click="removeUser(SelectedUserId)" class="yes_btn"> Si </button>
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
                        <button @click="removeExercise(SelectedExerciseID)" class="yes_btn"> Si </button>
                        <button @click="closeDeleteExerciseModal" class="no_btn"> No </button>
                    </div>
                
                </div>

            </div>

            <!-- EditExercise Modal -->
            
            <div class="modal" v-if="editExericeModal">

                <div class="modal__content_2">
                    <a class="close_modal" @click="closeEditExerciseModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>Editar Ejercicio</p>

                    <input type="text" v-model="editExerciseName" placeholder="Nombre">
                    <span :class="validEditExerciseName ? 'accept-message' : 'error-message'">{{ editExerciseNameMessage }}</span>

                    <input type="text" v-model="editExerciseImg" placeholder="Url imagen">
                    <span :class="validEditExerciseDescription ? 'accept-message' : 'error-message'"></span>

                    <input type="text" v-model="editExerciseDescription" placeholder="Descripcion">
                    <span :class="validEditExerciseDescription ? 'accept-message' : 'error-message'">{{ editExerciseDescriptionMessage }}</span>

                    <div class="modal__btn">
                        <button @click="sendEditExerciseForm" class="edit_btn">Aplicar cambios</button>
                    </div>

                </div>

            </div>

             <!-- Edit UserModal -->
            
            <div class="modal" v-if="editUserModal">

                <div class="modal__content_2">
                    <a class="close_modal" @click="closeEditUserModal"> <i class="fa-solid fa-circle-xmark fa-2xl" style="color: #000000;"></i> </a>

                    <p>Editar usuario</p>

                    <input type="text" v-model="editUserName" placeholder="Nombre">
                    <span :class="validEditUserName ? 'accept-message' : 'error-message'">{{ editUserNameMessage }}</span>

                    <input type="text" v-model="editUserEmail" placeholder="Email">
                    <span :class="validEditUserEmail ? 'accept-message' : 'error-message'">{{ editUserEmailMessage }}</span>

                    <input type="text" v-model="editUserPassword" placeholder="Nueva Contraseña (Opcional)">
                    <span :class="validEditUserPassword ? 'accept-message' : 'error-message'">{{ editUserPasswordMessage }}</span>

                    <div class="modal__btn">
                        <button @click="sendEditUserForm" class="edit_btn">Aplicar cambios</button>
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
                    <input v-model="userName" type="text" placeholder="Nombre">
                    <input v-model="userEmail" type="text" placeholder="Email">
                    <input v-model="userPassword" type="text" placeholder="Contraseña">
                    <select v-model="userAdmin">
                        <option class="no_btn" value=0 >No administrador</option>
                        <option class="yes_btn" value=1 >Administrador</option>
                    </select>

                    <button @click="createUser" class="add_button" :disabled="!userName || !userEmail || !userPassword">Añadir usuario</button>
                </form>

                <input type="search"  v-model="userSearchTerm" @input="searchUsers" placeholder="Buscar..." class="search">

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
                            <tr v-for="user in filteredUsers" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.admin}}</td>
                                <td class="edit"><i @click="openEditUserModal(user)" class="fa-solid fa-pen fa-lg" style="color: #ffd642;"></i></td>
                                <td class="delete"><i @click="openDeleteUserModal(user.id)" class="fa-solid fa-circle-xmark fa-lg" style="color: #b30c00;"></i></td>
                            </tr>
                           
                        </table>
                </div>        
                     
            </article>


            <article  v-if="!user_section">

                <form class="add_form">

                    <i class="fa-solid fa-dumbbell fa-lg" style="color: #000000;"></i>

                    <input v-model="exerciseName" type="text" placeholder="Nombre">
                    <input v-model="exerciseImage" type="text" placeholder="Url imagen">
                    <input v-model="exerciseDescription" type="text" placeholder="Descripción">

                    <button class="add_button" @click="createExercise" :disabled="!exerciseName || !exerciseImage || !exerciseDescription">Añadir ejercicio</button>
                </form>

                <input type="search" v-model="exerciseSearchTerm" @input="searchExercises"  placeholder="Buscar..." class="search">

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
                            <tr v-for="exercise in filteredExercises" :key="exercise.id">
                                <td>{{exercise.id}}</td>
                                <td>{{exercise.name}}</td>
                                <td><img :src="exercise.image" :alt="exercise.image"></td>
                                <td>{{exercise.description}}</td>
                                <td class="edit"><i @click="openEditExerciseModal(exercise)" class="fa-solid fa-pen fa-lg" style="color: #ffd642;"></i></td>
                                <td class="delete"><i @click="openDeleteExerciseModal(exercise.id)" class="fa-solid fa-circle-xmark fa-lg" style="color: #b30c00;"></i></td>
                            </tr>
                           
                        </table>
                </div>   

            </article>

       </section>

        <Footer></Footer>
    </main>

</template>


<style scoped>

.edit i{
    cursor: pointer;
}

.delete i{
    cursor: pointer;
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

.modal__content_2{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 50vh;
    height: 65vh;
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

.modal__content_2 select{
    width: 50%;
    height: 40px;
}

.modal__content_2 option{
    width: 50%;
    height: 40px;
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

.edit_btn{
    background-color: rgba(242, 164, 14, 1);
    cursor: pointer;
    width: 50%;
    height: 40px;
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

.error-message {
    color: red;
    font-size: 12px;
    width: 200px;
    text-align: center;
}

.accept-message {
    color: green;
    font-size: 12px;
    width: 200px;
    text-align: center;
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
    cursor: pointer;
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

.add_form select {
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
    cursor: pointer;
}

.section_btns button:hover{

    border: solid 1px black ;

    scale: 1.02;
}


.selected_section{
    background-color: rgba(64, 216, 119, 1);
}




</style>