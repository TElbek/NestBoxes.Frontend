<template>
    <div class="h4 p-1">{{ route.meta.title }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>