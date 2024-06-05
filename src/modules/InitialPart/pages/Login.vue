<script>

import router from '../../../router/router.js'
import { UserContext } from '../../../stores/UserContext.js'

export default{


    props:{

    },

    data(){

        return{

            email:"",
            password:"",
            validPassword:false,
            validEmail:false,
            EmailMessage: "" ,
            passwordMessage: "" ,
            responseFail:""

        }
    },

    methods:{


        goRegister(){
            router.push("/public/register")
        },

        async login() {
            try {
                const userStore = UserContext();
                const response = await fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.email, password: this.password }),
                });

                if (response.ok) {

                    const data = await response.json()
                    console.log(data);
                    userStore.setId(data.user.id)
                    userStore.setName(data.user.name)
                    userStore.setEmail(data.user.email)
                    userStore.setToken(data.token)

                    if(data.user.admin !== 1){
                        userStore.setAdmin(false)
                    }else{
                        userStore.setAdmin(true)
                    }

                    router.push("/private/myRoutines")

                } else {
                    throw new Error('Error en el login')
                }
            } catch (error) {
                this.responseFail = "Credenciales invalidas"
                setTimeout(() => {
                    this.responseFail = ""
                }, 10000);
            }
        },

        sendForm(e){
            e.preventDefault()

            this.checkPassword()

            this.checkEmail()

            if(this.validEmail && this.validPassword){
                this.login()
            }  
            
        },

        checkEmail(){
            if(this.email.trim() === "" ){
            this.emailMessage = "This field cannot be empty."
            return this.validEmail = false
            }else if(this.email.length < 4 ){
            this.emailMessage ="The username must be composed of 4 letters or more."
            return this.validEmail = false
            }
            this.emailMessage = ""
            this.validEmail = true
        },
        
        checkPassword(){
            if(this.password.trim() === "" ){
            this.passwordMessage = "This field cannot be empty."
            return this.validPassword = false
            }
            if(this.password.length < 3) {
                this.passwordMessage = "The password must be composed of 3 letters or more."
                return this.validPassword = false
                
            }
            this.passwordMessage = ""
            this.validPassword = true
        }

    },


watch:{
    email: function () {
      this.checkEmail()
    },

    password: function () {
      this.checkPassword()
    },
}


}

</script>


<template>

<main>

<section class="login_imgpart">

    <p class="login_imgpart__title">¡HOLA DE NUEVO!</p>

    <div class="login_imgpart__registerPart">

        <p>¿NO TIENES CUENTA TODAVÍA?</p>
        <button @click="goRegister">REGISTRATE</button>

    </div>


</section>


<section class="login">

    <p>LOGIN</p>

    <form class="login_form">

        <span class="error-message">{{ responseFail }}</span>

        <input v-model="email" type="text" placeholder="Email">
        
        <span  :class=" validEmail ? 'accept-message' : 'error-message' " >{{ emailMessage }}</span>

        <!-- <label for="password" class="login-label">Password</label> -->
        <input v-model="password" type="password" placeholder="Password">
        <span  :class=" validPassword ? 'accept-message' : 'error-message' " >{{ passwordMessage }}</span>
        
        <button @click="sendForm">ENTRA</button>

    </form>

</section>

</main>

</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

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
    background-image: url(../../../assets/images/fondo_login.png);
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
    margin-top: 150px;
   
}

.login_form{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    
}

.login_form input{
    border: none;
    color:white;
    background-color: rgb(3, 3, 3, 1);
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
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
   margin-top: 50px;
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
    width: 90%;
    height: 60%;
    font-family: "Goldman", sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
}

.login_imgpart__registerPart{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 15px;
    gap: 30px;
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