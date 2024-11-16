<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-px-md q-py-lg">
      <q-card-section class="text-center">
        <img :src="env.VITE_API_CURRENT_DOMAIN+'/wp-content/themes/omni/images/GRATITUDEBLUE(2).png'" alt="Logo" style="max-width: 150px;">
        <div class="text-h6 q-mt-md">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="item.email"
            label="Email*"
            type="email"
            :error="!!errors.email"
            :error-message="errors.email"
          />
          <q-input
            filled
            v-model="item.password"
            label="Password*"
            :type="passwordTypeIsPassword ? 'password' : 'text'"
            :error="!!errors.password"
            :error-message="errors.password"
          >
            <template v-slot:append>
              <q-icon
                :name="passwordTypeIsPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="passwordTypeIsPassword = !passwordTypeIsPassword"
              />
            </template>
          </q-input>
          <div class="q-mt-md">
            <q-btn
              label="Login"
              type="submit"
              class="full-width"
              :style="{ backgroundColor: '#0d3555', color: 'white' }"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import User from 'src/models/User';
import VueCookies from 'vue-cookies'
// import Session from 'src/models/Session';
import { useRouter } from 'vue-router';
const router = useRouter();

const itemEmpty = ref({
  email: '',
  password: '',
});

const item = ref({ ...itemEmpty.value });
const errors = ref({});
const passwordTypeIsPassword = ref(true);

const session = computed(() => {
  // return Session.query().first();
  return VueCookies.get('VITE_AUTH');
});

const setFormErrors = (rawErrors = {}) => {
  for (const fieldKey in itemEmpty.value) {
    if (rawErrors[fieldKey]) {
      errors.value[fieldKey] = rawErrors[fieldKey][0];
    } else {
      errors.value[fieldKey] = null;
    }
  }
};

const onSubmit = () => {
  User.loginFromVue(item.value)
    .then((response) => {
      const sessionData = response.response.data.data;
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);

      sessionData.expireDate = expireDate.toISOString();

      VueCookies.set('VITE_AUTH', sessionData, '7d');

      setFormErrors();

      // Session.deleteAll();
      // Session.insert({
      //   data: sessionData,
      // });

      if (process.env.NODE_ENV === "development"){
        router.push({ path: 'dashboard'})
      } else {
        window.location.href = '/vue-app/#/dashboard';
        window.location.reload();
      }
    })
    .catch((error) => {
      if (error.response && error.response.data.errors) {
        const rawErrors = error.response.data.errors;
        setFormErrors(rawErrors);
      }
    });
};

const env = ref(import.meta.env);

onMounted(() => {
  setFormErrors();
});
</script>

<style>
</style>
