<template>
    <div class="card p-2 shadow-sm">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.fid}`">
                <record-info :fid="nestbox.fid" v-if="!showBrief">
                    <div class="h6">{{ nestbox.boxId }}</div>
                </record-info>
                <div v-else class="h6">{{ nestbox.boxId }}</div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import recordInfo from '@/components/record/recordInfoForBox.vue';

const props = defineProps({
    nestbox: {},
    showBrief : false
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
    font-size: 0.9rem;
}
</style>