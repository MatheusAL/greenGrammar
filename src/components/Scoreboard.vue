<template>
    <div class="scoreboard flex flex-col items-center w-full">
      <h1 class="text-5xl text-green-500 p-4">Pontuação</h1>
      <div class="table-container w-full">
        <table class="table-auto bg-white shadow-md w-full border-black border-2 rounded-xl">
          <thead>
            <tr>
              <th class="px-4 py-2 text-green-500">Palavra</th>
              <th class="px-4 py-2 text-green-500">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in score" :key="row.word">
              <td class="border px-4 py-2 text-center">{{ row.word }}</td>
              <td class="border px-4 py-2 text-center">{{ row.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<script setup>
    const props = defineProps(['score'])
</script>

<style scoped>
.scoreboard {
  width: 100%;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
}

table {
  width: 100%;
  margin: 0 auto;
}

th, td {
  text-align: center;
}
</style>