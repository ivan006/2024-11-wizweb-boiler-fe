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
import FamilyLink from 'src/models/orm-api/FamilyLink'

export default {
    name: 'FamilyLink-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return FamilyLink
        },
    },
}
</script>

<style scoped></style>
