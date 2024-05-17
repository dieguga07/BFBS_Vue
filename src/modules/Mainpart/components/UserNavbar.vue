<script>
export default{



    data() {
        return {

            admin:false,
            selection: true,
        }
    },

    methods: {

        changeSelection() {
            this.selection = !this.selection;
            console.log( this.selection );
        }
    },


}

</script>


<template>

<header>

    <nav class="user_navbar" v-if="admin">

        <ul>
            <li><i class="fa-solid fa-user fa-2xl"></i></li>
            <li class="name">UserName</li>
        </ul>

        <ul>
            <li @click="changeSelection" :class="{ 'select' : selection === true }"><router-link to="/private/myRoutines">My routines</router-link></li>
            <li @click="changeSelection" :class="{ 'select' : selection === false }"><router-link to="/private/makeRoutines">Make routines</router-link></li>
            <li>Admin Panel</li>
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