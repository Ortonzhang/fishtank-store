import request from "@/utils/request";
import qs from "qs";

// AppVersion列表
export const versionList = data =>
  request({
    url: "/pc/admin/version/list",
    data: qs.stringify(data),
    method: "post"
  });
// AppVersion详情
export const versionDetail = id =>
  request({
    url: `/pc/admin/version/detail/${id}`,
    method: "post"
  });
// 添加AppVersion
export const versionAdd = data =>
  request({
    url: `/pc/admin/version/add`,
    data: qs.stringify(data),
    method: "post"
  });
// 更新AppVersion
export const versionUpdate = data =>
  request({
    url: `/pc/admin/version/update`,
    data: qs.stringify(data),
    method: "post"
  });
// AppVersion上线/下线
export const versionUpdateStatus = data =>
  request({
    url: `/pc/admin/version/updateStatus`,
    data: qs.stringify(data),
    method: "post"
  });
