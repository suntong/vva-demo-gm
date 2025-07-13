import { defHttp } from '/@/utils/http/axios';

enum Api {
  CustomerList = '/customers/list',
}

export function getCustomerList(params) {
  return defHttp.get({ url: Api.CustomerList, params });
}
