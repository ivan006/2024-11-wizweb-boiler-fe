<template>

    <SuperTable
        :showMap="true"
        :model="superTableModel"
        @clickRow="openRecord"
        :displayMapField="false"
        :parentKeyValuePair="parentKeyValuePair"
        :fetchFlags="fetchFlags"
        :templateListGrid="templateListGrid"
        :templateListCalendar="templateListCalendar"
        :viewAs="{
          show: [
            'grid',
            'calendar',
            'map',
          ],
          default: 'grid'
        }"
        :allowedFilters="[
          // 'start_datetime',
          'start_datetime',
          'school_id',
        ]"
        :noBorder="noBorder"
    />



</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import Event from 'src/models/orm-api/Event'
import moment from 'moment';
import Helpers from "src/models/helpers/Helpers";

export default {
    name: 'Event-list',
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
            return Event
        },
    },
  methods: {
    openRecord(pVal, item, router) {
        router.push({
            name: '/lists/events/:rId/:rName',
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
  data() {
    return {
      templateListGrid: {
        cols: [
          {
            width: 12,
            dataPoint: {
              type: "component",
              componentPath: () => import('./EventImage.vue'),
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
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).comingUpHint}`,
                  label: "Count Down",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).range}`,
                  label: "Date",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).duration}`,
                  label: "Duration",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  label: "School",
                  field: "school",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "component",
                  // componentPath: () => import('./EventImage.vue'),
                  componentPath: () => import('./EventButtonAttend.vue'),
                  label: "",
                  class: "text-right ",
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
            ]
          },
        ],
      },
      templateListCalendar: {
        cols: [
          {
            width: 12,
            class: "q-pa-sm q-col-gutter-xs text-caption",
            cols: [
              {
                width: 12,
                class: "text-caption",
                dataPoint: {
                  type: "function",
                  function: (item) => `${item.name}`,
                  label: "",
                  tag: "div",
                  class: "text-subtitle2",
                  hideLabel: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).comingUpHint}`,
                  label: "Count Down",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).range}`,
                  label: "Date",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).duration}`,
                  label: "Duration",
                  xOrientation: true,
                },
              },
              {
                width: 12,
                dataPoint: {
                  type: "function",
                  function: (item) => item.school.name,
                  label: "School",
                  xOrientation: true,
                },
              },
            ]
          },
        ],
      }
    }
  },
}
</script>
