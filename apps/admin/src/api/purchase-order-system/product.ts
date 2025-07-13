import { defHttp } from '/@/utils/http/axios';

enum Api {
  ProductList = '/products/list',
}

export function getProductList(params) {
  return defHttp.get({ url: Api.ProductList, params });
}
