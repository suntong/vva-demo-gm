import { generateOrders } from '../orders';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response';

const mockData = generateOrders(100);

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const { page, pageSize, sortBy, sortOrder } = getQuery(event);
  const listData = structuredClone(mockData);
  if (sortBy && Reflect.has(listData[0], sortBy as string)) {
    listData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy as string] > b[sortBy as string] ? 1 : -1;
      } else {
        return a[sortBy as string] < b[sortBy as string] ? 1 : -1;
      }
    });
  }

  return usePageResponseSuccess(page as string, pageSize as string, listData);
});
