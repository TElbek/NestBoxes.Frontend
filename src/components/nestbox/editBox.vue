<template>
    <div v-if="state.hasData">
        <div class="h4">
            Redekasse {{ route.params.boxId }}
        </div>
        <form>
            <div class="mb-3">
                <label for="species-input" class="form-check-label">Art</label>
                <input class="form-control" type="text" id="species-input" v-model="state.record.nesting.species" />
            </div>
            <div class="mb-3">
                <label for="status-select" class="form-check-label">Status</label>
                <select class="form-select" id="status-select" v-model="state.record.status">
                    <option v-for="option in state.statusList" :value="option">
                        {{ option.statusName }}
                    </option>
                </select>
            </div>
            <div class="row">
                <div class="col">
                    <label for="eggs-input" class="form-check-label">Æg</label>
                    <input class="form-control" type="number" id="eggs-input" v-model="state.record.nesting.eggs" />
                </div>
                <div class="col">
                    <label for="chicks-input" class="form-check-label">Unger</label>
                    <input class="form-control" type="number" id="chicks-input" v-model="state.record.nesting.chicks" />
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
import { onMounted, reactive, computed } from 'vue';
import api from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
    hasData: false,
    statusList: [],
    record: {}
});

function getNestBox() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/record/' + route.params.boxId + "/new")
        .then(res => {
            state.record = res.data;
            state.hasData = true;
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
    getStatusList();
});
</script>

<style scoped>
.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, 80px);
    gap: 10px;
}
</style>