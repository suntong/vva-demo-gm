<template>
  <div>
    <VbenTable @register="registerTable">
      <template #toolbar>
        <VbenButton type="primary" @click="handleCreate">
          Add Product
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
    <ProductForm @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getProductList } from '/@/api/purchase-order-system/product';
import { columns } from './data';
import { useModal } from '/@/components/VbenModal';
import ProductForm from './form.vue';
import { VbenButton } from '/@/components/VbenButton';

import { deleteProduct } from '/@/api/purchase-order-system/product';

const [registerTable, { reload }] = useTable({
  api: getProductList,
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
        field: 'productName',
        label: 'Product Name',
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
  await deleteProduct(id);
  reload();
}
</script>
