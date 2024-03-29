<template>
    <div class="d-lg-none mb-2">
        <span class="h4 p-1">{{ route.meta.title }}</span>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>