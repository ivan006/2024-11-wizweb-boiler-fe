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
          show: [
            'grid',
            'calendar',
          ],
          default: 'calendar'
        }"
      :allowedFilters="[
          'child_id',
          'school_id',
        ]"
  />

</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import Attendance from 'src/models/orm-api/Attendance'
import moment from 'moment';
import Helpers from "src/models/helpers/Helpers";

export default {
  name: 'Attendance-list',
  components: {
      SuperTable,
  },

  props: {
      parentKeyValuePair: {
          type: Object,
          default: () => ({})
      },
      colWidth: {
          type: Number,
          default: () => {
            return 3
          }
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
          // {
          //   width: 12,
          //   dataPoint: {
          //     type: "component",
          //     componentPath: () => import('./EventImage.vue'),
          //     label: "",
          //     hideLabel: true,
          //   },
          // },
          {
            width: 12,
            class: "q-pa-md q-col-gutter-sm",
            cols: [

              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${item.event.name}`,
                  label: "",
                  tag: "div",
                  class: "text-h6",
                  hideLabel: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.event.start_datetime, item.event.end_datetime).comingUpHint}`,
                  label: "Count Down",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.event.start_datetime, item.event.end_datetime).range}`,
                  label: "Date",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.event.start_datetime, item.event.end_datetime).duration}`,
                  label: "Duration",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  field: "event",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  field: "child",
                  xOrientation: true,
                },
              },
              // {
              //   width: 12,
              //   dataPoint: {
              //     label: "School",
              //     field: "school",
              //     xOrientation: true,
              //   },
              // },
              // {
              //   width: 12,
              //   dataPoint: {
              //     type: "component",
              //     componentPath: () => import('./EventButtonAttend.vue'),
              //     label: "",
              //     class: "text-right ",
              //     hideLabel: true,
              //   },
              // },
              {
                width: 12,
                dataPoint: {
                  hideLabel: true,
                  field: "actions",
                },
              },
            ]
          },
        ],
      }
    }
  },

  computed: {
      superTableModel() {
          return Attendance
      },
  },
  methods: {
    openRecord(pVal, item, router) {
        router.push({
            name: '/lists/attendances/:rId/:rName',
            params: {
                rId: pVal,
                rName: pVal,
            },
        })
    },

    formatCasualTime(start, end) {
      return Helpers.formatCasualTime(start, end)
    }


  },

}
</script>
