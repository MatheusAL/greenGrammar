<template>
  <div class="about w-full h-full flex flex-col md:flex-row bg-green-300">
      <div class="left-column w-full md:w-1/2 flex flex-col justify-center items-center p-4">
          <div class="flower">
            <Hexagon :letters="todaysLetters"/>
          </div>
          <div class="w-full p-5 mx-4 relative">
            <input 
              type="text" 
              class="invisible-input text-4xl text-white uppercase font-extrabold w-full bg-transparent border-none outline-none text-black placeholder-gray-500"
              v-model="word"
              @keyup.enter="submitWord"
          >
          </div>
        
      </div>
      <div class="right-column w-full md:w-1/2 p-4 justify-center">
          <table class="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                  <tr>
                      <th class="px-4 py-2">Palavra</th>
                      <th class="px-4 py-2">Pontuação</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="border px-4 py-2">Teste</td>
                      <td class="border px-4 py-2">100</td>
                  </tr>
                  <tr>
                      <td class="border px-4 py-2">Teste</td>
                      <td class="border px-4 py-2">50</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Hexagon from '../components/Hexagon.vue';

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);
  const word = ref('');
  
  const submitWord = (e) =>  {
    console.log(word.value);
  }
</script>

  
<style>

.flower {
  display: grid;
  grid-template-columns: repeat(5, 38px);
  grid-template-rows: repeat(3, 68px);
  
  justify-content: center;
}

</style>
  