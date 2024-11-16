<template>
    <div>
        <q-card class="q-pa-md q-mt-md">
        <personalAccessTokenList
            :parentKeyValuePair="parentKeyValuePair"
            :fetchFlags="fetchFlags"
        />
    </q-card>
    </div>
</template>

<script>
import personalAccessTokenList from 'src/views/lists/personal-access-tokens/PersonalAccessTokenList.vue'

export default {
    name: 'PersonalAccessToken-list-controller',
    components: {
        personalAccessTokenList,
    },

    data() {
        return {
            parentKeyValuePair: {},
            fetchFlags: {}
        }
    },
}
</script>
