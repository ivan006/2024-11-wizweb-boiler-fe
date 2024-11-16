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
import SchoolFamilyEnrollment from 'src/models/orm-api/SchoolFamilyEnrollment'

export default {
  name: 'SchoolFamilyEnrollment-list',
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
                  field: "family",
                },
              },
              {
                width: 12,
                dataPoint: {
                  field: "school",
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
          return SchoolFamilyEnrollment
      },
  },
  methods: {
      openRecord(pVal, item, router) {
          router.push({
              name: '/lists/school-family-enrollments/:rId/:rName',
              params: {
                  rId: pVal,
                  rName: pVal,
              },
          })
      },
  },
}
</script>
