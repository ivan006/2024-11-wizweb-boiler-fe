<template>

    <div>
        <q-card class="q-pa-md q-mt-md">
            <familyLinkList
                :parentKeyValuePair="parentKeyValuePair"
                :fetchFlags="fetchFlags"
            />
        </q-card>
    </div>
</template>

<script>
import familyLinkList from 'src/views/lists/family-links/FamilyLinkList.vue'

export default {
    name: 'FamilyLink-list-controller',
    components: {
        familyLinkList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
