<template>

    <div>
        <q-card class="q-pa-md q-mt-md">
            <jobList
                :parentKeyValuePair="parentKeyValuePair"
                :fetchFlags="fetchFlags"
            />
        </q-card>
    </div>
</template>

<script>
import jobList from 'src/views/lists/jobs/JobList.vue'

export default {
    name: 'Job-list-controller',
    components: {
        jobList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>