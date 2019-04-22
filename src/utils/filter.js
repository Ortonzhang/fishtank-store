import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("date", function(date) {
  if (date) {
    var d = new Date(date);
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  } else {
    return "----";
  }
});

Vue.filter("dateHMS", function(date) {
  if (date) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return "----";
  }
});
