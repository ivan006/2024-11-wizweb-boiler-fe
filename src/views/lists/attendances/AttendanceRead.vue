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
import Attendance from 'src/models/orm-api/Attendance'

export default {
    name: 'Attendance-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return Attendance
        },
    },
}
</script>

<style scoped></style>
