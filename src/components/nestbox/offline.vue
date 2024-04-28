<template>
    <div>
        <button class="btn btn-sm" :class="offlineBtnClass" type="button" @click="setOffline">{{ offlineCaption }}></button>
    </div>
</template>

<script setup>
import {computed } from 'vue';
   
const offlineCaption = computed(() => {
    return state.nestBox.properties.isOffline ? "Montere" : "Nedtage";
});

const offlineBtnClass = computed(() => {
    return state.nestBox.properties.isOffline ? "btn-success" : "btn-danger";
});

function setOffline() {
    api.post(
        'nestbox/takedown/' + 
        state.nestBox.properties.fid + '/' + !state.nestBox.properties.isOffline)
        .then(res => router.go(-1));
}
</script>
    