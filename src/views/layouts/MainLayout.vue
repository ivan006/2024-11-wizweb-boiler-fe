<template>
  <MainLayoutHelper>
    <template v-slot:menu>
      <template v-for="link in linksList" :key="link.title || link.groupTitle">
        <template v-if="link.groupTitle">
          <q-item-label header>{{ link.groupTitle }}</q-item-label>

          <EssentialLink
            v-for="sublink in link.links"
            :key="sublink.title"
            v-bind="sublink"
            :active-route="activeRoute"
            :indent="true"
          />
        </template>
        <template v-else>
          <EssentialLink
            v-bind="link"
            :active-route="activeRoute"
            :indent="false"
          />
        </template>
      </template>
    </template>
    <template v-slot:default>
      <q-page-container>


        <div class="q-mb-md">
          <BreadcrumbsComp />
        </div>
        <router-view @route-changed="updateActiveRoute" />
      </q-page-container>
    </template>
  </MainLayoutHelper>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import EssentialLink from 'src/views/EssentialLink.vue';
import MainLayoutHelper from "src/views/layouts/MainLayoutHelper.vue";
import BreadcrumbsComp from "src/views/BreadcrumbsComp.vue";
import VueCookies from "vue-cookies";

defineOptions({
  name: 'MainLayout'
});

const route = useRoute();
const activeRoute = ref(route.path);

watch(route, (newRoute) => {
  activeRoute.value = newRoute.path;
});

const session = computed(() => {
  return VueCookies.get('VITE_AUTH');
});

const linksList = computed(() => {

  const linksList = [
    // {
    //   title: 'Attendances',
    //   route: '/lists/attendances',
    // },
    // {
    //   title: 'Children',
    //   route: '/lists/children',
    // },
    {
      // icon: 'event',
      icon: 'manage_search',
      title: 'Events',
      route: '/lists/events',
    },
    // {
    //   title: 'Failed Jobs',
    //   route: '/lists/failed-jobs',
    // },
    // {
    //   title: 'Families',
    //   route: '/lists/families',
    // },
    // {
    //   title: 'Family Links',
    //   route: '/lists/family-links',
    // },
    // {
    //   title: 'Migrations',
    //   route: '/lists/migrations',
    // },
    // {
    //   title: 'Password Reset Tokens',
    //   route: '/lists/password-reset-tokens',
    // },
    // {
    //   title: 'Personal Access Tokens',
    //   route: '/lists/personal-access-tokens',
    // },
    // {
    //   title: 'Post Tags',
    //   route: '/lists/post-tags',
    // },
    // {
    //   title: 'Posts',
    //   route: '/lists/posts',
    // },
    // {
    //   title: 'School Family Enrollments',
    //   route: '/lists/school-family-enrollments',
    // },
    // {
    //   title: 'Jobs',
    //   route: '/lists/jobs',
    // },
    {
      icon: 'school',
      title: 'Schools',
      route: '/lists/schools',
    },
    // {
    //   title: 'Tags',
    //   route: '/lists/tags',
    // },
    // {
    //   title: 'Users',
    //   route: '/lists/users',
    // },
  ];


  if (session.value){
    const myAccount = `/lists/users/${session.value.user.id}/${session.value.user.name}`

    if (session.value.user.primary_family_id){

      const family = session.value.user.primary_family
      const myTimetable = `/lists/families/${family.id}/${family.name}`

      // linksList.push({
      //   icon: 'favorite',
      //   title: 'Favourites',
      //   route: myTimetable,
      // })
      linksList.push({
        icon: 'book',
        title: 'My Family',
        route: myTimetable,
      })
    }
    linksList.push({
      icon: 'person',
      title: 'My Account',
      route: myAccount,
    })
    linksList.push({
      icon: 'logout',
      title: 'Logout',
      function: ()=>{
        VueCookies.remove('VITE_AUTH');
        window.location.href = '/';

      },
    })
  } else {

    linksList.push({
      icon: 'person',
      title: 'Login',
      route: '/login',
    })
    linksList.push({
      icon: 'edit',
      title: 'Register',
      route: '/register',
    })
  }

  linksList.push({
    // icon: 'event',
    icon: 'info',
    title: 'About',
    route: '/about',
  })

  return linksList

});



function updateActiveRoute(newRoute) {
  activeRoute.value = newRoute;
}
</script>
