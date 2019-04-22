import request from "@/utils/request";
import qs from "qs";

// 积分活动列表
export const depositRewardList = data =>
  request({
    url: "/pc/admin/depositReward/list",
    data: qs.stringify(data),
    method: "post"
  });

// 添加积分活动
export const depositRewardAdd = data =>
  request({
    url: "/pc/admin/depositReward/add",
    data: qs.stringify(data),
    method: "post",
    headers: { isToast: true }
  });
// 更新积分活动
export const depositRewardUpdate = data =>
  request({
    url: "/pc/admin/depositReward/update",
    data: qs.stringify(data),
    method: "post",
    headers: { isToast: true }
  });

// 积分活动详情
export const depositRewardDetail = id =>
  request({
    url: `/pc/admin/depositReward/detail/${id}`,
    method: "post"
  });
// 积分活动隐藏
export const depositRewardHide = id =>
  request({
    url: `/pc/admin/depositReward/hide/${id}`,
    method: "post"
  });
// 积分活动显示
export const depositRewardShow = id =>
  request({
    url: `/pc/admin/depositReward/show/${id}`,
    method: "post"
  });
// 积分活动上线
export const depositRewardOnline = id =>
  request({
    url: `/pc/admin/depositReward/online/${id}`,
    method: "post"
  });
// 积分活动下线
export const depositRewardOffline = id =>
  request({
    url: `/pc/admin/depositReward/offline/${id}`,
    method: "post"
  });
// 积分列表
export const userCreditList = data =>
  request({
    url: `/pc/admin/user/creditList`,
    data: qs.stringify(data),
    method: "post"
  });
// 积分详情
export const userCreditListDetail = data =>
  request({
    url: `/pc/admin/user/userCreditList`,
    data: qs.stringify(data),
    method: "post"
  });
