import { defHttp } from '/@/utils/http/axios';

enum Api {
  OrderList = '/orders/list',
}

export function getOrderList(params) {
  return defHttp.get({ url: Api.OrderList, params });
}
