<template>
    <div class="float-end">
        <template v-if="nestbox.altitude == 2">
            <span>Stige</span>
            <span class="ms-1 me-1">-</span>
        </template>
        <span>Zone {{ nestbox.zone }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    nestbox: {},
});
</script>