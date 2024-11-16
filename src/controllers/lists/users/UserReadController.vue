<template>
    <div>
      <q-card class="q-mb-md" style="overflow: hidden;">
          <userRead
            :id="+$route.params.rId"
            @initialLoadHappened="initialLoadHappened = true"
          />
      </q-card>

      <div
        v-show="initialLoadHappened"
      >

        <div class="row  q-col-gutter-md">
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

            <q-card class="" style="overflow: hidden;">
              <SectionComponent
                label="Families"
                noBorder
              >
                <familyList
                  :parentKeyValuePair="{
                      parentFKey: 'creator_id',
                      parentFVal: +$route.params.rId,
                      parentItem: {},
                    }"
                  :colWidth="6"
                  noBorder
                />
                <!--:fetchFlags="fetchFlags"-->
              </SectionComponent>
            </q-card>

          </div>
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

            <q-card class="" style="overflow: hidden;">
              <SectionComponent
                label="Family Links"
                noBorder
              >

                <FamilyLinkList
                  :parentKeyValuePair="{
                      parentFKey: 'user_id',
                      parentFVal: +$route.params.rId,
                      parentItem: {},
                    }"
                  :colWidth="6"

                />
              </SectionComponent>
            </q-card>

          </div>
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

            <q-card class="" style="overflow: hidden;">
              <SectionComponent
                label="Schools"
                noBorder
              >
                <schoolList
                  :parentKeyValuePair="{
                      parentFKey: 'creator_id',
                      parentFVal: +$route.params.rId,
                      parentItem: {},
                    }"
                  :colWidth="6"
                  noBorder
                />
                <!--:fetchFlags="fetchFlags"-->
              </SectionComponent>
            </q-card>

          </div>
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

            <q-card class="" style="overflow: hidden;">
              <SectionComponent
                label="Jobs"
              >

                <job-list
                  :parentKeyValuePair="{
                      parentFKey: 'user_id',
                      parentFVal: +$route.params.rId,
                      parentItem: {},
                    }"
                  :colWidth="6"

                />
              </SectionComponent>
            </q-card>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import userRead from 'src/views/lists/users/UserRead.vue'
import User from "src/models/User";
import VueCookies from "vue-cookies";
import FamilyLinkList from "src/views/lists/family-links/FamilyLinkList.vue";
import JobList from "src/views/lists/jobs/JobList.vue";
import SectionComponent from "src/views/SectionComponent.vue";
import familyList from "src/views/lists/families/FamilyList.vue";
import schoolList from "src/views/lists/schools/SchoolList.vue";

export default {
    name: 'User-read-controller',
    components: {
      schoolList,
      familyList,
      SectionComponent,
      JobList,
      FamilyLinkList,
        userRead,
    },
  data() {
    return {
      initialLoadHappened: false,
      renderSection1: false,
    }
  },
  computed: {
    session() {
      return VueCookies.get('VITE_AUTH');
    }
  },
}
</script>
