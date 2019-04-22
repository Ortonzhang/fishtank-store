import request from "@/utils/request";
import qs from "qs";
export function login(data) {
  return request({
    url: "/pc/admin/login",
    method: "post",
    data: qs.stringify(data)
  });
}

export function logout() {
  return request({
    url: "/pc/employee/logout",
    method: "post"
  });
}
// 修改密码
export const updatePassword = data =>
  request({
    url: "/pc/employee/updatePassword",
    method: "post",
    data: qs.stringify(data)
  });
