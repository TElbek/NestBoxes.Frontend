<template>
    <div class="card p-2 shadow-sm">
        <div class="card-title">
            <span class="fw-bold">Kasse {{ nestbox.No }}</span>
            <span class="fw-bold float-end">{{ formatDate(nestbox.lastInspection) }}</span>
        </div>
        <div class="card-body">
            <div>Test</div>
            <button type="button" class="btn btn-sm btn-outline-secondary mt-2 float-end">Rediger</button>
        </div>
    </div>
</template>

<script setup>
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
</style>