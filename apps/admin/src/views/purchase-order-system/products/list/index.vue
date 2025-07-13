<template>
  <div>
    <VbenTable
      @register="registerTable"
    />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getProductList } from '/@/api/purchase-order-system/product';
import { columns } from './data';

const [registerTable] = useTable({
  api: getProductList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
});
</script>
