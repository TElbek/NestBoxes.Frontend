<template>
    <div v-if="state.hasData">
        <div class="h4">
            Redekasse {{ state.nestBox.properties.boxId}}
        </div>
        <div class="btn-grid">
            <button class="btn btn-sm btn-success" type="button" @click="save">Gem</button>
            <button class="btn btn-sm btn-dark" type="button" @click="cancel">Fortryd</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import {onMounted, reactive, computed } from 'vue';
import api from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
    hasData: false,
    nestBox: {}
});

function getNestBox() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + '/nestbox/feature/' +  route.params.boxId)
    .then(res => {
        state.nestBox = res.data;
        state.hasData = true;
    })    
}

function save() {
    router.go(-1);
}

function cancel() {
    router.go(-1);
}

onMounted(() => {
    getNestBox();
});
</script>

<style scoped>
    .btn-grid {
        display: grid;
        grid-template-columns: repeat(3, 80px);
        gap: 10px;
    }
</style>