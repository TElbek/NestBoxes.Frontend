<template>
    <div class="mb-3 scroll">
        <div v-if="props.nestBoxList.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-2">
            <div v-for="box in nestBoxList" class="col">
                <nestbox :nestbox="box" :showBrief="showBrief"></nestbox>
            </div>
        </div>
        <div v-else>
            <span class="h5">Ingen Redekasser</span>
        </div>
    </div>
</template>

<script setup>
import nestbox from '@/components/nestbox/nestbox.vue';

const props = defineProps({
    nestBoxList: Array,
    showBrief: false
});
</script>

<style scoped>

</style>