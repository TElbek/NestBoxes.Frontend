<template>
    <router-link :to="{path:'/repair/edit/' + props.repair.fid}">
        <div class="card shadow-sm border h-100">
            <div class="card-header">
                <div class="row">
                    <div class="col  fw-bold">{{ props.repair.nestBoxProperties.boxId }}</div>
                    <div class="col-auto">{{ formatDate(props.repair.createdAt) }}</div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <span class="col fst-italic">{{ props.repair.comment }}</span>
                    <span class="col-auto" v-if="props.repair.repairStatus == 0">Afventer</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { formatDate } from '@/js/dateandtime.js';

const props = defineProps({
    repair: {}
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