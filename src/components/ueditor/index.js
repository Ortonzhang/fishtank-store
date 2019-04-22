import Vue from "vue";
// editor
import Vueditor from "vueditor";

import "vueditor/dist/style/vueditor.min.css";
let config = {
  toolbar: [
    "removeFormat",
    "undo",
    "redo",
    "|",
    "elements",
    "fontName",
    "fontSize",
    "foreColor",
    "backColor",
    "divider",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "links",
    "divider",
    "subscript",
    "superscript",
    "divider",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "|",
    "indent",
    "outdent",
    "insertOrderedList",
    "insertUnorderedList",
    "table",
    "fullscreen",
    "sourceCode"
  ],
  fontName: [
    { val: "arial black" },
    { val: "times new roman" },
    { val: "Courier New" }
  ],
  fontSize: ["12px", "14px", "16px", "18px", "20px", "22px"],
  uploadUrl: ""
};
Vue.use(Vueditor, config);
