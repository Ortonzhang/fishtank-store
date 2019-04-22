import dayjs from "dayjs";
export const dateFormat = date => {
  if (date === "" || date === undefined) {
    return "----";
  } else {
    var d = new Date(date);
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
};
export const downloadFile = (data, name) => {
  var url = URL.createObjectURL(
    new Blob([data], {
      type: "application/vnd.ms-excel;charset=utf-8"
    })
  );
  var link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href); // 释放URL 对象
  document.body.removeChild(link);
};
export const formatDate = (date, format = "YYYY-MM-DD") => {
  return dayjs(date).format(format);
};

export const confirmPromise = (that, message) => {
  return new Promise((resolve, reject) => {
    that.$Modal.confirm({
      title: "提示",
      content: `<p>${message}</p>`,
      onOk: () => {
        resolve();
      },
      onCancel: () => {
        reject();
      }
    });
  });
};
