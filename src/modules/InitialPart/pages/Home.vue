<script>
import Footer from '../components/Footer.vue';


export default{

    components:{Footer}





}

</script>

<template>

<main>

   <nav class="container_nav">

    <ul class="container_nav_links">

        <li class="container_nav_links__login"> 
            <router-link to="/public/login" class="nav-link " id="login">LOGIN</router-link>
        </li>

        <li class="container_nav_links__register">
            <router-link to="/public/register" class="nav-link " id="login">REGISTRO</router-link>
        </li>
    </ul>

   </nav>

   <section class="container_image">
       
    <img src="../../../assets/images/Frame 4.png" alt="fondo">
   </section>

   <section class="container_start">

    <router-link to="/public/register" class="nav-link " id="login">¡EMPIEZA YA!</router-link>

   </section>
   
<Footer></Footer>

</main>


</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

main{
    background-color: rgba(3, 3, 3, 1);
    height: 100vh;
}

section{
    width: 100%;
   
}
.container_image  {
    background-color:blue;
    width: 100%;
    height: 450px;
    
}

.container_image img {
 
    width: 100%;
    height: 100%;

}

.container_nav{
    width: 100%;
    height: 96px;
    background-color: rgba(3, 3, 3, 1);
    display: flex;
    align-items: center;
    justify-content: end;
}

.container_start{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Goldman", sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    background-color: rgba(3, 3, 3, 1);
    height: 50px;
}

.container_start a {
    color: white;
    text-decoration: none;
}

.container_nav_links{
    
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: row;
    list-style: none;
    padding-right: 20px;
    gap: 20px;
    height: 100px;
    color: rgb(252, 252, 252);

}

.container_nav_links__login a{
    color: white;
    font-family: "Goldman", sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    text-decoration: none;
    
}

.container_nav_links__register a{
    color: rgba(64, 216, 119, 1);
    font-family: "Goldman", sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    text-decoration: none;
}

</style>