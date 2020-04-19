import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/pages/AboutPage.vue';
import SkillsPage from '@/pages/SkillsPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import InterestsPage from '@/pages/InterestsPage.vue';
import AwardPage from '@/pages/AwardPage.vue';
import TimelinePage from '@/pages/TimelinePage.vue';
import SuccessPage from '@/pages/SuccessPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'About',
    component: AboutPage,
    meta: {
      title: 'Welcome / SC Kim',
      metaTags: [
        {
          name: 'description',
          content: 'Welcome to SC Kim Portfolio',
        },
        {
          property: 'og:description',
          content: 'Welcome to SC Kim Portfolio',
        },
      ],
    },
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: TimelinePage,
    meta: {
      title: 'Timeline / SC Kim',
      metaTags: [
        {
          name: 'description',
          content: 'Experience Timeline | SC Kim',
        },
        {
          property: 'og:description',
          content: 'Experience Timeline | SC Kim',
        },
      ],
    },
  },
  {
    path: '/skills',
    name: 'Skills',
    component: SkillsPage,
    meta: {
      title: 'Skills / SC Kim',
      metaTags: [
        {
          name: 'description',
          content: 'Skills | SC Kim',
        },
        {
          property: 'og:description',
          content: 'Technical Skills | SC Kim',
        },
      ],
    },
  },
  {
    path: '/interests',
    name: 'Interests',
    component: InterestsPage,
    meta: {
      title: 'Interest / SC Kim',
      metaTags: [
        {
          name: 'description',
          content: 'Interest | SC Kim',
        },
        {
          property: 'og:description',
          content: 'Interest | SC Kim',
        },
      ],
    },
  },
  {
    path: '/awards',
    name: 'awards',
    component: AwardPage,
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: 'Contact / SC Kim',
      metaTags: [
        {
          name: 'description',
          content: "I won't bite, give me a ping!",
        },
        {
          property: 'og:description',
          content: "I won't bite, give me a ping!",
        },
      ],
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);
  // eslint-disable-next-line no-console
  console.log(previousNearestWithMeta);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;