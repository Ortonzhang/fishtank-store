import request from "@/utils/request";
import qs from "qs";

// 添加AppMessage
export const appMessageAdd = data =>
  request({
    url: `/pc/admin/appMessage/add`,
    data: qs.stringify(data),
    method: "post"
  });

// AppMessage详情
export const appMessageDetail = id =>
  request({
    url: `/pc/admin/appMessage/detail/${id}`,
    method: "post"
  });
// AppMessage推送
export const appMessageSend = id =>
  request({
    url: `/pc/admin/appMessage/send/${id}`,
    method: "post"
  });

// AppMessage列表
export const appMessageList = data =>
  request({
    url: `/pc/admin/appMessage/list`,
    data: qs.stringify(data),
    method: "post"
  });
// 更新AppMessage
export const appMessageUpdate = data =>
  request({
    url: `/pc/admin/appMessage/update`,
    data: qs.stringify(data),
    method: "post"
  });
// 消息状态map
export const appMessageStatusEnum = () =>
  request({
    url: `/pc/appMessage/statusEnum`,
    method: "post"
  });
// 设备类型map
export const appMessageDeviceTypeList = () =>
  request({
    url: `/pc/appMessage/deviceTypeList`,
    method: "post"
  });
// 消息类型map
export const appMessagePushTypeList = () =>
  request({
    url: `/pc/appMessage/pushTypeList`,
    method: "post"
  });
