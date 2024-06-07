<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-green-400">Green Grammar</h2>
        <button @click="closeModal" class="text-gray-700">&times;</button>
      </div>
      <div>
        <p class="mb-2">Criado por: Matheus Lima</p>
        <p class="mb-2">GitHub: <a href="https://github.com/MatheusAL/greenGrammar" class="text-blue-500" target="_blank">https://github.com/MatheusAL/greenGrammar</a></p>
      </div>
    </div>
  </div>
</template>


<script setup>
    const props = defineProps(['isOpen'])
    const emit = defineEmits(['close'])

    const closeModal = () => {
      emit('close');
    }
</script>

<style scoped>

</style>