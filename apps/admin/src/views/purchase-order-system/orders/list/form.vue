<template>
  <VbenModal
    @register="registerModal"
    :title="isUpdate ? 'Edit Order' : 'Add Order'"
    @ok="handleSubmit"
  >
    <VbenForm @register="registerForm" />
  </VbenModal>
</template>
<script lang="ts" setup>
import { useModal, VbenModal } from '/@/components/VbenModal';
import { useForm, VbenForm } from '/@/components/VbenForm';
import { computed, unref } from 'vue';
import { getCustomerList } from '/@/api/purchase-order-system/customer';
import { getProductList } from '/@/api/purchase-order-system/product';

const isUpdate = computed(() => !!unref(props.id));
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});

const [registerForm, { setFieldsValue, validate }] = useForm({
  schemas: [
    {
      field: 'customerId',
      label: 'Customer',
      component: 'ApiSelect',
      componentProps: {
        api: getCustomerList,
        labelField: 'firstName',
        valueField: 'id',
      },
      required: true,
    },
    {
      field: 'productId',
      label: 'Product',
      component: 'ApiSelect',
      componentProps: {
        api: getProductList,
        labelField: 'productName',
        valueField: 'id',
      },
      required: true,
    },
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
      required: true,
    },
    {
      field: 'total',
      label: 'Total',
      component: 'InputNumber',
      required: true,
    },
    {
      field: 'orderDate',
      label: 'Order Date',
      component: 'DatePicker',
      required: true,
    },
  ],
  showActionButtonGroup: false,
});

const [registerModal, { setModalProps, closeModal }] = useModal();

import { addOrder, updateOrder } from '/@/api/purchase-order-system/order';

async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      await updateOrder(props.id, values);
    } else {
      await addOrder(values);
    }
    closeModal();
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

const emit = defineEmits(['success']);
</script>
