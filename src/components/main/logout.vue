<template>
    <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthenticateStore } from '@/stores/authenticate.js';
import { useRouter } from 'vue-router'

const authenticate = useAuthenticateStore();
const router = useRouter();

onMounted(() => {
    authenticate.setJwtToken(null);
    router.replace("/");
});
</script>