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
import PasswordResetToken from 'src/models/orm-api/PasswordResetToken'

export default {
    name: 'PasswordResetToken-read',
    components: { SuperRecord },
    computed: {
        superRecordModel() {
            return PasswordResetToken
        },
    },
}
</script>

<style scoped></style>
