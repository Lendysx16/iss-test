import { useToDoListStore } from '@/modules/to-do-list/stores/toDoListStore';
import {
  Statuses,
  StatusItems,
} from '@/modules/to-do-list/types/FilterByStatus';
import {
  createRouter,
  createWebHistory,
  RouteLocation,
  RouteRecordRaw,
} from 'vue-router';

export const routes: Record<string, RouteRecordRaw> = {
  HOME: {
    component: () =>
      import('@/modules/to-do-list/views/ToDoList.vue'),
    name: 'home',
    path: '/',
    props: (route: RouteLocation) => ({
      create: false,
      show: StatusItems[route.query.show as Statuses],
    }),
  },

  HOME_CREATE: {
    component: () =>
      import('@/modules/to-do-list/views/ToDoList.vue'),
    name: 'create',
    path: '/create',
    props: (route: RouteLocation) => ({
      create: true,
      show: StatusItems[route.query.show as Statuses],
    }),
  },

  HOME_EDIT: {
    beforeEnter: (to, _from, next) => {
      const id = String(to.params.id);

      const toDoListStore = useToDoListStore();

      if (!toDoListStore.getItemByID(id)) {
        next({ name: 'not-found' });
        return;
      }

      next();
    },
    component: () =>
      import('@/modules/to-do-list/views/ToDoList.vue'),
    name: 'edit',

    path: '/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})',

    props: (route: RouteLocation) => ({
      create: false,
      idToEdit: String(route.params.id),
      show: StatusItems[route.query.show as Statuses],
    }),
  },

  NOT_FOUND: {
    component: () =>
      import('@/modules/common/views/NotFoundPage.vue'),
    name: 'not-found',
    path: '/:pathMatch(.*)*',
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes),
});

export default router;

declare module 'vue' {
  interface ComponentCustomProperties {
    $routes: typeof routes;
  }
}
