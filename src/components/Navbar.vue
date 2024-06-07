<template>
    <nav class="bg-black p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left-side items -->
      <div class="flex-1 flex justify-end md:justify-start space-x-4 md:space-x-8">
        <a href="#" class="text-green-400 hover:text-white transition duration-400 hidden md:block">Modo de jogo</a>
        <a href="#" class="text-green-400 hover:text-white transition duration-400 hidden md:block" @click="resetGame">Reiniciar</a>
      </div>

      <!-- Centered logo -->
      <div class="text-green-400 text-2xl md:text-4xl font-bold absolute left-1/2 transform -translate-x-1/2 ">
        Green Grammar!
      </div>

      <!-- Right-side items -->
      <div class="flex-1 flex justify-end space-x-4 md:space-x-8">
        <a href="#" class="text-green-400 hover:text-white transition duration-400 hidden md:block">Configurações</a>
        <a href="#" class="text-green-400 hover:text-white transition duration-400 hidden md:block"  @click="openModal">Sobre</a>
        <button @click="toggleMenu" class="block md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" class="md:hidden">
      <a href="#" class="block text-green-400 hover:text-green-400 transition duration-400 p-2">Modo de jogo</a>
      <a href="#" class="block text-green-400 hover:text-green-400 transition duration-400 p-2" @click="resetGame">Reiniciar</a>
      <a href="#" class="block text-green-400 hover:text-green-400 transition duration-400 p-2"  @click="openModal">Configurações</a>
      <a href="#" class="block text-green-400 hover:text-green-400 transition duration-400 p-2">Sobre</a>
    </div>
  </nav>
  </template>
  
<script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['inFocus', 'submit', 'openModal'])
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  const resetGame = () => {
    emit('resetGame');
  }
  const openModal = () => {
    emit('openModal');
  }
</script>
  
<style scoped>
  nav {
    transition: background-color 0.3s;
  }
</style>