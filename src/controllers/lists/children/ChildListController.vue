<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <childList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import childList from 'src/views/lists/children/ChildList.vue'

export default {
    name: 'Child-list-controller',
    components: {
        childList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
