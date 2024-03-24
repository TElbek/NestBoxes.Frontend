<template>
    <div>
        <div class="h4">
            Rediger Redekasse {{ route.params.boxId }}
        </div>
        <div class="btn-grid">
            <button class="btn btn-sm btn-success" type="button" @click="save">Gem</button>
            <button class="btn btn-sm btn-danger" type="button" @click="cancel">Fortryd</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter();
const route = useRoute();

function save() {
    router.go(-1);
}

function cancel() {
    router.go(-1);
}
</script>

<style scoped>
    .btn-grid {
        display: grid;
        grid-template-columns: repeat(2, 80px);
        gap: 10px;
    }
</style>