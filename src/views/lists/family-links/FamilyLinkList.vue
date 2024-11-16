<template>
    <SuperTable
        :showMap="true"
        :model="superTableModel"
        @clickRow="openRecord"
        :displayMapField="false"
        :parentKeyValuePair="parentKeyValuePair"
        :fetchFlags="fetchFlags"
        :templateListGrid="templateListGrid"
        :templateListTable="templateListTable"
        :viewAs="{
          show: [],
          default: 'table'
        }"
        :allowedFilters="[]"
        noBorder
    />
</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import FamilyLink from 'src/models/orm-api/FamilyLink'

export default {
  name: 'FamilyLink-list',
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
                  field: "user",
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
      },
      templateListTable: [
        // {
        //   type: "function",
        //   function: (item) => `${item.dayNumber}`,
        //   label: "Day",
        // },
        // {
        //   type: "function",
        //   function: (item) => `${item.date} `,
        //   label: "Date",
        // },
        // {
        //   type: "function",
        //   function: (item) => `${item.title} `,
        //   label: "Title",
        // },
        {
          field: "family",
        },
        {
          field: "user",
        },
        {
          hideLabel: true,
          field: "actions",
        },

      ],
    }
  },
  computed: {
      superTableModel() {
          return FamilyLink
      },
  },
  methods: {
      openRecord(pVal, item, router) {
          router.push({
              name: '/lists/family-links/:rId/:rName',
              params: {
                  rId: pVal,
                  rName: pVal,
              },
          })
      },
  },
}
</script>
