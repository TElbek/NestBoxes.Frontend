<template>
    <div class="card p-2 shadow-sm">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.fid}`">
                <div class="card-title">
                    <span class="h5">{{ nestbox.boxId }}</span>
                </div>
            </router-link>
            <record-info :fid="nestbox.fid"></record-info>
        </div>
    </div>
</template>

<script setup>
import recordInfo from '@/components/record/recordInfoForBox.vue';

const props = defineProps({
    nestbox: {}
});

function formatDate(date) {
    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }
    return new Date(date).toLocaleDateString('da-dk', options);
}
</script>

<style scoped>
.card-body {
    padding: 0;
}

a {
    text-decoration: none;
    color: black;
    font-size: 0.8rem;
}
</style>