import request from "@/utils/request";
import qs from "qs";

// 充值列表
export const orderList = data =>
  request({
    url: `/pc/admin/order/list`,
    data: qs.stringify(data),
    method: "post"
  });
