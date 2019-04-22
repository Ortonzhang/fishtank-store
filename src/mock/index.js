import Mock from "mockjs";
Mock.mock(/\/user\/login/, "post", () => {
  return {
    data: {
      userName: "老板",
      roles: ["admin"],
      token: +new Date()
    },
    msg: "",
    status: 0
  };
});

export default Mock;
