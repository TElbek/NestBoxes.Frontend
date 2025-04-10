<template>
    <slot class="mr-1"></slot>
    <div>
        <div v-if="hasSpecies" class="h6 fw-normal">{{ props.recordInfo.nesting.species }}</div>
        <div class="fs-small text-nowrap">
            <span>{{ formatDate(props.recordInfo.recorddate) }}</span>
            <template v-if="hasValue(props.recordInfo.nesting.eggs) || hasValue(props.recordInfo.nesting.chicks)">
                <span>&nbsp;-&nbsp;</span>
                <span v-if="hasValue(props.recordInfo.nesting.eggs)">&nbsp;{{ props.recordInfo.nesting.eggs }} Æg</span>
                <span v-if="hasValue(props.recordInfo.nesting.chicks)">&nbsp;{{ props.recordInfo.nesting.chicks}} Unger</span>
            </template>
            <span class="float-end fst-italic">&nbsp;{{ props.recordInfo.status.statusName }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate} from '@/js/dateandtime.js';

const hasSpecies = computed(() => {
    return props.recordInfo.nesting.species != null &&
        props.recordInfo.nesting.species.length > 0;
});

const props = defineProps({
    recordInfo: {},
});

function hasValue(value) {
    return value != null && value > 0;
}
</script>

<style scoped>
.h6 {
    margin-bottom: 0.1rem;
}
</style>