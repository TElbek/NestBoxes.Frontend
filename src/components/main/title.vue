<template>
    <div class="d-lg-none h4 p-1">{{ route.meta.title }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute();
</script>