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
import Migration from 'src/models/orm-api/Migration'

export default {
    name: 'Migration-list',
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
            return Migration
        },
    },
    methods: {
        openRecord(pVal, item, router) {
            router.push({
                name: '/lists/migrations/:rId/:rName',
                params: {
                    rId: pVal,
                    rName: pVal,
                },
            })
        },
    },
}
</script>
