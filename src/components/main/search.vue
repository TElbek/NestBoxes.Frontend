<template>
    <div class="form-flex">
        <input 
            @keyup="emitValue()"
            v-model="state.searchText" class="form-control me-2" type="search" placeholder="Søg" aria-label="Search">
    </div>
</template>

<script setup>
import { reactive } from 'vue';
const emit = defineEmits(['search-event']);

const state = reactive({
    searchText: ''
});

function emitValue() {
    console.log('event');
    emit('search-event', state.searchText);
};
</script>