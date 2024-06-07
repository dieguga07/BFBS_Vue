<script>
import router from '../../../router/router';
import { UserContext } from '../../../stores/UserContext.js'; 

export default{


    data() {
        const usercontext = UserContext()
        return {
            username:usercontext.name,
            userId:usercontext.id,
            admin:usercontext.admin,
            selection: "myRoutines",
        }
    },

    methods: {

        changeSelection(selection) {
            this.selection = selection;
        },

        logout(){
            localStorage.removeItem('user');
            router.push("/public/login")
        },
        updateSelection() {
            const currentPath = this.$route.path;
            if (currentPath.includes("myRoutines")) {
                this.selection = 'myRoutines'
            } else if (currentPath.includes("makeRoutines")) {
                this.selection = 'makeRoutines'
            } else if (currentPath.includes("adminPanel")) {
                this.selection = 'adminPanel'
            }
        },
    },

    mounted(){
        this.updateSelection()
    },
    watch: {
        $route(to, from) {
            this.updateSelection()
        }
    }


}

</script>


<template>

    <header>

        <nav class="user_navbar" v-if="admin">

            <ul>
                <li><i class="fa-solid fa-user fa-2xl"></i></li>
                <li class="name">{{username}}</li>
            </ul>

            <ul>
                <li @click="changeSelection('myRoutines')" :class="{ 'select' : selection === 'myRoutines' }"><router-link to="/private/myRoutines">Mis rutinas</router-link></li>
                <li @click="changeSelection('makeRoutines')" :class="{ 'select' : selection === 'makeRoutines' }"><router-link to="/private/makeRoutines">Crear rutinas</router-link></li>
                <li @click="changeSelection('adminPanel')" :class="{ 'select' : selection === 'adminPanel' }"><router-link to="/private/adminPanel">Panel Administrador</router-link></li>
            </ul>

            <ul>

                <li>
                    <div class="options">
                        <i class="fa-solid fa-gear fa-2xl" style="color: #ffffff;"></i>

                        <div class="user_section oculto">
                            <p @click="logout" > Cerrar sesión <i class="fa-solid fa-arrow-right-from-bracket" style="color: #000000;"></i> </p>
                        </div>

                    </div>
                </li>

            </ul>

        </nav>

        <nav class="user_navbar" v-if="!admin">

            <ul>
                <li><i class="fa-solid fa-user fa-2xl"></i></li>
                <li class="name">{{username}}</li>
            </ul>

            <ul>
                <li @click="changeSelection('myRoutines')" :class="{ 'select' : selection === 'myRoutines' }"><router-link to="/private/myRoutines">Mis rutinas</router-link></li>
                <li @click="changeSelection('makeRoutines')" :class="{ 'select' : selection === 'makeRoutines' }"><router-link to="/private/makeRoutines">Hacer rutinas</router-link></li>
            </ul>

            <ul>
                <li>
                    
                    <div class="options">
                        <i class="fa-solid fa-gear fa-2xl" style="color: #ffffff;"></i>

                        <div class="user_section oculto">
                            <p @click="logout">Cerrar sesión <i class="fa-solid fa-arrow-right-from-bracket" style="color: #000000;"></i></p>
                        </div>
 
                    </div>

                </li>
            </ul>

        </nav>

    </header>

</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

.oculto {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s ease-in-out;
}

.user_section {
    position: absolute;
    width: 150px;
    height: 100px;
    background-color: rgb(255, 255, 255);
    color: black;
    top: 10px;
    right: 0px;
    display: flex;
    flex-direction: column;
}

.options {
    position: relative;
    display: flex;
}

.options:hover .oculto {
    visibility: visible;
    opacity: 1;
}

#delete_account {
    color: rgb(193, 66, 66);
}


.user_section p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    border: 1px solid black;
    gap: 5px;
    cursor: pointer;
}

header {
    background-color: rgba(9, 9, 9, 1);
    width: 100%;
    height: 60px;
}

.user_navbar {
    display: flex;
    position: relative;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    list-style: none;
    color: white;
    gap: 5vw;
    height: 100%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.user_navbar ul {
    display: flex;
    align-items: center;
    flex-direction: row;
    list-style: none;
    gap: 20px;
}

.user_navbar ul li a {
    text-decoration: none;
    color: white;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.select {
    border-bottom: 1px solid rgba(64, 216, 119, 1);
}

.name {
    color: rgba(64, 216, 119, 1);
}





@media screen and (max-width:700px){
    
    .user_navbar{
        gap: 0px;
        font-size:12px;
    }

    .user_navbar ul{
        gap: 10px;
        flex-direction: column
    }

    header{
        height: 100px;
    }

}    
</style>