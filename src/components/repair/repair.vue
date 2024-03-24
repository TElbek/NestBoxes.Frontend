<template>
    <div>
        <loopNestBox :nestBoxList="needsRepair"></loopNestBox>
    </div>
</template>

<script setup>
import data from '@/data/nestbox.json';
import { computed, reactive } from 'vue';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

const needsRepair = computed(() => {
    return data.nestBoxes.filter((item) => item.needsRepair == true)
});
</script>