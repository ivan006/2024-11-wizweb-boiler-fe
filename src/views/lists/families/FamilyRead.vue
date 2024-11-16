<template>

  <SuperRecord
    :model="superRecordModel"
    :id="+$route.params.rId"
    :displayMapField="true"
    @initialLoadHappened="$emit('initialLoadHappened')"
    :configsCollection="configsCollection"
    :allowedTabs="allowedTabs"
  >
  </SuperRecord>
</template>

<script>
import { SuperRecord } from 'quicklists-vue-orm-ui'
import Family from 'src/models/orm-api/Family'

export default {
  name: 'Family-read',
  components: {SuperRecord},
  props: {
    allowedTabs: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  computed: {
    superRecordModel() {
      return Family
    },
  },
  data() {
    return {

      configsCollection: {
        Attendance: {
          templateListCalendar: {
            cols: [
              {
                width: 12,
                class: "q-pa-sm q-col-gutter-xs text-caption",
                cols: [
                  {
                    width: 12,
                    dataPoint: {
                      type: "function",
                      function: (item) => `${item.event.name}`,
                      label: "Name",
                    },
                  },
                  {
                    width: 12,
                    dataPoint: {
                      type: "function",
                      function: (item) => `Attendance`,
                      label: "Type",
                    },
                  },
                ],
              },
            ]
          },
        },
        PrivateEvent: {
          templateListCalendar: {
            cols: [
              {
                width: 12,
                class: "q-pa-sm q-col-gutter-xs text-caption",
                cols: [
                  {
                    width: 12,
                    dataPoint: {field: 'name'},
                  },
                  {
                    width: 12,
                    dataPoint: {
                      type: "function",
                      function: (item) => `Private Event`,
                      label: "Type",
                    },
                  },
                ],
              },
            ]
          },
        },
      },
    }
  }
}
</script>

<style scoped></style>
