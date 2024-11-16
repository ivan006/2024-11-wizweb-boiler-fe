<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <familyList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import familyList from 'src/views/lists/families/FamilyList.vue'

export default {
    name: 'Family-list-controller',
    components: {
        familyList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
