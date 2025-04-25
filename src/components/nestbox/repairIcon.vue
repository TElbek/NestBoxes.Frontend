<template>
    <router-link :to="`/repair/edit/${props.fid}`" class="ms-2" v-if="hasRepair()">
        <span class="repair" :class="getRepairClass(props.repairLevel)">&#x2692</span>
    </router-link>
</template>

<script setup>
import { getRepairClass } from '@/js/repair.js';
const props = defineProps({
    fid: 0,
    repairLevel: 0
});

function hasRepair() {
    return props.repairLevel > 0;
}
</script>