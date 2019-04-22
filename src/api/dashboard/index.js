import request from "@/utils/request";
import qs from "qs";

// 订单首页统计
export const getDashboard = () =>
  request({
    url: `/pc/admin/dashboard`,
    method: "post"
  });
