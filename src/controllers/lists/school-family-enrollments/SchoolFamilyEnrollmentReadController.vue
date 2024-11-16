<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
        <schoolFamilyEnrollmentRead :id="id" />
    </q-card>
    </div>
</template>

<script>
import schoolFamilyEnrollmentRead from 'src/views/lists/school-family-enrollments/SchoolFamilyEnrollmentRead.vue'

export default {
    name: 'SchoolFamilyEnrollment-read-controller',
    components: {
        schoolFamilyEnrollmentRead,
    },

    data() {
        return {
            id: +this.$route.params.rId
        }
    },
}
</script>
