<script>

import router from '../../../router/router';


export default{

    props:{

    },

    data(){

        return{

        }
    },

    methods:{

        goLogin(){
            router.push("/public/login")
        }

    },


    watch:{

    }


}



</script>


<template>

<main>

<section class="login_imgpart">

    <p class="login_imgpart__title">CHANGE STARTS NOW!</p>

    <div class="login_imgpart__registerPart">

        <p>YOU HAVE ACCOUNT ?</p>
        <button @click="goLogin">LOGIN</button>

    </div>


</section>


<section class="login">

    <p>REGISTER</p>

    <form class="login_form">

        <input type="text" placeholder="User">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Passwoord">

        <button>ENTER</button>

    </form>

</section>

</main>

</template>


<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

main{
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: rgb(3, 3, 3, 1);
    height: 100vh;
}

.login_imgpart {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
    background-image: url(../../../assets/images/fondo_register.png);
    background-size:cover;
    background-repeat: no-repeat; 
    background-position: center;
    color: white;
    font-family: "Goldman", sans-serif;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
   
}

.login {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
    color: white;
    font-family: "Goldman", sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    margin-top: 20px;
   
   
}

.login_form{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    gap:50px
}

.login_form input{
    border: none;
    color:white;
    background-color: rgb(3, 3, 3, 1);
    border-bottom: 1px solid white;
    padding-bottom: 5px;
}

.login_form button{
    
    width: 180px;
    color:white;
    background-color: rgba(19, 169, 73, 1);
    border-radius: 10px;
    height: 40px;
    border: none;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    font-size: 20px;
}

.login_form button:hover{
    
    border: 1px solid white;
    color:rgb(3, 3, 3, 1);
    background-color: rgba(19, 169, 73, 1);

}

.login_form input::placeholder{
    color:white;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    font-size: 16px;
}

.login_imgpart__title{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    font-size: 25px;
    width: 100%;
    height: 60%;
    font-family: "Goldman", sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
}

.login_imgpart__registerPart{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 15px;
    gap: 40px;
}

.login_imgpart__registerPart button{

    width: 180px;
    border: 0.5px solid white;
    background-color: rgb(3, 3, 3, 1);
    color: white;
    border-radius: 10px;
    height: 40px;
     font-family: "Goldman", sans-serif;
    font-style: normal;
    font-size: 16px;
    

}

.login_imgpart__registerPart button:hover{

    border: 0.5px solid rgb(3, 3, 3, 1);
    background-color: white;
    color: rgb(3, 3, 3, 1);
}


input:focus{
    outline: none;
}




</style>