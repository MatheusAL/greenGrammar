<template>
    <div v-for="(letter, index) in letters" :key="index" class="hexagon">
        <span>{{ letter }}</span>
    </div>
</template>


<script setup>
    const props = defineProps(['letters'])
</script>

<style scoped>


.hexagon {
  width: 70px;
  height: 81px;
  background-color: #e4eaf3;
  /* margin: -10px 0px -10px 5px; */
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
.hexagon:nth-child(4) { grid-column: 3; grid-row: 2; background-color: rgb(74 222 128); }
.hexagon:nth-child(5) { grid-column: 5; grid-row: 2; }
.hexagon:nth-child(6) { grid-column: 2; grid-row: 3; }
.hexagon:nth-child(7) { grid-column: 4; grid-row: 3; }

</style>