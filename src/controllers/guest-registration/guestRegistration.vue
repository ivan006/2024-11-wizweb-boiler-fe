<template>
  <div class="q-pa-md container-md guestRegistration">
    <!--<q-card style="width: unset;">-->


    <!--  <q-card-section>-->
    <!--    <div class="text-h6">Multi-Step Form</div>-->
    <!--  </q-card-section>-->
    <!--  <q-separator />-->
    <!--  <q-card-section  class="q-pa-none">-->

        <template v-if="!session">
          <!--<step0-register @next="checkToken()" />-->
          ddd
        </template>

    <!--  </q-card-section>-->
    <!--</q-card>-->
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
// import VueCookies from 'vue-cookies'
// import Step0Register from "pages/guest-registration/step0Register.vue";
import VueCookies from 'vue-cookies'
// import Session from 'src/models/Session';
const step = ref(1);

// const session = computed(() => {
//   // return Session.query().first();
//   return VueCookies.get('VITE_AUTH');
// });



const session = ref(VueCookies.get('VITE_AUTH'));


const checkToken = () => {
  session.value = VueCookies.get('VITE_AUTH');
}


</script>

<style lang="scss">

#q-app input[type=text] {
  //padding: unset !important;

  //line-height: 24px;
  padding-top: 24px !important;
  padding-bottom: 8px !important;;
}


.guestRegistration {
  .q-stepper__step-inner {
    padding: 5px;
  }
}

</style>
