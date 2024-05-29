<script>
import { UserContext } from '../../../stores/UserContext.js'; 

export default{


    data() {
        const usercontext = UserContext()
        return {
            username:usercontext.name,
            admin:usercontext.admin,
            selection: "myRoutines",
        }
    },

    methods: {

        changeSelection(selection) {
            switch (selection) {
                case 'myRoutines':
                    this.selection = 'myRoutines';
                    break;
                case 'makeRoutines':
                    this.selection = 'makeRoutines';
                    break;
                case 'adminPanel':
                    this.selection = 'adminPanel';
                    break;  
            }
            
        }
    },


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
            <li @click="changeSelection('myRoutines')" :class="{ 'select' : selection === 'myRoutines' }"><router-link to="/private/myRoutines">My routines</router-link></li>
            <li @click="changeSelection('makeRoutines')" :class="{ 'select' : selection === 'makeRoutines' }"><router-link to="/private/makeRoutines">Make routines</router-link></li>
            <li @click="changeSelection('adminPanel')" :class="{ 'select' : selection === 'adminPanel' }"><router-link to="/private/adminPanel">Admin Panel</router-link></li>
        </ul>

        <ul>
            <li><i class="fa-solid fa-gear fa-2xl" style="color: #ffffff;"></i></li>
        </ul>

    </nav>


    <nav class="user_navbar" v-if="!admin">

        <ul>
            <li><i class="fa-solid fa-user fa-2xl"></i></li>
            <li class="name">UserName</li>
        </ul>

        <ul>
            <li @click="changeSelection" :class="{ 'select' : selection === true }"><router-link to="/private/myRoutines">My routines</router-link></li>
            <li @click="changeSelection" :class="{ 'select' : selection === false }"><router-link to="/private/makeRoutines">Make routines</router-link></li>
        </ul>

        <ul>
            <li><i class="fa-solid fa-gear fa-2xl" style="color: #ffffff;"></i></li>
        </ul>

    </nav>

</header>

</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

header{
    background-color: rgba(9, 9, 9, 1);
    width: 100%;
    height: 60px;
}



.user_navbar{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    list-style: none;
    color: white;
    gap: 10vw;;
    height: 100%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.user_navbar ul{
    display: flex;
    align-items: center;
    flex-direction: row;
    list-style: none;
    gap: 20px;
}


.user_navbar ul li a{
    text-decoration: none;
    color: white;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


.select{

    border-bottom: 1px solid rgba(64, 216, 119, 1);
}

.name {
    color:rgba(64, 216, 119, 1) ;
}



</style>