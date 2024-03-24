<template>
    <div class="card p-2">
        <div class="row">
            <div class="col h6">{{ nestbox.No }}</div>
            <div class="col-auto h6">{{ formatDate(nestbox.lastInspection) }}</div>            
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