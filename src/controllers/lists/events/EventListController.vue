<template>
    <div>
      <eventList
        :parentKeyValuePair="parentKeyValuePair"
        :fetchFlags="fetchFlags"
      />
      <!--<q-card class="q-pa-md q-mt-md">-->
      <!--</q-card>-->
    </div>
</template>

<script>
import eventList from 'src/views/lists/events/EventList.vue'

export default {
    name: 'Event-list-controller',
    components: {
        eventList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
