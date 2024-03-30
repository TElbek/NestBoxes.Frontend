<template>
    <div class="card p-2 shadow-sm">
        <div class="card-body">
            <router-link :to="`/addRecord/${nestbox.fid}`">
                <record-info :fid="nestbox.fid" v-if="!showBrief">
                    <div class="h6 float-end">
                        <span v-if="nestbox.altitude == 2">Stige</span>                        
                        <span v-if="nestbox.altitude == 2">&nbsp;-&nbsp;</span>
                        <span>Zone: {{nestbox.zone }}</span>
                    </div>
                    <div class="h6">{{ nestbox.boxId }}</div>
                </record-info>
                <div v-else class="h6">{{ nestbox.boxId }}</div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import recordInfo from '@/components/record/recordInfoForBox.vue';

const props = defineProps({
    nestbox: {},
    showBrief : false
});
</script>

<style scoped>
.card-body {
    padding: 0;
}

a {
    text-decoration: none;
    color: black;
    font-size: 0.9rem;
}
</style>