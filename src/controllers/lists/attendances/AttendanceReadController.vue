<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <attendanceRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import attendanceRead from 'src/views/lists/attendances/AttendanceRead.vue'

export default {
    name: 'Attendance-read-controller',
    components: {
        attendanceRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
