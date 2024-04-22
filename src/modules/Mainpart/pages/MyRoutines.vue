<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';

export default {
  components: { UserNavbar, Footer },

  data() {
    return {
     
    }
  },
 
  methods: {
 
  }

  
}

</script>

<template>
    <main>
      <UserNavbar></UserNavbar>
  
      <section>

     

          <h1>YOUR ROUTINES</h1>
  
          <article class="routine_container">
            <h3>Lunes</h3>
  
            <div class="routine_container__routine">
           
              <div class="routine_container__exercise">
                <p>ejercicio 1</p>
                <img src="" alt="imagen">
                <p>series</p>
                <p>repetitions</p>
              </div>

              <div class="routine_container__exercise">
                <p>ejercicio 1</p>
                <img src="" alt="imagen">
                <p>series</p>
                <p>repetitions</p>
              </div>

              <div class="routine_container__buttons">
                <button>editar</button>
                <button>eliminar</button>
              </div>
            </div>

          </article>

        <!-------------------------------------------------- DIVISOR --------------------------------------------->
  
        <article class="current_routine_container">
          
        </article>

      </section>

    </main>

    <Footer></Footer>

</template>
  

  
  <style scoped>


.routine_container{
    width: 100%;
    min-height: 50vh;
    padding-left: 5%;
}

  
.routine_container__routine {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 1px solid black;
    min-width: 300px;
    max-width: 90%;
    gap: 30px;
}
  
  .routine_container__buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .routine_container__buttons button {
    display: flex;
    justify-content: end;
    margin-left: 5px;
    height: 100%;
    width: 50px;
  }
  
  </style>
  