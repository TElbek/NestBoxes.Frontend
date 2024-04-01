<template>
    <div class="card p-2 shadow-sm">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.fid}`">
                <record-info :fid="nestbox.fid" v-if="!showBrief">
                    <nestbox-altitute-zone :nestbox="nestbox"></nestbox-altitute-zone>
                    <div class="h6">{{ nestbox.boxId }}</div>
                </record-info>
                <div v-else>
                    <nestbox-altitute-zone :nestbox="nestbox"></nestbox-altitute-zone>
                    <div class="h6">{{ nestbox.boxId }}</div>
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
</style>