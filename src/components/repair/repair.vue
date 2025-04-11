<template>
    <router-link :to="{path:'/repair/edit/' + props.repairModel.fid}">
        <div class="card shadow-sm border h-100">
            <div class="card-header">
                <div class="row">
                    <div class="col  fw-bold">{{ props.repairModel.nestBoxProperties.boxId }}</div>
                    <div class="col-auto">{{ formatDate(props.repairModel.createdAt) }}</div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <span class="col fst-italic">{{ props.repairModel.comment }}</span>
                    <span class="col-auto" v-if="props.repairModel.repairStatus == 0">Afventer</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { formatDate } from '@/js/dateandtime.js';

const props = defineProps({
    repairModel: {}
});
</script>

<style scoped>
.card-header {
    padding: 5px;
    background-color: inherit;
    border-bottom-width: 0px;
}

.card-body {
    padding: 5px;
}
</style>