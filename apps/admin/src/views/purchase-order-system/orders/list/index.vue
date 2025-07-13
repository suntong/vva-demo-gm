<template>
  <div>
    <VbenTable
      @register="registerTable"
    />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getOrderList } from '/@/api/purchase-order-system/order';
import { columns } from './data';

const [registerTable] = useTable({
  api: getOrderList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
});
</script>
