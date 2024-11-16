<template>

  <SuperRecord
      :model="superRecordModel"
      :id="+$route.params.rId"
      :displayMapField="true"
      @initialLoadHappened="$emit('initialLoadHappened')"
      :templateOverview="templateListGrid"
      :allowedFilters="[]"
      :allowedTabs="['overview']"
  >
  </SuperRecord>
</template>

<script>
import { SuperRecord } from 'quicklists-vue-orm-ui'
import School from 'src/models/orm-api/School'

export default {
  name: 'School-read',
  components: { SuperRecord },
  data() {
    return {
      templateListGrid: {
        cols: [
          {
            width: 3,
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
      superRecordModel() {
          return School
      },
  },
}
</script>

<style scoped></style>
