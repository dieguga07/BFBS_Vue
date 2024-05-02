<script>
export default{








}

</script>


<template>

<header>

    <nav class="user_navbar">

        <ul>
            <li>8</li>
            <li class="name">UserName</li>
        </ul>

        <ul>
            <li class="select"><router-link to="/private/myRoutines">My routines</router-link></li>
            <li><router-link to="/private/makeRoutines">Make routines</router-link></li>
            <li>Admin Panel</li>
        </ul>

        <ul>
            <li>Ajustes</li>
        </ul>

    </nav>

</header>



</template>


<style scoped>


header{
    background-color: rgba(9, 9, 9, 1);
    width: 100%;
    height: 50px;
}

.user_navbar{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    list-style: none;
    color: white;
    gap: 100px;
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

/* 
.user_navbar ul li a:hover{
    border-bottom: 1px solid rgba(64, 216, 119, 1);
} */

.select{

    border-bottom: 1px solid rgba(64, 216, 119, 1);
}

.name {
    color:rgba(64, 216, 119, 1) ;
}



</style>