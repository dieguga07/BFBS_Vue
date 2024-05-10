<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../../InitialPart/components/Footer.vue';

export default {
  components: { UserNavbar, Footer },

  data() {
    return {
        routines:[1]
     
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

            <p id="your_routines">YOUR ROUTINES</p>
  
            <article class="routines_container">


            <div v-if="routines.length === 0" class="no_routines">
                <p>No tienes rutinas creadas.</p>
            </div>


           <div v-if="routines.length !== 0" >
                <section class="routine">

                    <p id="title">Lunes</p>

                    <div class="routine_content">

                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>

                    </div>


                    <div class="routine__btn">

                        <button><i class="fa-solid fa-pen fa-2xl" style="color: #000000;"></i></button>
                        <button><i class="fa-solid fa-trash fa-2xl" style="color: #000000;"></i></button>
                    </div>

                </section>

           </div>
            
        </article>

        <!-------------------------------------------------- DIVISOR --------------------------------------------->
  
        <article class="current_routine_container">

            <p id="create_title">YOUR CURRENT CREATION</p>

            <section class="routine">

                    <p id="title">Lunes</p>

                    <div class="routine_content">

                            <div class="routine__exercise">

                                <p >Title</p>
                                <img src="../../../assets/images/Frame 18.png" alt="imagen">
                                <p>repetitions</p>
                                <p>series</p>

                            </div>

                    </div>


                    <div class="routine__btn">

                        <button id="add"><i class="fa-solid fa-circle-plus fa-flip-horizontal fa-2xl" style="color: #000000;"></i></button>
                        <button id="remove"> <i class="fa-solid fa-trash fa-2xl" style="color: #000000;"></i></button>
                    </div>

                </section>
          
        </article>

      </section>

    </main>

    <Footer></Footer>

</template>
  

<style scoped>

#add{
    background-color: rgba(64, 216, 119, 1);
    border: 1px solid black;

}

#remove{
    background-color: rgba(254, 83, 83, 1);
    border: 1px solid black;
}


#your_routines {
    margin-top:  5%;
    margin-bottom:  5%;
    margin-left: 5%;
    font-size: 30px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.routines_container{
    width: 100%;
    min-height: 50vh;
    padding-left: 5%;
}

.no_routines{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8vh;
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
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

.routine_content{

    display: flex;
    flex-direction: row;
    border: 1px solid black;
    height: 200px;
    width: calc(100% - 70px);
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
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    widows: 200px;
    align-items: center;
    gap: 5px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


.routine__exercise img{
    width: 150px;
    height: 100px;
}
  

.routine__btn{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    right: 21px;
  
}
  
.routine__btn button{
    height: 41%;
    width: 50px;
    
}


.current_routine_container{
    min-height: 50vh;
    margin-left: 5%;
    margin-bottom: 5%;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}


.current_routine_container #create_title {
    margin-bottom:  5%;
    font-size: 30px;
    font-family: "Goldman", sans-serif;
    font-style: normal;
}

</style>
  