import request from "@/utils/request";
import qs from "qs";
// 登录
export const getUserList = data =>
  request({
    url: "/pc/admin/user/userList",
    method: "post",
    data: qs.stringify(data)
  });
