<template>
    <div v-if="state.hasData">
        <div class="h4" v-if="state.hasBox">
            Kasse {{ state.nestBox.properties.boxId }}&nbsp;{{ state.nestBox.properties.orientation }}
        </div>
        <form>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="datepicker" class="form-check-label">Dato</label>
                        <input id="datepicker" type="date" v-model="state.record.recorddate" class="form-control"
                            lang="da-DK" v-focus />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <label for="status-select" class="form-check-label">Status</label>
                    <select class="form-select" id="status-select" v-model="state.record.status">
                        <option v-for="option in state.statusList" :value="option">
                            {{ option.statusName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="species-input" class="form-check-label">Art</label>
                <select class="form-select" id="species-input" v-model="state.record.nesting.species">
                    <option v-for="art in getSpeciesSortedByLocalName()">
                        {{ art.localName }}
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
                    <input class="form-control" type="text" id="ring-input-from" v-model="state.record.rings[0]" />
                </div>
                <div class="col">
                    <label for="ring-input-to" class="form-check-label">Ringe - til</label>
                    <input class="form-control" type="text" id="ring-input-to" v-model="state.record.rings[1]" />
                </div>
            </div>

            <div class="mb-3">
                <label for="comment-text" class="form-check-label">Kommentarer</label>
                <textarea rows="2" class="form-control" id="comment-text" v-model="state.record.comment" />
            </div>
        </form>
        <div class="btn-grid">
            <button class="btn btn-sm btn-success" type="button" @click="save" :disabled="!canDoSave">Gem</button>
            <button class="btn btn-sm btn-dark" type="button" @click="cancel">Fortryd</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { onMounted, reactive, computed } from 'vue';
import api from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
    hasData: false,
    hasBox: false,
    statusList: [],
    record: {},
    nestBox: {},
    speciesList: []
});

const canDoSave = computed(() => {
    return state.record.status.statusName != null;
});

function getEmptyRecord() {
    api.get('nestbox/record/' + route.params.fid + "/new")
        .then(res => {
            state.record = res.data;
            state.hasData = true;
        })
}

function getNestBox() {
    api.get('nestbox/feature/' + route.params.fid)
        .then(res => {
            state.nestBox = res.data;
            state.hasBox = true;
        })
}

function getSpeciesList() {
    api.get('nestbox/species')
        .then(res => {
            state.speciesList = res.data;
        })
}

function getStatusList() {
    api.get('nestbox/status')
        .then(res => {
            state.statusList = res.data;
        })
}

function save() {
    api.post('nestbox/record/add', state.record)
        .then(res => { router.replace("/"); });
}

function getSpeciesSortedByLocalName() {
    return state.speciesList.sort((a, b) => a.localName.localeCompare(b.localName));
}

function cancel() {
    router.replace("/");
}

onMounted(() => {
    getNestBox();
    getEmptyRecord();
    getStatusList();
    getSpeciesList();
});

function formatDate(date) {
    var options = {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit'
    }
    return new Date(date).toLocaleDateString('en-GB', options);
}
</script>

<style scoped>
.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, 80px);
    gap: 10px;
}
</style>