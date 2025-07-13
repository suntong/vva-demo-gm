<template>
  <VbenModal
    @register="registerModal"
    :title="isUpdate ? 'Edit Product' : 'Add Product'"
    @ok="handleSubmit"
  >
    <VbenForm @register="registerForm" />
  </VbenModal>
</template>
<script lang="ts" setup>
import { useModal, VbenModal } from '/@/components/VbenModal';
import { useForm, VbenForm } from '/@/components/VbenForm';
import { computed, unref } from 'vue';

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
      field: 'productName',
      label: 'Product Name',
      component: 'Input',
      required: true,
    },
    {
      field: 'price',
      label: 'Price',
      component: 'InputNumber',
      required: true,
    },
    {
      field: 'category',
      label: 'Category',
      component: 'Input',
      required: true,
    },
    {
      field: 'inStock',
      label: 'In Stock',
      component: 'Switch',
    },
    {
      field: 'description',
      label: 'Description',
      component: 'InputTextArea',
    },
  ],
  showActionButtonGroup: false,
});

const [registerModal, { setModalProps, closeModal }] = useModal();

import { addProduct, updateProduct } from '/@/api/purchase-order-system/product';

async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      await updateProduct(props.id, values);
    } else {
      await addProduct(values);
    }
    closeModal();
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

const emit = defineEmits(['success']);
</script>
