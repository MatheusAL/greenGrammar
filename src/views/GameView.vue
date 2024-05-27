<template>
  <div class="game-container flex justify-center items-center bg-green-500 p-6">
    <div class="game-content w-full md:w-3/4 flex flex-col md:flex-row justify-center items-stretch bg-white rounded-2xl shadow-2xl border-2 border-black p-8">
      <div class="left-column w-full md:w-1/2 flex flex-col justify-around items-center mb-8 md:mb-0 md:mr-4">
        <h1 class="text-6xl text-green-500 mb-4">Green Grammar</h1>
        <div class="hexagon-container">
          <Hexagon :letters="todaysLetters"/>
        </div>
        <div class="input-container w-full mt-4">
          <input 
            type="text" 
            class="input-field text-2xl text-green-500 uppercase font-extrabold w-full bg-transparent border-b-2 border-green-500 outline-none text-center"
            v-model="word"
            @keyup.enter="submitWord"
          >
        </div>
      </div>
      <div class="right-column w-full md:w-1/2 flex flex-col items-center">
        <Scoreboard :score="score"/>
      </div>
    </div>
    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType"/>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from 'vue'
  import Hexagon from '../components/Hexagon.vue';
  import Scoreboard from '../components/Scoreboard.vue';
  import Notification from '../components/Notification.vue'

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);
  const word = ref('');
  const score = ref([]);
  const acceptedWordList = ref([]);
  //create a word list
  // onn mounted get from localstorage or from the API(word, lettters, score)    

  onMounted(() => {
    getInitialData();
  });

  const submitWord = (e) =>  {
    if (!acceptedWordList.value.includes(word.value) && isWordValid.value) {
      const wordScore = calculateScore()
      score.value.push({
        "word": word.value,
        "score": wordScore.value
      });
      acceptedWordList.value.push(word.value);
      localStorage.setItem('score', JSON.stringify(score.value));
      localStorage.setItem('acceptedWordList', JSON.stringify(acceptedWordList.value));
      notificationMessage.value = `Nice one! + ${wordScore}`;
    }
    //decide which type here, according to the validation of the word(create a function for it)
    notificationType.value = 'info';
    word.value = '';
  }

  const notificationMessage = ref('');
  const notificationType = ref('info');

  const getInitialData = () => {
    if(!localStorage.getItem('currentGame')) {
      //generate new game(api call? fetch from file? get some letters, save the date)
      score.value = [];
      acceptedWordList.value = [];
      todaysLetters.value = getRandomLetters();
      localStorage.removeItem('score');
      localStorage.setItem('currentGame', JSON.stringify(todaysLetters.value))
      return;
    }
    if(localStorage.getItem('score')) {
      todaysLetters.value = JSON.parse(localStorage.getItem('currentGame'));
      score.value = JSON.parse(localStorage.getItem('score'));
      acceptedWordList.value = JSON.parse(localStorage.getItem('acceptedWordList'))
      return;
    }
    //load words, current letters, score

  }

  const calculateScore = () => {
    return word.value.length * 10;
  }

  const getRandomLetters = ()  => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letters = [];
    while (letters.length < 7) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const letter = alphabet[randomIndex];
      if (!letters.includes(letter)) {
        letters.push(letter);
      }
    }
    return letters;
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
  justify-content: space-around;
  flex-grow: 1;
}

.left-column {
  width: 100%;
}

.right-column {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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