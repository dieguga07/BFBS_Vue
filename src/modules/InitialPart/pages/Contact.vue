<script>
import router from '../../../router/router';
import Toast from '../../Mainpart/components/Toast.vue';

export default {

    components: { Toast },

    data() {
        return {
            email: "",
            text: "",
            validEmail: false,
            validText: false,
            emailMessage: "",
            textMessage: "",
            showToast: false,
            toastClass: '',
            toastMessage: ''
        }
    },
    methods: {
        goRegister() {
            router.push("/public/register")
        },
        sendForm(e) {
            e.preventDefault()
            this.checkEmail()
            this.checkText()
            if (this.validEmail && this.validText) {
                this.showToastMessage('green', 'Gracias por contactar con nosotrso,esperamos poder ayudarle lo antes posible', 3000)
                this.resetForm()
            }else{
                this.showToastMessage('red', 'Error al enviar la petición , intentelo de nuevo', 5000)
            }
        },
        checkEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email) {
                this.emailMessage = "Este campo no puedde estar vacio"
                this.validEmail = false
            } else if (!emailPattern.test(this.email)) {
                this.emailMessage = "Formato de email incorrecto"
                this.validEmail = false
            } else {
                this.emailMessage = ""
                this.validEmail = true
            }
        },
        checkText() {
            if (!this.text) {
                this.textMessage = "Este campo no puedde estar vacio"
                this.validText = false
            } else {
                this.textMessage = ""
                this.validText = true
            }
        },
        resetForm() {
            this.email = ""
            this.text = ""
            this.validEmail = false
            this.validText = false
            this.emailMessage = ""
            this.textMessage = ""
        },

        goBack() {
            this.$router.go(-1)
        },

        showToastMessage(toastClass, message) {
            this.toastClass = toastClass
            this.toastMessage = message
            this.showToast = true

            setTimeout(() => {
                this.showToast = false
            }, 5000)
        },

    },
    
    
    watch:{
    email: function () {
      this.checkEmail()
    },

    text: function () {
      this.checkText()
    },
}

}
</script>

<template>
    <main>
        <Toast v-if="showToast" :toastClass="toastClass" :message="toastMessage"/>

        <section class="contact_imgpart">
            <p class="contact_imgpart__title">DO YOU HAVE ANY PROBLEM ?</p>
            <div class="contact_imgpart__registerPart">
                <p>YOU DONT HAVE ACCOUNT ?</p>
                <button @click="goRegister">SIGN UP</button>
            </div>
        </section>

        <section class="contact">
            <p>CONTACT US</p>
            <form class="contact_form" @submit="sendForm">
                <label for="email" class="hidden_label">Email</label>
                <input v-model="email" type="text" id="email" name="email" placeholder="Email">
                <span :class="validEmail ? 'accept-message' : 'error-message'">{{ emailMessage }}</span>

                <label for="text" class="hidden_label">Petición</label>
                <textarea v-model="text" id="text" name="text" placeholder="Petición"></textarea>
                <span :class="validText ? 'accept-message' : 'error-message'">{{ textMessage }}</span>

                <button type="submit">ENVIAR</button>

                <p @click="goBack" class="goBack_btn">Go back</p>
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

.hidden_label{
    user-select: none;
    color: transparent;
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

.goBack_btn{
    font-size: 14px;
    color:rgba(19, 169, 73, 1);
    border-bottom: 2px solid  rgba(19, 169, 73, 1); 
    cursor: pointer;
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
    gap:25px
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
    border: 1px solid white;
    color:rgb(3, 3, 3, 1);
    background-color: rgba(19, 169, 73, 1);
}


input:focus{
    outline: none;
}

textarea {
    width: 130%;
    height: 100px;
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


@media screen and (max-width:540px){

.contact_imgpart{
    display: none;
}

.contact{
    width: 100%;
}

}



</style>