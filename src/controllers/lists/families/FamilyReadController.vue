<template>
  <div>

    <q-card class="q-mb-md" style="overflow: hidden;">
      <!--hideRelations-->
      <familyRead
        :id="id"
        :templateOverview="templateListGrid"
        @initialLoadHappened="initialLoadHappened = true"
        :allowedTabs="[
          'overview',
          // 'attendances',
          // 'private_events',
          // 'children',
          // 'FamilyLinks',
          // 'schoolFamilyEnrollments',
        ]"
      />
    </q-card>
    <div
      v-show="initialLoadHappened"
    >

      <div class="row  q-col-gutter-md">

        <div class="col-xl-12 col-md-12 col-sm-12 col-xs-12">

          <q-card class="">
            <SectionComponent
              label="Calendar"
            >
              <familyRead
                :allowedTabs="['calendar']"
              />
            </SectionComponent>
          </q-card>
        </div>
        <!--<div class="col-xl-12 col-md-12 col-sm-12 col-xs-12">-->

        <!--  <q-card class="">-->
        <!--    <SectionComponent-->
        <!--      label="Attendances"-->
        <!--      expand-separator-->
        <!--      class="bordered-expansion-item"-->
        <!--      @show="renderSection1=true"-->
        <!--    >-->
        <!--      <div class="q-pa-md">-->

        <!--        <attendanceList-->
        <!--          v-if="renderSection1"-->
        <!--          :parentKeyValuePair="{-->
        <!--            parentFKey: 'family_id',-->
        <!--            parentFVal: +this.$route.params.rId,-->
        <!--            parentItem: {},-->
        <!--          }"-->
        <!--        />-->
        <!--        &lt;!&ndash;:colWidth="6"&ndash;&gt;-->
        <!--      </div>-->
        <!--    </SectionComponent>-->
        <!--  </q-card>-->

        <!--</div>-->
        <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

          <q-card class="">
            <SectionComponent
              label="Children"
            >
              <child-list
                :parentKeyValuePair="{
                    parentFKey: 'family_id',
                    parentFVal: +this.$route.params.rId,
                    parentItem: {},
                  }"
                :colWidth="6"

              />
            </SectionComponent>
          </q-card>

        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

          <q-card class="">
            <SectionComponent
              label="Family Links"
              noBorder
            >
              <FamilyLinkList
                :parentKeyValuePair="{
                    parentFKey: 'family_id',
                    parentFVal: +this.$route.params.rId,
                    parentItem: {},
                  }"
                :colWidth="6"

              />
            </SectionComponent>
          </q-card>

        </div>

        <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

          <q-card class="">
            <SectionComponent
              label="School Enrollments"
            >

              <schoolFamilyEnrollmentList
                :parentKeyValuePair="{
                    parentFKey: 'family_id',
                    parentFVal: +this.$route.params.rId,
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
import familyRead from 'src/views/lists/families/FamilyRead.vue'
import SchoolFamilyEnrollmentList from "src/views/lists/school-family-enrollments/SchoolFamilyEnrollmentList.vue";
import ChildList from "src/views/lists/children/ChildList.vue";
import FamilyLinkList from "src/views/lists/family-links/FamilyLinkList.vue";
import attendanceList from "src/views/lists/attendances/AttendanceList.vue";
import Attendance from "src/models/orm-api/Attendance";
import PrivateEvent from "src/models/orm-api/PrivateEvent";
import SectionComponent from "src/views/SectionComponent.vue";

export default {
    name: 'Family-read-controller',
    components: {
      SectionComponent,
      // attendanceList,
      FamilyLinkList,
      ChildList,
      SchoolFamilyEnrollmentList,
        familyRead,
    },

    data() {
        return {
          initialLoadHappened: false,
          renderSection1: false,
          renderSection2: false,
            id: +this.$route.params.rId,
            templateListGrid: {
              class: "q-pa-md q-col-gutter-md",
              cols: [
                {
                  width: 12,
                  dataPoint: {
                    type: "function",
                    function: (item) => `${item.name}`,
                    label: "",
                    tag: "div",
                    class: "text-h6",
                    hideLabel: true,
                  },
                },
                // {
                //   width: 3,
                //   dataPoint: {
                //     type: "function",
                //     function: (item) => `${item.email}`,
                //     label: "Email",
                //     // xOrientation: true,
                //   },
                // },
              ],
            }
        }
    },
}
</script>
