import type { RouteRecordRaw } from 'vue-router';
import { VbenLayout } from '/@/layouts';

const routes: RouteRecordRaw[] = [
  {
    path: '/purchase-order-system',
    name: 'PurchaseOrderSystem',
    component: VbenLayout,
    meta: {
      title: 'Purchase Order System',
      icon: 'ant-design:shopping-cart-outlined',
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () =>
          import('/@/views/purchase-order-system/products/list/index.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () =>
          import('/@/views/purchase-order-system/customers/list/index.vue'),
        meta: {
          title: 'Customers',
        },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () =>
          import('/@/views/purchase-order-system/orders/list/index.vue'),
        meta: {
          title: 'Orders',
        },
      },
    ],
  },
];

export default routes;
