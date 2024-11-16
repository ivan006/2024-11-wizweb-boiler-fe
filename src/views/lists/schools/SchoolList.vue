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
          default: 'table'
        }"
      :allowedFilters="[]"
      :noBorder="noBorder"
  />

</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import School from 'src/models/orm-api/School'

export default {
  name: 'School-list',
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
            dataPoint: {
              type: "component",
              componentPath: () => import('../events/EventImage.vue'),
              label: "",
              hideLabel: true,
            },
          },
          {
            width: 12,
            class: "q-pa-md q-col-gutter-sm",
            cols: [

              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${item.name}`,
                  label: "",
                  tag: "div",
                  class: "text-h6",
                  hideLabel: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  hideLabel: true,
                  field: "about_us",
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
          return School
      },
  },
  methods: {
      openRecord(pVal, item, router) {
          router.push({
              name: '/lists/schools/:rId/:rName',
              params: {
                  rId: pVal,
                  rName: pVal,
              },
          })
      },
  },
}
</script>
