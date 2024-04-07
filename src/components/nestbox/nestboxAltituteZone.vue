<template>
    <div class="float-end h6 fw-normal">
        <span v-if="nestbox.altitude == 2">Stige</span>
        <span v-if="nestbox.altitude == 2">&nbsp;-&nbsp;</span>
        <span>Zone: {{ nestbox.zone }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    nestbox: {},
});
</script>