import { request } from '/@/utils/request';

export function getCustomerList() {
  return request.get({
    url: '/customers',
  });
}

export function addCustomer(data) {
  return request.post({
    url: '/customers',
    data,
  });
}

export function deleteCustomer(id) {
  return request.delete({
    url: `/customers/${id}`,
  });
}

export function updateCustomer(id, data) {
  return request.put({
    url: `/customers/${id}`,
    data,
  });
}
