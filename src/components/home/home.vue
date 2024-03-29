<template>
    <div v-if="state.hasData">
        <loopNestBox :nestBoxList="state.nestBoxList.boxesForChecking"></loopNestBox>
    </div>
</template>

<script setup>
import api from '@/api';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

import {onMounted, reactive } from 'vue';

const state = reactive({
    nestBoxList: {},
    hasData: false
});

onMounted(() => {
    getNestBoxes();    
}); 

function getNestBoxes() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/checkme')
    .then(res => {
        state.nestBoxList = res.data;
        state.hasData = true;
    })    
};
</script>