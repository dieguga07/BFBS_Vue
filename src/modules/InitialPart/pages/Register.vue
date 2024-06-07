<script>
import router from '../../../router/router.js';
import Toast from '../../Mainpart/components/Toast.vue';
export default {

    components: { Toast },

    data() {
        return {
            username: "",
            email: "",
            password: "",
            validUsername: false,
            validEmail: false,
            validPassword: false,
            usernameMessage: "",
            emailMessage: "",
            passwordMessage: "",
            responseFail: "",

            showToast: false,
            toastClass: "",
            toastMessage: "",
        };
    },

    methods: {

        goLogin() {
            router.push("/public/login")
        },

        async register() {
            try {
                const response = await fetch('http://localhost:8000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.username,
                        email: this.email,
                        password: this.password
                    })
                });

                const responseData = await response.json();

                if (response.ok) {
                    this.showToastMessage('green', 'Usuario registrado con éxito', 2000);
                    setTimeout(() => {
                        router.push("/public/login");
                    }, 2000);
                } else {
                    if (response.status === 422) {
                        const errors = responseData.errors;
                        if (errors.email) {
                            this.showToastMessage('red', 'El correo electrónico ya está en uso');
                        } else {
                            this.showToastMessage('red', 'Error en la validación: ' + JSON.stringify(errors));
                        }
                    } else {
                        this.showToastMessage('red', responseData.msg || 'Error en el registro');
                    }
                }
            } catch (error) {
                console.error('Error en el registro:', error);
                this.showToastMessage('red', 'Error al registrar el usuario, revise que el correo no está en uso');
            }
        },

        sendForm() {
            this.checkUsername()
            this.checkEmail()
            this.checkPassword()

            if (this.validUsername && this.validEmail && this.validPassword) {
                this.register()
            }else{
                this.showToastMessage("yellow","Revise el Formulario")
            }
        },

        checkUsername() {
            if (this.username.trim() === "") {
                this.usernameMessage = "Este campo no puede estar vacío."
                this.validUsername = false
            } else if (this.username.length < 3) {
                this.usernameMessage = "El nombre debe tener al menos 3 caracteres."
                this.validUsername = false
            } else {
                this.usernameMessage = ""
                this.validUsername = true
            }
        },

        checkEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (this.email.trim() === "") {
                this.emailMessage = "Este campo no puede estar vacío."
                this.validEmail = false;
            } else if (!regex.test(this.email)) {
                this.emailMessage = "Por favor, introduce un email válido."
                this.validEmail = false
            } else {
                this.emailMessage = ""
                this.validEmail = true
            }
        },

        checkPassword() {
            if (this.password.trim() === "") {
                this.passwordMessage = "Este campo no puede estar vacío."
                this.validPassword = false
            } else if (this.password.length < 3) {
                this.passwordMessage = "La contraseña debe tener al menos 3 caracteres."
                this.validPassword = false
            } else {
                this.passwordMessage = ""
                this.validPassword = true;
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

        goBack() {
            this.$router.go(-1)
        }
    },

    watch: {
        username: function () {
            this.checkUsername()
        },
        email: function () {
            this.checkEmail()
        },
        password: function () {
            this.checkPassword()
        }
    }
};
</script>

<template>

<main>

    <Toast v-if="showToast" :toastClass="toastClass" :message="toastMessage" />
    <section class="register_imgpart">
        <p class="register_imgpart__title">¡EL CAMBIO EMPIEZA YA!</p>
        <div class="register_imgpart__loginPart">
            <p>¿YA TIENES CUENTA?</p>
            <button @click="goLogin">LOGIN</button>
        </div>
    </section>

    <section class="register">
        <p>REGISTRO</p>
        <form class="register_form" @submit="sendForm">
            <span class="error-message">{{ responseFail }}</span>
            <input v-model="username" type="text" placeholder="User">
            <span :class="validUsername ? 'accept-message' : 'error-message'">{{ usernameMessage }}</span>

            <input v-model="email" type="email" placeholder="Email">
            <span :class="validEmail ? 'accept-message' : 'error-message'">{{ emailMessage }}</span>

            <input v-model="password" type="password" placeholder="Password">
            <span :class="validPassword ? 'accept-message' : 'error-message'">{{ passwordMessage }}</span>

            <button type="submit">EMPIEZA YA</button>

            <p @click="goBack" class="goBack_btn">Go back</p>
        </form>
    </section>
</main>
</template>


<style scoped>

.goBack_btn{
    font-size: 14px;
    color:rgba(19, 169, 73, 1);
    border-bottom: 2px solid  rgba(19, 169, 73, 1); 
    cursor: pointer;
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


main{
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: rgb(3, 3, 3, 1);
    min-height: 100vh;
}

.register_imgpart {
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

.register {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
    color: white;
    font-family: "Goldman", sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    margin-top: 100px;
   
}

.register_form{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    gap: 4vh;
}

.register_form input{
    border: none;
    color:white;
    background-color: rgb(3, 3, 3, 1);
    border-bottom: 1px solid white;
    padding-bottom: 5px;
}

.register_form button{
    
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

.register_form button:hover{
    border: 1px solid white;
    color:rgb(3, 3, 3, 1);
    background-color: rgba(19, 169, 73, 1);

}

.register_form input::placeholder{
    color:white;
    font-family: "Goldman", sans-serif;
    font-style: normal;
    font-size: 16px;
}

.register_imgpart__title{
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

.register_imgpart__loginPart{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 15px;
    gap: 30px;
}

.register_imgpart__loginPart button{

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

.register_imgpart__loginPart button:hover{

    border: 0.5px solid rgb(3, 3, 3, 1);
    background-color: white;
    color: rgb(3, 3, 3, 1);
}


input:focus{
    outline: none;
}

@media screen and (max-width:540px){

.register_imgpart{
    display: none;
}

.register{
    width: 100%;
}

}


</style>