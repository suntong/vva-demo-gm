import { request } from '/@/utils/request';

export function getOrderList() {
  return request.get({
    url: '/orders',
  });
}

export function addOrder(data) {
  return request.post({
    url: '/orders',
    data,
  });
}

export function deleteOrder(id) {
  return request.delete({
    url: `/orders/${id}`,
  });
}

export function updateOrder(id, data) {
  return request.put({
    url: `/orders/${id}`,
    data,
  });
}
