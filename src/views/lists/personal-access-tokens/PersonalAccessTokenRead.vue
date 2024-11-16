<template>

            <SuperRecord
                :model="superRecordModel"
                :id="+$route.params.rId"
                :displayMapField="true"
                @initialLoadHappened="$emit('initialLoadHappened')"
            >
            </SuperRecord>
</template>

<script>
import { SuperRecord } from 'quicklists-vue-orm-ui'
import PersonalAccessToken from 'src/models/orm-api/PersonalAccessToken'

export default {
    name: 'PersonalAccessToken-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return PersonalAccessToken
        },
    },
}
</script>

<style scoped></style>
