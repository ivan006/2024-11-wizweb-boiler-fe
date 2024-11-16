<template>
  <div>
    <template v-if="loadingError">
      <template v-if="loadingError.response.status == 429">
        Loading error, too many requests please wait a minute and try again.
      </template>
      <template v-else>
        Loading error.
      </template>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  loadingError: {
    type: Boolean,
    default: false,
  },
});

</script>
