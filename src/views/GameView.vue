<template>
  <div class="game-container flex justify-center items-center bg-green-500 p-6">
    <div class="game-content w-full md:w-3/4 flex flex-col md:flex-row justify-center items-stretch bg-white rounded-2xl shadow-2xl p-8">
      <div class="left-column w-full md:w-1/2 flex flex-col items-center mb-8 md:mb-0 md:mr-4">
        <h1 class="text-6xl text-green-500 italic mb-4">Green Grammar</h1>
        <div class="hexagon-container">
          <Hexagon :letters="todaysLetters"/>
        </div>
        <div class="input-container w-full mt-4">
          <input 
            type="text" 
            class="input-field text-4xl text-green-500 uppercase font-extrabold w-full bg-transparent border-b-2 border-green-500 outline-none text-center"
            v-model="word"
            @keyup.enter="submitWord"
            placeholder="Enter your word"
          >
        </div>
      </div>
      <div class="right-column w-full md:w-1/2 flex flex-col items-center">
        <Scoreboard :score="score"/>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import Hexagon from '../components/Hexagon.vue';
  import Scoreboard from '../components/Scoreboard.vue';

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);
  const word = ref('');
  const score = ref([]);
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

  

<style scoped>
.game-container {
  min-height: 100vh;
}

.game-content {
  max-width: 1280px;
  min-height: 700px; /* Increased height */
  display: flex;
  justify-content: center;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.left-column {
  width: 100%;
}

.right-column {
  width: 100%;
}

.hexagon-container {
  display: grid;
  grid-template-columns: repeat(5, 38px);
  grid-template-rows: repeat(3, 68px);
  justify-content: center;
}

.input-field::placeholder {
  color: #9CA3AF; /* Gray-500 */
}

.scoreboard-container {
  width: 100%;
  max-height: 300px; /* Limit height of scoreboard */
  overflow-y: auto; /* Enable vertical scroll */
}
</style>