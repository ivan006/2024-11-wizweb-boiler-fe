<template>

            <SuperTable
                :showMap="true"
                :model="superTableModel"
                @clickRow="openRecord"
                :displayMapField="false"
                :parentKeyValuePair="parentKeyValuePair"
                :fetchFlags="fetchFlags"
                :noBorder="noBorder"
            />

</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import PasswordResetToken from 'src/models/orm-api/PasswordResetToken'

export default {
    name: 'PasswordResetToken-list',
    components: {
        SuperTable,
    },

    props: {
        noBorder: {
          type: Boolean,
          default: () => {
            return false
          }
        },
        parentKeyValuePair: {
            type: Object,
            default: () => ({})
        },
        fetchFlags: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        superTableModel() {
            return PasswordResetToken
        },
    },
    methods: {
        openRecord(pVal, item, router) {
            router.push({
                name: '/lists/password-reset-tokens/:rId/:rName',
                params: {
                    rId: pVal,
                    rName: pVal,
                },
            })
        },
    },
}
</script>
