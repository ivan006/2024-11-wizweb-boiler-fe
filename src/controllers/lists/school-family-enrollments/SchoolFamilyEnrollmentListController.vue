<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <schoolFamilyEnrollmentList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import schoolFamilyEnrollmentList from 'src/views/lists/school-family-enrollments/SchoolFamilyEnrollmentList.vue'

export default {
    name: 'SchoolFamilyEnrollment-list-controller',
    components: {
        schoolFamilyEnrollmentList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
