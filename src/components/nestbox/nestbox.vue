<template>
    <div class="card p-2 shadow-sm" :class="[!props.showBrief ? 'card-height' : '']">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.properties.fid}`">
                <record-info :recordInfo="nestbox.records[0]" v-if="!showBrief">
                    <nestbox-altitute-zone :nestbox="nestbox.properties"></nestbox-altitute-zone>
                    <div class="h6 fw-bold">
                        <span>{{ nestbox.properties.boxId }}</span>
                        <span>&nbsp;{{ nestbox.properties.orientation }}</span>
                    </div>            
                </record-info>
                <div v-else>
                    <nestbox-altitute-zone :nestbox="nestbox.properties"></nestbox-altitute-zone>
                    <div class="h6 fw-bold">
                        <span>{{ nestbox.properties.boxId }}</span>
                        <span>&nbsp;{{ nestbox.properties.orientation }}</span>
                    </div>            
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import recordInfo from '@/components/record/recordInfoForBox.vue';
import nestboxAltituteZone from '@/components/nestbox/nestboxAltituteZone.vue';

const props = defineProps({
    nestbox: {},
    showBrief: false
});
</script>

<style scoped>
.card-body {
    padding: 0;
}

a {
    text-decoration: none;
    color: black;
}

.h6 {
    margin-bottom: 0.2rem;
}

.card-height {
    height: 85px;
}
</style>