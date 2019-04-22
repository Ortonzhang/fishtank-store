import request from "@/utils/request";

export const tradePlatformList = () =>
  request({ url: `/pc/order/tradePlatformList`, method: "post" });

export const tradeStatusList = () =>
  request({ url: `/pc/order/tradeStatusList`, method: "post" });

// 产品状态列表
export const auditStatusList = () =>
  request({ url: `/pc/product/auditStatusList`, method: "post" });

// 结算方式列表
export const feeTypeList = () =>
  request({ url: `/pc/product/feeTypeList`, method: "post" });

// 产品投放平台列表
export const platformList = () =>
  request({ url: `/pc/product/platformList`, method: "post" });
