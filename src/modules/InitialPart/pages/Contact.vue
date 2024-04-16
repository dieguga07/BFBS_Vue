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

        goRegister(){
            router.push("/public/register")
        }


    },


    watch:{

    }


}



</script>


<template>

<main>

<section class="contact_imgpart">

    <p class="contact_imgpart__title">DO YOU HAVE ANY PROBLEM ?</p>

    <div class="contact_imgpart__registerPart">

        <p>YOU DONT HAVE ACCOUNT ?</p>
        <button @click="goRegister">SIGN UP</button>

    </div>


</section>


<section class="contact">

    <p>CONTACT US</p>

    <form class="contact_form">

        <input type="text" placeholder="User">
        <input type="password" placeholder="Passwoord">
        <textarea id="text" name="text" placeholder="Text" ></textarea>

        <button>SEND</button>

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
    min-height: 100vh;
}

.contact_imgpart {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
    background-image: url(../../../assets/images/fondo_contact.png);
    background-size:cover;
    background-repeat: no-repeat; 
    background-position: center;
    color: white;
    font-family: "Goldman", sans-serif;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
   
}

.contact {
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

.contact_form{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    gap:50px
}

.contact_form input{
    width: 90%;
    border: none;
    color:white;
    background-color: rgb(3, 3, 3, 1);
    border-bottom: 1px solid white;
    padding-bottom: 5px;
}

.contact_form button{
    
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

.contact_form button:hover{
    
    border: 1px solid white;
    color:rgb(3, 3, 3, 1);
    background-color: rgba(19, 169, 73, 1);

}

.contact_form input::placeholder{
    color:white;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    font-size: 16px;
}

.contact_imgpart__title{
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
    width: 90%;
    text-align: center;
}

.contact_imgpart__registerPart{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 15px;
    gap: 30px;
}

.contact_imgpart__registerPart button{

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

.contact_imgpart__loginPart button:hover{

    border: 0.5px solid rgb(3, 3, 3, 1);
    background-color: white;
    color: rgb(3, 3, 3, 1);
}


input:focus{
    outline: none;
}

textarea {
    width: 90%;
    height: 44px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid white;
    border-radius: 8px;
    box-sizing: border-box;
    resize: none;
    background-color: transparent;
    color: white;
    font-size: 12px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    font-weight: 400;
}


</style>