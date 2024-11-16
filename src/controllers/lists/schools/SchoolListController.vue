<template>
    <div>
      <!--<q-card class="q-pa-md q-mt-md">-->
      <!--</q-card>-->
      <schoolList
        :parentKeyValuePair="parentKeyValuePair"
        :fetchFlags="fetchFlags"
      />
    </div>
</template>

<script>
import schoolList from 'src/views/lists/schools/SchoolList.vue'

export default {
    name: 'School-list-controller',
    components: {
        schoolList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
