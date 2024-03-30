<template>
    <div v-if="state.hasData">
        <div class="h4" v-if="state.hasBox">
            Redekasse {{ state.nestBox.properties.boxId }} - {{formatDate(state.record.datetime) }}
        </div>
        <form>
            <div class="mb-3">
                <label for="species-input" class="form-check-label">Art</label>
                <input autofocus class="form-control" type="text" id="species-input" v-model="state.record.nesting.species" />
            </div>
            <div class="mb-3">
                <label for="status-select" class="form-check-label">Status</label>
                <select class="form-select" id="status-select" v-model="state.record.status">
                    <option v-for="option in state.statusList" :value="option">
                        {{ option.statusName }}
                    </option>
                </select>
            </div>
            <div class="row  mb-3">
                <div class="col">
                    <label for="eggs-input" class="form-check-label">Æg</label>
                    <input class="form-control" type="number" id="eggs-input" v-model="state.record.nesting.eggs" />
                </div>
                <div class="col">
                    <label for="chicks-input" class="form-check-label">Unger</label>
                    <input class="form-control" type="number" id="chicks-input" v-model="state.record.nesting.chicks" />
                </div>
            </div>

            <div class="row  mb-3">
                <div class="col">
                    <label for="ring-input-from" class="form-check-label">Ringe - fra</label>
                    <input class="form-control" type="number" id="ring-input-from" v-model="state.record.rings[0]" />
                </div>
                <div class="col">
                    <label for="ring-input-to" class="form-check-label">Ringe - til</label>
                    <input class="form-control" type="number" id="ring-input-to" v-model="state.record.rings[1]" />
                </div>
            </div>

            <div class="mb-3">
                <label for="comment-text" class="form-check-label">Kommentarer</label>
                <textarea rows="2" class="form-control" id="comment-text" v-model="state.record.comment" />
            </div>
        </form>
        <div class="btn-grid">
            <button class="btn btn-sm btn-success" type="button" @click="save">Gem</button>
            <button class="btn btn-sm btn-dark" type="button" @click="cancel">Fortryd</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue';
import api from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
    hasData: false,
    hasBox: false,
    statusList: [],
    record: {},
    nestBox: {}
});

function getEmptyRecord() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/record/' + route.params.fid + "/new")
        .then(res => {
            state.record = res.data;
            state.hasData = true;
        })
}

function getNestBox() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/feature/' + route.params.fid)
        .then(res => {
            state.nestBox = res.data;
            state.hasBox = true;
        })
}

function getStatusList() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/status')
        .then(res => {
            state.statusList = res.data;
            state.hasData = true;
        })
}

function save() {
    api.post(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/record/add', state.record)
        .then(res => { router.go(-1); });
}

function cancel() {
    router.go(-1);
}

onMounted(() => {
    getNestBox();
    getEmptyRecord();
    getStatusList();
});

function formatDate(date) {
    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(date).toLocaleDateString('da-dk', options);
}
</script>

<style scoped>
.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, 80px);
    gap: 10px;
}
</style>