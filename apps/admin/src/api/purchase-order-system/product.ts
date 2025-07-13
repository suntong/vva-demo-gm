import { request } from '/@/utils/request';

export function getProductList() {
  return request.get({
    url: '/products',
  });
}

export function addProduct(data) {
  return request.post({
    url: '/products',
    data,
  });
}

export function deleteProduct(id) {
  return request.delete({
    url: `/products/${id}`,
  });
}

export function updateProduct(id, data) {
  return request.put({
    url: `/products/${id}`,
    data,
  });
}
