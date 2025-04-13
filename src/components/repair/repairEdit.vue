<template>
    <div v-if="state.hasData">
        <form>
            <div class="row mb-2">
                <div class="col-6">
                    <label for="boxId" class="form-label">Kasse</label>
                    <select class="form-select" v-model="state.repair.fid" autocomplete :disabled="isEditRoute"
                        v-if="isAddRoute" v-focus>
                        <option v-for="box in state.nestBoxList" :value="box.fid">
                            {{ box.boxId }}
                        </option>
                    </select>
                    <div v-else>
                        <input class="form-control" disabled v-model="state.nestBox.properties.boxId">
                    </div>
                </div>
                <div class="col-6">
                    <label for="repairType" class="form-label">Reparations Type</label>
                    <select class="form-select" v-model="state.repair.repairType.repairTypeId" id="repairType">
                        <option v-for="repairType in state.repairTypes" :value="repairType.repairTypeId">
                            {{ repairType.repairTypeName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="comment" class="form-label">Kommentar</label>
                    <textarea rows="4" id="comment" v-model="state.repair.comment" class="form-control">
                    </textarea>
                </div>
            </div>
            <div class="row mb-3" v-if="isEditRoute">
                <div class="col-auto">
                    <div class="border rounded ps-1 pe-2">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="state.repair.isRepaired"
                                id="status">
                            <label class="form-check-label" for="status">Udført</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="d-flex gap-2">
            <button class="btn btn-sm btn-success" type="button" @click="save" :disabled="!canDoSave">Gem</button>
            <button class="btn btn-sm btn-dark" type="button" @click="cancel">Fortryd</button>
        </div>
    </div>
</template>

<script setup>
import api from '@/api';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, computed } from 'vue';

const route = useRoute();
const router = useRouter();

const isAddRoute = computed(() => { return route.name == 'repairAdd' });
const isEditRoute = computed(() => { return route.name == 'repairEdit' });

const state = reactive({
    nestBoxList: [],
    repairTypes: [],
    repair: {},
    nestBox: { properties: { boxId: 0 } },
    hasData: false,
});

const vFocus = {
    mounted: (el) => el.focus()
}

const canDoSave = computed(() => {
    return state.repair.fid != undefined &&
        state.repair.comment != undefined &&
        state.repair.repairType.repairTypeId != undefined;
});

onMounted(() => {
    getRepairTypes();
    if (isAddRoute.value) {
        getNestBoxList();
        getNewRepair();
    }
    else {
        getRepair();
    }
});

function getNestBoxList() {
    api.get('repair/candidates')
        .then(res => {
            state.nestBoxList = res.data.sort((a, b) => Number(a.boxId) - Number(b.boxId));
        })
};

function getRepairTypes() {
    api.get('repair/type')
        .then(res => {
            state.repairTypes = res.data;
        })
};

function getNewRepair() {
    api.get('repair/new')
        .then(res => {
            state.repair = res.data;
            state.hasData = true;
        });
}

function getRepair() {
    api.get('repair/' + route.params.id)
        .then(res => {
            state.repair = res.data;
            state.hasData = true;
            getNestBox();
        });
}

function getNestBox() {
    api.get('/nestbox/feature/' + state.repair.fid)
        .then(res => {
            state.nestBox = res.data;
        });
}

function save() {
    api.post('repair/update', state.repair)
        .then(function (response) {
            goToList();
        });
}

function cancel() {
    goToList();
}

function goToList() {
    router.replace({ name: 'repair' });
}
</script>