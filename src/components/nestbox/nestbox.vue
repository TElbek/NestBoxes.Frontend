<template>
    <div class="card ps-2 pe-2 pb-1 pt-1 shadow-sm h-100">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.properties.fid}`">
                <record-info :recordInfo="nestbox.records[0]" v-if="!showBrief">
                    <nestbox-altitute-zone :nestbox="nestbox.properties"></nestbox-altitute-zone>
                    <div class="boxId fw-bold">
                        <span>{{ nestbox.properties.boxId }}</span>
                        <span class="ms-1">{{ nestbox.properties.orientation }}</span>
                        <repair-icon :fid="nestbox.properties.fid" :repairLevel="nestbox.repairLevel"></repair-icon>
                    </div>
                </record-info>
                <div v-else>
                    <nestbox-altitute-zone :nestbox="nestbox.properties"></nestbox-altitute-zone>
                    <div class="fw-bold">
                        <span>{{ nestbox.properties.boxId }}</span>
                        <span class="ms-1">{{ nestbox.properties.orientation }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import recordInfo from '@/components/record/recordInfoForBox.vue';
import nestboxAltituteZone from '@/components/nestbox/nestboxAltituteZone.vue';
import repairIcon from '@/components/nestbox/repairIcon.vue';

const props = defineProps({
    nestbox: {},
    showBrief: false
});
</script>

<style scoped>
.card-body {
    padding: 0;
}

.boxId {
    font-size: 1.08rem;
}
</style>