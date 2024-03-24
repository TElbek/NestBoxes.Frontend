<template>
    <div>
        <div class="row row-cols-1 row-cols-sm-3 row-cols-xl-6 g-3 mb-3">
            <div v-for="box in state.nestBoxList" class="col">
                <nestbox :nestbox="box"></nestbox>
            </div>
        </div>
    </div>
</template>

<script setup>
import data from '@/data/nestbox.json';
import nestbox from '@/components/nestbox/nestbox.vue';

import {onMounted, reactive } from 'vue';

const state = reactive({
    nestBoxList: []
});

onMounted(() => {
    state.nestBoxList = data.nestBoxes;
}); 
</script>