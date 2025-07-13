<template>
  <VbenModal
    @register="registerModal"
    :title="isUpdate ? 'Edit Customer' : 'Add Customer'"
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
      field: 'firstName',
      label: 'First Name',
      component: 'Input',
      required: true,
    },
    {
      field: 'lastName',
      label: 'Last Name',
      component: 'Input',
      required: true,
    },
    {
      field: 'email',
      label: 'Email',
      component: 'Input',
      required: true,
    },
    {
      field: 'address',
      label: 'Address',
      component: 'Input',
    },
  ],
  showActionButtonGroup: false,
});

const [registerModal, { setModalProps, closeModal }] = useModal();

import { addCustomer, updateCustomer } from '/@/api/purchase-order-system/customer';

async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      await updateCustomer(props.id, values);
    } else {
      await addCustomer(values);
    }
    closeModal();
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

const emit = defineEmits(['success']);
</script>
