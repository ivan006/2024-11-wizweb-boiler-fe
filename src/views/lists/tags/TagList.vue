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
import Tag from 'src/models/orm-api/Tag'

export default {
    name: 'Tag-list',
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
            return Tag
        },
    },
    methods: {
        openRecord(pVal, item, router) {
            router.push({
                name: '/lists/tags/:rId/:rName',
                params: {
                    rId: pVal,
                    rName: pVal,
                },
            })
        },
    },
}
</script>
