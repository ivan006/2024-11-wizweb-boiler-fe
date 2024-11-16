<template>

  <SuperRecord
      :model="superRecordModel"
      :id="+$route.params.rId"
      :displayMapField="true"
      @initialLoadHappened="$emit('initialLoadHappened')"
      :templateOverview="templateListGrid"
      :allowedTabs="['overview']"
  >
  </SuperRecord>
</template>

<script>
import { SuperRecord } from 'quicklists-vue-orm-ui'
import Event from 'src/models/orm-api/Event'
import moment from 'moment';
import Helpers from "src/models/helpers/Helpers";

export default {
  name: 'Event-read',
  components: { SuperRecord },
  computed: {
      superRecordModel() {
          return Event
      },
  },
  methods: {
    formatCasualTime(start, end) {
      return Helpers.formatCasualTime(start, end)
    }
  },
  data() {
    return {
      templateListGrid: {
        cols: [
          {
            width: 3,
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
                width: 3,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).comingUpHint}`,
                  label: "Count Down",
                  xOrientation: true,
                },
              },
              {
                width: 3,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).range}`,
                  label: "Date",
                  xOrientation: true,
                },
              },
              {
                width: 3,
                dataPoint: {
                  type: "function",
                  function: (item) => `${this.formatCasualTime(item.start_datetime, item.end_datetime).duration}`,
                  label: "Duration",
                  xOrientation: true,
                },
              },
              {
                width: 3,
                dataPoint: {
                  label: "School",
                  field: "school",
                  xOrientation: true,
                },
              },
              {
                width: 3,
                dataPoint: {
                  style: "text-align: left;",
                  type: "component",
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
      }
    }
  },
}
</script>

<style scoped></style>
