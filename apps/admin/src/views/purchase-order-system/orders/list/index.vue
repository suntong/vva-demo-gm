<template>
  <div>
    <VbenTable @register="registerTable">
      <template #toolbar>
        <VbenButton type="primary" @click="handleCreate">
          Add Order
        </VbenButton>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: 'Delete',
              onClick: () => handleDelete(record.id),
            },
          ]"
        />
      </template>
    </VbenTable>
    <OrderForm @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getOrderList } from '/@/api/purchase-order-system/order';
import { columns } from './data';
import { useModal } from '/@/components/VbenModal';
import OrderForm from './form.vue';
import { VbenButton } from '/@/components/VbenButton';

const [registerTable] = useTable({
  api: getOrderList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
  showTableSetting: true,
  useSearchForm: true,
  formConfig: {
    schemas: [
      {
        field: 'status',
        label: 'Status',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: 'Pending',
              value: 'pending',
            },
            {
              label: 'Shipped',
              value: 'shipped',
            },
            {
              label: 'Delivered',
              value: 'delivered',
            },
          ],
        },
      },
    ],
  },
});

import { deleteOrder } from '/@/api/purchase-order-system/order';

const [registerTable, { reload }] = useTable({
  api: getOrderList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
  showTableSetting: true,
  useSearchForm: true,
  actionColumn: {
    width: 150,
    title: 'Action',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
  formConfig: {
    schemas: [
      {
        field: 'status',
        label: 'Status',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: 'Pending',
              value: 'pending',
            },
            {
              label: 'Shipped',
              value: 'shipped',
            },
            {
              label: 'Delivered',
              value: 'delivered',
            },
          ],
        },
      },
    ],
  },
});

const [registerModal, { openModal }] = useModal();

function handleCreate() {
  openModal(true, {});
}

function handleSuccess() {
  reload();
}

async function handleDelete(id: string) {
  await deleteOrder(id);
  reload();
}
</script>
