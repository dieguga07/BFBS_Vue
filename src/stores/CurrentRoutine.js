import {defineStore} from  'pinia'



export const CurrentRoutine = defineStore('currentRoutine',{

    state: () =>({

        exercises:[]

    }),


    actions:{

        addExercise(exercise) {
            this.exercises.push(exercise);
        },

        removeExercises(){
            this.exercises = []
        }

      },

      persist: {
        enabled:true,
        strategies:[
          {
            key:"currentRoutine",
            storage: localStorage,
          },
         
        ]
      }



})