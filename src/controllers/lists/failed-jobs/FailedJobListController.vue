<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <failedJobList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import failedJobList from 'src/views/lists/failed-jobs/FailedJobList.vue'

export default {
    name: 'FailedJob-list-controller',
    components: {
        failedJobList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
