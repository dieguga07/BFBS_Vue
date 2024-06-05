<script>
export default {
    
}
</script>

<template>
<main>
    <p class="top scaling">UPSSS!</p>
    <p class="mid">4 <img src="../../../assets/images/pesa.png" alt="pesa" class="rotating"> 4</p>
    <p class="bottom">RETURN TO THE<router-link to="/public"> MAIN PAGE</router-link></p>
</main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap');

main {
    width: 100%;
    height: 100vh;
    background-color: rgba(3, 3, 3, 1);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50vh;
    flex-direction: column;
    font-family: "Goldman", sans-serif;
}

.top {
    font-size: 45px;
}

.scaling {
    animation: scale 2s ease-in-out 2 forwards;
}

@keyframes scale {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
}

.mid {
    font-size: 110px;
    position: absolute;
    top: 40%;
}

img {
    position: relative;
    top: 20px;
    width: 100px;
}

.rotating {
    animation: spin 8s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

a {
    text-decoration: none;
    color: rgba(64, 216, 119, 1);
}
</style>