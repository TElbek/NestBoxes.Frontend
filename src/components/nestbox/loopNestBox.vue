<template>
    <div class="row row-cols-1 row-cols-sm-3 row-cols-xl-6 g-2">
        <div v-for="box in nestBoxList" class="col">
            <nestbox :nestbox="box" :showBrief="showBrief"></nestbox>
        </div>
    </div>
</template>

<script setup>
import nestbox from '@/components/nestbox/nestbox.vue';

const props = defineProps({
    nestBoxList: Array,
    showBrief : false
});
</script>