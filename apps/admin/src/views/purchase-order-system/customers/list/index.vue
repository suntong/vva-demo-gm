<template>
  <div>
    <VbenTable @register="registerTable">
      <template #toolbar>
        <VbenButton type="primary" @click="handleCreate">
          Add Customer
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
    <CustomerForm @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getCustomerList } from '/@/api/purchase-order-system/customer';
import { columns } from './data';
import { useModal } from '/@/components/VbenModal';
import CustomerForm from './form.vue';
import { VbenButton } from '/@/components/VbenButton';

const [registerTable] = useTable({
  api: getCustomerList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
  showTableSetting: true,
  useSearchForm: true,
  formConfig: {
    schemas: [
      {
        field: 'firstName',
        label: 'First Name',
        component: 'Input',
      },
      {
        field: 'lastName',
        label: 'Last Name',
        component: 'Input',
      },
    ],
  },
});

import { deleteCustomer } from '/@/api/purchase-order-system/customer';

const [registerTable, { reload }] = useTable({
  api: getCustomerList,
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
        field: 'firstName',
        label: 'First Name',
        component: 'Input',
      },
      {
        field: 'lastName',
        label: 'Last Name',
        component: 'Input',
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
  await deleteCustomer(id);
  reload();
}
</script>
