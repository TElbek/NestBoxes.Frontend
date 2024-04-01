<template>
    <div class="scroll-area">
        <div class="row row-cols-1 row-cols-sm-3 row-cols-xl-6 g-2 p-1">
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
@media only screen and (max-width: 576px) {
    .scroll-area {
        margin-top: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 70vh;
        scrollbar-gutter: true;
    }
}

@media only screen and (min-width: 576px) {
    .scroll-area {
        overflow-y: auto;
        height: 100vh;
    }
}
</style>