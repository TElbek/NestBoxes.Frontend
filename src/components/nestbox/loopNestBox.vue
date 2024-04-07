<template>
    <div class="mb-3 scroll">
        <div class="row row-cols-1 row-cols-sm-3 row-cols-xl-6 g-2">
            <div v-for="box in nestBoxList" class="col">
                <nestbox :nestbox="box" :showBrief="showBrief"></nestbox>
            </div>
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
.scroll {
    height: 80vh;
    overflow-y: auto;
    scrollbar-width: 0px;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
    display: none;
}
</style>