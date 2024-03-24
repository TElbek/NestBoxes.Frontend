<template>
    <div>
        <loopNestBox :nestBoxList="state.nestBoxList"></loopNestBox>
    </div>
</template>

<script setup>
import data from '@/data/nestbox.json';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

import {onMounted, reactive } from 'vue';

const state = reactive({
    nestBoxList: []
});

onMounted(() => {
    state.nestBoxList = data.nestBoxes;
}); 
</script>