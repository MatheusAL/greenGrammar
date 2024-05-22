<template>
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr>
                <th class="px-4 py-2">Palavra</th>
                <th class="px-4 py-2">Pontuação</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in score">
                <td class="border px-4 py-2">{{ row.word }}</td>
                <td class="border px-4 py-2">{{ row.score }}</td>
            </tr>
            
        </tbody>
    </table>
</template>

<script setup>
    const props = defineProps(['score'])
</script>