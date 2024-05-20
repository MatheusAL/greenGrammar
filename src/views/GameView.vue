<template>
  <div class="about w-full h-full flex flex-col md:flex-row bg-green-300">
      <!-- Left Column -->
      <div class="left-column w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div class="flower">
            <div v-for="(letter, index) in todaysLetters" :key="index" class="hexagon">
              <span>{{ letter }}</span>
            </div>

        </div>
        <div class="w-full p-5 mx-4 relative">
          <input type="text" class="invisible-input font-xl text-2xl text-white uppercase font-extrabold w-full bg-transparent border-none outline-none text-black placeholder-gray-500">
        </div>

      </div>
      <!-- Right Column -->
      <div class="right-column w-full md:w-1/2 p-4 justify-center">
          <!-- Table Component Placeholder -->
          <table class="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                  <tr>
                      <th class="px-4 py-2">Header 1</th>
                      <th class="px-4 py-2">Header 2</th>
                      <th class="px-4 py-2">Header 3</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="border px-4 py-2">Data 1</td>
                      <td class="border px-4 py-2">Data 2</td>
                      <td class="border px-4 py-2">Data 3</td>
                  </tr>
                  <tr>
                      <td class="border px-4 py-2">Data 4</td>
                      <td class="border px-4 py-2">Data 5</td>
                      <td class="border px-4 py-2">Data 6</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const todaysLetters = ref(['A','B', 'C', 'D', 'E', 'F', 'G']);

</script>

  
<style>

.flower {
/*   display: flex;
  flex-direction: column;
  align-items: center;
 */
  display: grid;
  grid-template-columns: repeat(5, 38px);
  grid-template-rows: repeat(3, 68px);
  
  justify-content: center;
}


.hexagon {
  width: 70px;
  height: 81px;
  background-color: #e4eaf3;
  margin: -8px 0px -8px 5px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px; /* Adjust font size as needed */
  position: relative;
}
.hexagon:nth-child(1) { grid-column: 2; grid-row: 1; }
.hexagon:nth-child(2) { grid-column: 4; grid-row: 1; }
.hexagon:nth-child(3) { grid-column: 1; grid-row: 2; }
.hexagon:nth-child(4) { grid-column: 3; grid-row: 2; }
.hexagon:nth-child(5) { grid-column: 5; grid-row: 2; }
.hexagon:nth-child(6) { grid-column: 2; grid-row: 3; }
.hexagon:nth-child(7) { grid-column: 4; grid-row: 3; }

</style>
  