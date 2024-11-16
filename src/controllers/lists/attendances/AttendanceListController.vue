<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <attendanceList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import attendanceList from 'src/views/lists/attendances/AttendanceList.vue'

export default {
    name: 'Attendance-list-controller',
    components: {
        attendanceList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
