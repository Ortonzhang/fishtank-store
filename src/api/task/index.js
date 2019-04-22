import request from "@/utils/request";
import qs from "qs";

// 任务分类列表
export const taskGroupList = data =>
  request({
    url: "/pc/admin/taskGroup/list",
    data: qs.stringify(data),
    method: "post"
  });
// 任务分类详情
export const taskGroupDetail = id =>
  request({
    url: `/pc/admin/taskGroup/detail/${id}`,
    method: "post"
  });
// 添加任务分类
export const taskGroupAdd = data =>
  request({
    url: "/pc/admin/taskGroup/add",
    data: qs.stringify(data),
    method: "post",
    headers: { isToast: true }
  });
// 任务分类下线
export const taskGroupOffline = id =>
  request({
    url: `/pc/admin/taskGroup/offline/${id}`,
    method: "post",
    headers: { isToast: true }
  });
// 任务分类上线
export const taskGroupOnline = id =>
  request({
    url: `/pc/admin/taskGroup/online/${id}`,
    method: "post",
    headers: { isToast: true }
  });
// 添加任务分类
export const taskGroupUpdate = data =>
  request({
    url: "/pc/admin/taskGroup/update",
    data: qs.stringify(data),
    method: "post"
  });

// 任务列表
export const taskList = data =>
  request({
    url: "/pc/admin/task/list",
    data: qs.stringify(data),
    method: "post"
  });
// 添加任务
export const taskAdd = data =>
  request({
    url: "/pc/admin/task/add",
    data,
    method: "post",
    headers: { "Content-Type": "multipart/form-data", isToast: true }
  });

// 任务详情
export const taskDetail = id =>
  request({
    url: `/pc/admin/task/detail/${id}`,
    method: "post"
  });

// 任务下线
export const taskOffline = id =>
  request({
    url: `/pc/admin/task/offline/${id}`,
    method: "post"
  });

// 任务上线
export const taskOnline = id =>
  request({
    url: `/pc/admin/task/online/${id}`,
    method: "post"
  });
// 添加任务
export const taskUpdate = data =>
  request({
    url: "/pc/admin/task/update",
    data,
    method: "post",
    headers: { "Content-Type": "multipart/form-data", isToast: true }
  });

// 根据name模糊查找所有任务分类
export const taskGetNameValueListByName = data =>
  request({
    url: "/pc/admin/taskGroup/getNameValueListByName",
    data: qs.stringify(data),
    method: "post"
  });

// 根据name模糊查找所有任务名称
export const getAllNameValueListByName = data =>
  request({
    url: "/pc/admin/task/getAllNameValueListByName",
    data: qs.stringify(data),
    method: "post"
  });
// 根据name模糊查找所有上线任务名称
export const getOnlineNameValueListByName = data =>
  request({
    url: "/pc/admin/task/getOnlineNameValueListByName",
    data: qs.stringify(data),
    method: "post"
  });
