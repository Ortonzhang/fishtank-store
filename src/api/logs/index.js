import request from "@/utils/request";
import qs from "qs";

// 日志-模块
export const logbizTypeList = id =>
  request({
    url: "/pc/admin/log/bizTypeList",
    method: "post"
  });

// 操作日志
export const logList = data =>
  request({
    url: `/pc/admin/log/list`,
    data: qs.stringify(data),
    method: "post"
  });

// 日志-类型
export const logOpTypeList = id =>
  request({
    url: `/pc/admin/log/opTypeList`,
    method: "post"
  });
