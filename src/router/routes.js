const routes = [
  {
    path: '/',
    component: () => import('src/views/layouts/EmptyLayout.vue'),
    redirect: to => { return '/guest-registration' },
    meta: { requiresAuth: false },
    children: [
      {
        path: '/login-old',
        name: '/login-old',
        component: () => import('src/controllers/auth/LoginPageOld.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'guest-registration',
        component: () => import('src/controllers/guest-registration/guestRegistration.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/',
        component: () => import('src/views/layouts/MainLayout.vue'),
        redirect: to => { return '/lists/events' },
        children: [
          {
            path: '/login',
            name: '/login',
            component: () => import('src/controllers/auth/SigninView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/register',
            name: '/register',
            component: () => import('src/controllers/auth/JoinView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/about',
            name: '/about',
            component: () => import('src/controllers/AboutController.vue'),
            meta: {
              breadcrumbName: 'About',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/attendances',
            name: '/lists/attendances',
            component: () => import('src/controllers/lists/attendances/AttendanceListController.vue'),
            meta: {
              breadcrumbName: 'Attendances',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/attendances/:rId/:rName',
            name: '/lists/attendances/:rId/:rName',
            component: () => import('src/controllers/lists/attendances/AttendanceReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/attendances',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/children',
            name: '/lists/children',
            component: () => import('src/controllers/lists/children/ChildListController.vue'),
            meta: {
              breadcrumbName: 'Children',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/children/:rId/:rName',
            name: '/lists/children/:rId/:rName',
            component: () => import('src/controllers/lists/children/ChildReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/children',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/events',
            name: '/lists/events',
            component: () => import('src/controllers/lists/events/EventListController.vue'),
            meta: {
              breadcrumbName: 'Events',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/events/:rId/:rName',
            name: '/lists/events/:rId/:rName',
            component: () => import('src/controllers/lists/events/EventReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/events',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/failed-jobs',
            name: '/lists/failed-jobs',
            component: () => import('src/controllers/lists/failed-jobs/FailedJobListController.vue'),
            meta: {
              breadcrumbName: 'FailedJobs',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/failed-jobs/:rId/:rName',
            name: '/lists/failed-jobs/:rId/:rName',
            component: () => import('src/controllers/lists/failed-jobs/FailedJobReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/failed-jobs',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/families',
            name: '/lists/families',
            component: () => import('src/controllers/lists/families/FamilyListController.vue'),
            meta: {
              breadcrumbName: 'Families',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/families/:rId/:rName',
            name: '/lists/families/:rId/:rName',
            component: () => import('src/controllers/lists/families/FamilyReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/families',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/family-links',
            name: '/lists/family-links',
            component: () => import('src/controllers/lists/family-links/FamilyLinkListController.vue'),
            meta: {
              breadcrumbName: 'FamilyLinks',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/family-links/:rId/:rName',
            name: '/lists/family-links/:rId/:rName',
            component: () => import('src/controllers/lists/family-links/FamilyLinkReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/family-links',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/migrations',
            name: '/lists/migrations',
            component: () => import('src/controllers/lists/migrations/MigrationListController.vue'),
            meta: {
              breadcrumbName: 'Migrations',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/migrations/:rId/:rName',
            name: '/lists/migrations/:rId/:rName',
            component: () => import('src/controllers/lists/migrations/MigrationReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/migrations',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/password-reset-tokens',
            name: '/lists/password-reset-tokens',
            component: () => import('src/controllers/lists/password-reset-tokens/PasswordResetTokenListController.vue'),
            meta: {
              breadcrumbName: 'PasswordResetTokens',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/password-reset-tokens/:rId/:rName',
            name: '/lists/password-reset-tokens/:rId/:rName',
            component: () => import('src/controllers/lists/password-reset-tokens/PasswordResetTokenReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/password-reset-tokens',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/personal-access-tokens',
            name: '/lists/personal-access-tokens',
            component: () => import('src/controllers/lists/personal-access-tokens/PersonalAccessTokenListController.vue'),
            meta: {
              breadcrumbName: 'PersonalAccessTokens',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/personal-access-tokens/:rId/:rName',
            name: '/lists/personal-access-tokens/:rId/:rName',
            component: () => import('src/controllers/lists/personal-access-tokens/PersonalAccessTokenReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/personal-access-tokens',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/post-tags',
            name: '/lists/post-tags',
            component: () => import('src/controllers/lists/post-tags/PostTagListController.vue'),
            meta: {
              breadcrumbName: 'PostTags',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/post-tags/:rId/:rName',
            name: '/lists/post-tags/:rId/:rName',
            component: () => import('src/controllers/lists/post-tags/PostTagReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/post-tags',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/posts',
            name: '/lists/posts',
            component: () => import('src/controllers/lists/posts/PostListController.vue'),
            meta: {
              breadcrumbName: 'Posts',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/posts/:rId/:rName',
            name: '/lists/posts/:rId/:rName',
            component: () => import('src/controllers/lists/posts/PostReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/posts',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/school-family-enrollments',
            name: '/lists/school-family-enrollments',
            component: () => import('src/controllers/lists/school-family-enrollments/SchoolFamilyEnrollmentListController.vue'),
            meta: {
              breadcrumbName: 'SchoolFamilyEnrollments',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/school-family-enrollments/:rId/:rName',
            name: '/lists/school-family-enrollments/:rId/:rName',
            component: () => import('src/controllers/lists/school-family-enrollments/SchoolFamilyEnrollmentReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/school-family-enrollments',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/jobs',
            name: '/lists/jobs',
            component: () => import('src/controllers/lists/jobs/JobListController.vue'),
            meta: {
              breadcrumbName: 'Jobs',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/jobs/:rId/:rName',
            name: '/lists/jobs/:rId/:rName',
            component: () => import('src/controllers/lists/jobs/JobReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/jobs',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/schools',
            name: '/lists/schools',
            component: () => import('src/controllers/lists/schools/SchoolListController.vue'),
            meta: {
              breadcrumbName: 'Schools',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/schools/:rId/:rName',
            name: '/lists/schools/:rId/:rName',
            component: () => import('src/controllers/lists/schools/SchoolReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/schools',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/tags',
            name: '/lists/tags',
            component: () => import('src/controllers/lists/tags/TagListController.vue'),
            meta: {
              breadcrumbName: 'Tags',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/tags/:rId/:rName',
            name: '/lists/tags/:rId/:rName',
            component: () => import('src/controllers/lists/tags/TagReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/tags',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users',
            name: '/lists/users',
            component: () => import('src/controllers/lists/users/UserListController.vue'),
            meta: {
              breadcrumbName: 'Users',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users/:rId/:rName',
            name: '/lists/users/:rId/:rName',
            component: () => import('src/controllers/lists/users/UserReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/users',
              requiresAuth: false,
            },
          }
        ],
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/controllers/ErrorNotFound.vue'),
    meta: { requiresAuth: false }
  }
];

export default routes;
