<template>
  <Navbar @reset-game="resetGame"/>
  <div class="game-container flex justify-center items-center bg-green-500 p-6">
    <div class="game-content w-full md:w-3/4 flex flex-col md:flex-row justify-center items-stretch bg-white rounded-2xl shadow-2xl border-2 border-black p-8">
      <div class="left-column w-full md:w-1/2 flex flex-col justify-around items-center mb-8 md:mb-0 md:mr-4">
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
        <div class="controls w-full flex justify-around">
          <button class="bg-green-400 hover:bg-gray-100 text-black font-semibold py-2 px-5 border border-black rounded-xl shadow-xl"
            @click="deleteLetter()"
          >
            Apagar
          </button>
          <button class="bg-green-400 hover:bg-gray-100 text-black font-semibold py-2 px-5 border border-black rounded-xl shadow-xl"
            @click="submitWord()"
          >
            Confirmar
          </button>

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
  import Navbar from '../components/Navbar.vue'

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);
  const word = ref('');
  const score = ref([]);
  const acceptedWordList = ref([]);
  const notificationMessage = ref('');
  const notificationType = ref('info');
  const wordsSet = ref(new Set());

  onMounted(() => {
    getInitialData();
    loadWords();
  });

  const submitWord = (e) =>  {
    if (!acceptedWordList.value.includes(word.value) && isWordValid.value && wordsSet.value.has(word.value)) {
      const wordScore = calculateScore()
      score.value.push({
        "word": word.value,
        "score": wordScore
      });
      getNotification(wordScore)
      acceptedWordList.value.push(word.value);
      localStorage.setItem('score', JSON.stringify(score.value));
      localStorage.setItem('acceptedWordList', JSON.stringify(acceptedWordList.value));
      word.value = '';
      return;
    }
    getNotification()
    word.value = '';
  }

  const loadWords = async () => {
    try {
        const response = await fetch('palavras.txt');
        const text = await response.text();
        const wordArray = text.split('\n').map(word => word.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        wordsSet.value = new Set(wordArray);
      } catch (error) {
        console.error('Error loading words:', error);
      }
  }

  const getNotification = (wordScore) => {
    if (!isWordLong.value) {
      notificationType.value = 'error';
      notificationMessage.value = 'Palavra muito curta :('
      return;
    }

    if (!isWordValidForToday.value) {
      notificationType.value = 'error';
      notificationMessage.value = 'Letras inválidas :('
      return;
    }

    if (!haveCentralLetter.value) {
      notificationType.value = 'error';
      notificationMessage.value = 'Palavra sem a letra central :('
      return;
    }

    if (!wordsSet.value.has(word.value)) {
      notificationType.value = 'warning';
      notificationMessage.value = 'Palavra doida kkkkkk'
      return;
    }

    if(acceptedWordList.value.includes(word.value)) {
      notificationType.value = 'warning';
      notificationMessage.value = 'Palavra já utilizada po'
      return;
    }
  
    notificationType.value = 'info';
    notificationMessage.value = `Boa! +${wordScore}`;
  }


  const getInitialData = () => {
    if(!localStorage.getItem('currentGame')) {
      score.value = [];
      acceptedWordList.value = [];
      todaysLetters.value = getRandomLetters();
      localStorage.removeItem('score');
      localStorage.setItem('currentGame', JSON.stringify(todaysLetters.value))
      return;
    }
    todaysLetters.value = JSON.parse(localStorage.getItem('currentGame'));
    score.value = JSON.parse(localStorage.getItem('score')) || [];
    acceptedWordList.value = JSON.parse(localStorage.getItem('acceptedWordList')) || [];
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

  const resetGame = () => {
    score.value = [];
    acceptedWordList.value = [];
    todaysLetters.value = getRandomLetters();
    localStorage.removeItem('score');
    localStorage.removeItem('acceptedWordList');
    localStorage.setItem('currentGame', JSON.stringify(todaysLetters.value))
  }

  const deleteLetter = () => {
    word.value = word.value.slice(0, word.value.length -1);
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