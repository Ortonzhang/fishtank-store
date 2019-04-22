import request from "@/utils/request";
import qs from "qs";

// 任务分类列表
export const settingDetail = () =>
  request({
    url: "/pc/admin/setting/detail",
    method: "post"
  });
// 任务分类详情
export const settingUpdate = data =>
  request({
    url: `/pc/admin/setting/update`,
    data,
    method: "post",
    headers: { "Content-Type": "multipart/form-data", isToast: true }
  });
