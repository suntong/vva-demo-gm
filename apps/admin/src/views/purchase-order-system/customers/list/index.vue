<template>
  <div>
    <VbenTable
      @register="registerTable"
    />
  </div>
</template>
<script lang="ts" setup>
import { VbenTable, useTable } from '/@/components/VbenTable';
import { getCustomerList } from '/@/api/purchase-order-system/customer';
import { columns } from './data';

const [registerTable] = useTable({
  api: getCustomerList,
  columns: columns,
  bordered: true,
  showIndexColumn: false,
  rowKey: 'id',
});
</script>
