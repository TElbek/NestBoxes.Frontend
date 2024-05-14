<template>
    <vue-title></vue-title>
    <button class="btn btn-sm btn-secondary" @click="getExport()">Eksporter Status</button>     
</template>

<script setup>
import api from '@/api';
import vueTitle from '@/components/main/title.vue'

function getExport() {
    api.get('nestbox/records/download', {responseType: 'blob' }).then(res => {
        // create file link in browser's memory
        const href = URL.createObjectURL(res.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Redekasse Status - ' + formatDate(new Date()) + '.xlsx');
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
}

function formatDate(date) {
    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(date).toLocaleDateString('da-DK', options);
}
</script>