<template>
    <div class="row row-cols-1 row-cols-sm-3 row-cols-xl-6 g-3 mb-3">
        <div v-for="box in needsRepair" class="col">
            <nestbox :nestbox="box"></nestbox>
        </div>
    </div>
</template>

<script setup>
import data from '@/data/nestbox.json';
import { computed, reactive } from 'vue';
import nestbox from '@/components/nestbox/nestbox.vue';

const needsRepair = computed(() => {
    return data.nestBoxes.filter((item) => item.needsRepair == true)
});
</script>