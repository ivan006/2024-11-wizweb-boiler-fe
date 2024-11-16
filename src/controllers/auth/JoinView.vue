<template>
  <q-page class="q-pa-md ">

    <div class="row  q-col-gutter-md">
      <div class="col-xl-3 col-md-3 col-sm-12 col-xs-12">
      </div>
      <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-pa-md">
          <template v-if="!checkEmail">
            <q-form ref="form" @submit="join" >
              <div class="text-h6 q-mb-md">Register</div>
              <q-input
                v-model="entity.name"
                label="Full Name"
                :error="!!errors.name"
                :error-message="errors.name"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                type="email"
                v-model="entity.email"
                label="Email"
                :error="!!errors.email"
                :error-message="errors.email"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                v-model="entity.password"
                :type="showPassword ? 'text' : 'password'"
                :append="showPassword ? 'visibility_off' : 'visibility'"
                @click:append="showPassword = !showPassword"
                label="Password"
                :error="!!errors.password"
                :error-message="errors.password"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                v-model="entity.c_password"
                :type="showCPassword ? 'text' : 'password'"
                :append="showCPassword ? 'visibility_off' : 'visibility'"
                @click:append="showCPassword = !showCPassword"
                label="Confirm Password"
                :error="!!errors.c_password"
                :error-message="errors.c_password"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <div
                class="q-mb-sm"
              >
                <!--What type of group would you like?-->
                Please make a group
              </div>


              <div>
                <q-radio
                  :rules="[val => !!val || 'Field is required']"
                  v-model="intention"
                  val="Customer"
                  label="Family"
                  color="primary"
                  outlined
                  dense
                  class="q-mb-sm"
                />
              </div>
              <div>

                <q-radio
                  :rules="[val => !!val || 'Field is required']"
                  v-model="intention"
                  val="Provider"
                  label="School"
                  color="primary"
                  outlined
                  dense
                  class="q-mb-md"
                />
              </div>
              <q-input
                v-model="groupName"
                type="text"
                :label="intention === 'Customer' ? 'Family Name' : 'School Name'"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />

              <q-btn
                block
                class="full-width "
                :loading="loading"
                type="submit"
                label="Register"
                color="primary"
              />
              <div class="q-mt-md text-center">
                <q-btn
                  label="Login"
                  class="full-width"
                  outline
                  color="primary"
                  @click="$router.push({ path: 'login'})"
                />
              </div>
            </q-form>
          </template>
          <template v-else>
            Your account has been registered!
            <br>
            We have sent you an email with instructions to verify your email address.
          </template>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import User from "src/models/User";
import VueCookies from "vue-cookies";
import Family from "src/models/orm-api/Family";
import School from "src/models/orm-api/School";

export default {
  name: "JoinView",
  data() {
    return {
      groupName: '', // Default selection
      intention: 'Customer', // Default selection
      options: [
        { label: 'Family', value: 'Customer' },
        { label: 'School', value: 'Provider' }
      ],
      entity: {},
      loading: false,
      checkEmail: false,
      showPassword: false,
      showCPassword: false,
      errors: {},
      itemEmpty: {
        name: "",
        email: "",
        password: "",
        c_password: "",
      },
    };
  },
  methods: {
    setErrors(rawErrors = {}) {
      for (const fieldKey in this.itemEmpty) {
        if (rawErrors[fieldKey]) {
          this.errors[fieldKey] = rawErrors[fieldKey][0];
        } else {
          this.errors[fieldKey] = null;
        }
      }
    },
    join() {
      if (this.$refs.form.validate()) {
        this.loading = true;



        const session = VueCookies.get('VITE_AUTH');
        let groupRequest = null
        if (this.intention === 'Customer') {
          groupRequest = Family.Store(
            {
              name: this.groupName,
              // creator_id: user.id,
              // updater_id: user.id,
            },
            [],
            {},
            {}
          )
        } else {
          groupRequest = School.Store(
            {
              name: this.groupName,
              // creator_id: user.id,
              // updater_id: user.id,
            },
            [],
            {},
            {}
          )

        }


        groupRequest
          .then((groupResponse) => {

            const group = groupResponse.response.data.data

            if (this.intention === 'Customer') {
              // console.log('family')
              // console.log(family)
              this.entity.primary_family_id = group.id
            }
            User.Register(this.entity)
              .then((response) => {

                const user = response.response.data.user

                let groupRequest = null
                if (this.intention === 'Customer') {
                  groupRequest = Family.Update(
                    {
                      id: group.id,
                      creator_id: user.id,
                      updater_id: user.id,
                    },
                    [],
                    {},
                    {}
                  )
                } else {
                  groupRequest = School.Update(
                    {
                      id: group.id,
                      creator_id: user.id,
                      updater_id: user.id,
                    },
                    [],
                    {},
                    {}
                  )

                }

                groupRequest
                  .then((response) => {

                    this.checkEmail = true
                    this.loading = false
                  })
                  .catch((errors) => {
                    if (errors.response && errors.response.data.errors) {
                      this.setErrors(errors.response.data.errors);
                    }

                  });


              })
              .catch((errors) => {
                if (errors.response && errors.response.data.errors) {
                  this.setErrors(errors.response.data.errors);
                }
                this.loading = false
              });
          })
          .catch(() => {
            this.loading = false
          })
      }

    },
  },
  mounted() {
    this.setErrors();
  },
};
</script>

<style scoped></style>
