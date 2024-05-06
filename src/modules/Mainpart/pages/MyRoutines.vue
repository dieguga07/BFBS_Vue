<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';

export default {
  components: { UserNavbar, Footer },

  data() {
    return {
        routines:[]
     
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
  
          <article class="routines_container">

           
            <div class="routine">

                    <p id="title">Lunes</p>

                    <div class="routine_content">

                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>
                                
                            </div>

                            
                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>



                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>



                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>



                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>




                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>

                    </div>


                    <div class="routine__btn">

                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>

            </div>

            <div class="routine">

<p id="title">Lunes</p>

<div class="routine_content">

        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>
            
        </div>

        
        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>

        </div>



        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>

        </div>



        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>

        </div>



        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>

        </div>




        <div class="routine__exercise">

            <p >Title</p>
            <img src="../../../assets/images/Frame 18.png" alt="imagen">
            <p>repetitions</p>
            <p>series</p>

        </div>

</div>


<div class="routine__btn">

    <button>Editar</button>
    <button>Eliminar</button>
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


section h1 {
    margin-top:  5%;
    margin-bottom:  5%;
    margin-left: 5%;
}

.routines_container{
    width: 100%;
    min-height: 80vh;
    padding-left: 5%;
}

  
.routine {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    position: relative;
    margin-top: 40px;
}

.routine #title{
    margin-bottom: 10px;
    font-size: 30px;
}

.routine_content{

    display: flex;
    flex-direction: row;
    border: 1px solid black;
    height: 200px;
    width: calc(100% - 50px);
    overflow-x: scroll;
    overflow-y: hidden; 

}

.routine_content::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}  

.routine_content::-webkit-scrollbar-thumb {
    background-color: rgba(62, 60, 60, 0.478);
    border-radius: 5px;
}  

.routine_content::-webkit-scrollbar-track  {
    background-color: rgba(255, 255, 255, 0.5); 
    border-radius: 20px;
}  

.routine__exercise{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    width: 100%;
    align-items: center;
    gap: 5px;
}


.routine__exercise img{
    width: 150px;
    height: 100px;
}
  

.routine__btn{
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
  
}
  
.routine__btn button{
    height: 41%;
    
}


.current_routine_container{

    width: 100%;
    min-height: 50%vh;


}

</style>
  