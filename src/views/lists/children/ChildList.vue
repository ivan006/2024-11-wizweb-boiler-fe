<template>

  <SuperTable
      :showMap="true"
      :model="superTableModel"
      @clickRow="openRecord"
      :displayMapField="false"
      :parentKeyValuePair="parentKeyValuePair"
      :fetchFlags="fetchFlags"
      :templateListGrid="templateListGrid"
      :viewAs="{
          show: [],
          default: 'grid'
        }"
      :allowedFilters="[]"
  />

</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import Child from 'src/models/orm-api/Child'

export default {
  name: 'Child-list',
  components: {
      SuperTable,
  },

  props: {
    colWidth: {
      type: Number,
      default: () => {
        return 3
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

  data() {
    return {
      templateListGrid: {
        colWidth: this.colWidth,
        cols: [
          {
            width: 12,
            class: "q-pa-md q-col-gutter-sm",
            cols: [
              {
                width: 12,
                dataPoint: {
                  field: "name",
                  tag: "div",
                  class: "text-h6",
                  hideLabel: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  hideLabel: true,
                  field: "actions",
                },
              },
              // {
              //   width: 3,
              //   dataPoint: {
              //     type: "function",
              //     function: (item) => `${item.email}`,
              //     label: "Email",
              //     // xOrientation: true,
              //   },
              // },
            ]
          },
        ],
      }
    }
  },
  computed: {
      superTableModel() {
          return Child
      },
  },
  methods: {
      openRecord(pVal, item, router) {
          router.push({
              name: '/lists/children/:rId/:rName',
              params: {
                  rId: pVal,
                  rName: pVal,
              },
          })
      },
  },
}
</script>
