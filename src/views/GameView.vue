<template>
  <div class="about w-full h-full flex flex-col md:flex-row bg-green-300">
      <div class="left-column w-full md:w-1/2 flex flex-col justify-center  p-4">
          <div class="flex justify-center h-2/6">
            <h1 class="text-6xl">Green Grammar</h1>
          </div>
          <div class="h-4/6">
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
        
      </div>
      <div class="right-column w-full md:w-1/2 p-4 justify-center">
        <Scoreboard :score="score"/>
      </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import Hexagon from '../components/Hexagon.vue';
  import Scoreboard from '../components/Scoreboard.vue';

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);
  const word = ref('');
  const score = ref([
    {
      word: "test",
      score: 10
    },
    {
      word: "test 2",
      score: 20
    },
  ]);
  const submitWord = (e) =>  {
    if (isWordValid.value) {

      score.value.push({
        "word": word.value,
        "score": 100
      });
    }
    word.value = '';
  }

  const isWordLong = computed(() => {
    return word.value.length > 3;
  });
  const isWordValidForToday = computed(() => {
    return word.value.split('').every(letter => todaysLetters.value.includes(letter.toUpperCase()));
  });

  const haveCentralLetter = computed(() => {
    return word.value.toUpperCase().includes(todaysLetters.value[3]);
  });

  const isWordValid = computed(() => {
    return isWordLong.value && isWordValidForToday.value && haveCentralLetter.value;
  });
 

</script>

  
<style>

.flower {
  display: grid;
  grid-template-columns: repeat(5, 38px);
  grid-template-rows: repeat(3, 68px);
  
  justify-content: center;
}

</style>
  