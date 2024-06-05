<script>
  export default {

    props: {
      toastClass: {type: String,required: true},
      message: {type: String,required: true},
      duration: {type: Number,default: 5000}
    },

    data() {
      return {
        visible: false
      }
    },

    methods: {
      showToast() {
        this.visible = true
        setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    },
    watch: {
      message() {
        this.showToast()
      }
    },
    mounted() {
      if (this.message) {
        this.showToast()
      }
    }
  };
  </script>

<template>
    <div :class="['toast', toastClass]" v-if="visible">
      <p>{{ message }}</p>
    </div>
</template>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    width: 300px;
    height: 60px;
    z-index: 3;
    transition: opacity 0.3s ease-in-out;
    border: 1px solid black;
  }
  
  .toast p {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  
  .toast.red {
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: rgba(243, 199, 199, 0.8);
    border: 2px solid rgba(254, 83, 83, 1);
  }
  
  .toast.green {
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(198, 235, 212, 0.8);
    border: 2px solid rgba(64, 216, 119, 1);
  }

  .toast.yellow {
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(254, 247, 215, 0.8);
    border: 2px solid rgba(247, 203, 6, 1);
  }
  </style>
  