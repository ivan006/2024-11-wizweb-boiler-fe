<template>
  <div>
    <SuperTable
      @click.stop
      :showMap="true"
      :model="model"
      :displayMapField="false"
      :parentKeyValuePair="{
        parentFKey: 'event_id',
        parentFVal: +item.id,
        parentItem: item,
      }"
      justCreateButton
      createButtonText="Attend"
    />
    <!--:fetchFlags="fetchFlags"-->
  </div>
</template>

<script>
import { SuperTable } from 'quicklists-vue-orm-ui'
import Attendance from 'src/models/orm-api/Attendance'
export default {
  name: "EventButtonAttend",
  components: {
    SuperTable,
  },
  data(){
    return {
      model: Attendance
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    superOptions: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style scoped>

</style>
