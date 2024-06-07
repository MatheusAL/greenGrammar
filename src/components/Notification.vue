<template>
    <div v-if="visible" class="notification" :class="type">
      {{ message }}
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  const props = defineProps({
    message: String,
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 2500
    }
  });
  
  const visible = ref(false);
  
  const showNotification = () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  };
  
  onMounted(() => {
    showNotification();
  });
  
  watch(() => props.message, (newMessage) => {
    if (newMessage) {
      showNotification();
    }
  });
  </script>
  
  <style scoped>
  .notification {
    position: absolute;
    
    left: 820px;
    top: 500px;
    margin: 0 auto;
    width: 90%;
    max-width: 90px;
    background-color: #4caf50; /* Default to green */
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
    transition: opacity 0.3s ease-in-out;
  }
  /* Media query para telas menores */
  @media (max-width: 768px) {
      .notification {
          left: 50%;
          top: 210px;
          transform: translateX(-50%); 
          max-width: 90%;
      }
  }
  .notification.info {
    background-color: #4caf50;
  }
  
  .notification.error {
    background-color: #f44336;
  }
  
  .notification.warning {
    background-color: #ff9800;
  }
  </style>
  