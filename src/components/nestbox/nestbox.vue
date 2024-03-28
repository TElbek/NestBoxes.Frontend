<template>
    <div class="card p-2 shadow-sm">
        <div class="card-title">
            <span class="fw-bold">Kasse {{ nestbox.boxId }}</span>
        </div>
        <div class="card-body">
            <router-link :to="`/editBox/${nestbox.boxId}`">
                Tilføj
            </router-link>
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

    a {
        text-decoration: none;
        color: black;
        font-size: 0.8rem;
    }
</style>