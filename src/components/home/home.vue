<template>
    <div>
        <loopNestBox :nestBoxList="state.nestBoxList"></loopNestBox>
    </div>
</template>

<script setup>
import api from '@/api';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

import {onMounted, reactive } from 'vue';

const state = reactive({
    nestBoxList: []
});

onMounted(() => {
    getNestBoxes();    
}); 

function getNestBoxes() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/feature')
    .then(res => state.nestBoxList = res.data)    
};
</script>