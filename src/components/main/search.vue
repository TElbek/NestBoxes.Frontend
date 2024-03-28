<template>
    <div class="form-flex">
        <input class="form-control me-2" type="search" placeholder="Søg" aria-label="Search">
    </div>
</template>

<script setup>
    const emit = defineEmits(['search-event']);
</script>