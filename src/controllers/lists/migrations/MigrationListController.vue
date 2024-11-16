<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <migrationList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import migrationList from 'src/views/lists/migrations/MigrationList.vue'

export default {
    name: 'Migration-list-controller',
    components: {
        migrationList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
