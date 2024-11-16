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
import Tag from 'src/models/orm-api/Tag'

export default {
    name: 'Tag-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return Tag
        },
    },
}
</script>

<style scoped></style>
