<template lang="pug">
  Card.message-list
    .clearfix(slot='title')
      p 消息列表
    Button(slot="extra", type="primary", style="transform:translateY(-4px)", @click="add") 添加
    .div(style="padding: 20px")
      Form(inline, :model="form", :label-width="100")
        FormItem(label="推送状态：")
          Select(
            clearable,
            v-model="form.status"
            :style="{width: '200px'}"
          )
            Option(v-for="item in appMessageStatusEnum", :key="item.value", :value="item.value") {{ item.name }}
        FormItem(label="推送类型：")
          Select(
            clearable,
            v-model="form.pushType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in appMessagePushTypeList", :key="item.value", :value="item.value") {{ item.name }}
        FormItem(label="推送设备：")
          Select(
            clearable,
            v-model="form.deviceType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in appMessageDeviceTypeList", :key="item.value", :value="item.value") {{ item.name }}
        //- FormItem(label="时间")
          DatePicker(v-model="time", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px")
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border, :columns="columns" :data="appMessageList", :loading="loading")
          template(slot-scope="{row, index}" slot="created")
            div {{ row.created | date }}
          template(slot-scope="{row, index}" slot="status")
            Tag( color="success", v-if="row.status === 1") {{ row.statusLabel }}
            Tag( color="error", v-if="row.status === 0") {{ row.statusLabel }}
          template(slot-scope="{ row, index }" slot="action")
            ButtonGroup
              Button(icon="md-pricetags", @click="edit(row.id)", title="修改")
              Button(icon="ios-send", v-if="row.status !== 1", @click="send(row.id)", title="推送")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='appMessageCount', :current='form.page', @on-change='changePage')
    Modal(
      v-model="modal"
      :title="modalTitle"
      :mask-closable="false"
    )
      Form(ref="messageFormModal", :rules="rules", :model="formModal", :label-width="120")
        FormItem(label="推送标题：", prop="title")
          Input(v-model="formModal.title", placeholder="请填写推送标题")
        FormItem(label="推送设备：", prop="deviceType")
          Select(
            clearable,
            v-model="formModal.deviceType"
          )
            Option(v-for="item in appMessageDeviceTypeList", :key="item.value", :value="''+item.value") {{ item.name }}
        
        FormItem(label="目标用户：" prop="targeUser")
          Select(
            clearable,
            v-model="formModal.targeUser"
          )
            Option(value="0") 全部用户
            Option(value="1") 部分用户
        FormItem(label="用户注册时间：", v-if="formModal.targeUser == 1")
          DatePicker(v-model="registTime", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 100%")
        FormItem(label="最近登录时间：", v-if="formModal.targeUser == 1")
          DatePicker(v-model="loginTime", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 100%")
        FormItem(label="推送内容：", prop="content")
          Input(v-model="formModal.content", type="textarea", placeholder="请填写推送内容")
      div(slot="footer")
        Button(@click="cancel") 取消
        Button(type="primary", @click="submit") 确定
</template>

<script>
import { mapGetters } from "vuex";
import { confirmPromise, formatDate } from "@/utils/handle";
const defaultData = () => {
  return {
    content: "",
    deviceType: "",
    id: "",
    loginEnd: "",
    loginStart: "",
    registerEnd: "",
    registerStart: "",
    targeUser: "",
    title: ""
  };
};
export default {
  name: "messageList",
  data() {
    return {
      form: {
        type: "",
        start: "",
        end: "",
        page: 1,
        pageSize: 10
      },
      columns: [
        { title: "ID", key: "id" },
        { title: "时间", slot: "created" },
        { title: "通知标题", key: "title" },
        { title: "推送数量", key: "targetUserCount" },
        { title: "推送类型", key: "pushTypeLabel" },
        { title: "推送设备", key: "deviceTypeLabel" },
        { title: "推送状态", slot: "status" },
        { title: "操作", slot: "action" }
      ],
      loading: false,
      modal: false,
      modalTitle: "",
      registTime: "",
      loginTime: "",
      formModal: defaultData(),
      rules: {
        title: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        content: [
          { required: true, message: "请填写推送内容", trigger: "blur" }
        ],
        deviceType: [
          { required: true, message: "请选择推送设备", trigger: "change" }
        ],
        targeUser: [
          { required: true, message: "请选择目标用户", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      "appMessageStatusEnum",
      "appMessageDeviceTypeList",
      "appMessagePushTypeList",
      "appMessageList",
      "appMessageCount"
    ])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("appMessageList", this.form);
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    serch() {
      this.form.page = 1;
      this.getList();
    },
    changePage(value) {
      this.form.page = value;
      this.getList();
    },
    add() {
      this.modalTitle = "新增推送消息";
      this.modal = true;
      this.formModal = defaultData();
    },
    async send(id) {
      await confirmPromise(this, "是否立即推送该消息?");
      await this.$store.dispatch("appMessageSend", id);
      await this.getList();
    },
    cancel() {
      this.modal = false;
    },
    async edit(id) {
      this.modalTitle = "修改推送消息";
      let obj = await this.$store.dispatch("appMessageDetail", id);
      obj.targeUser = String(obj.targeUser);
      obj.deviceType = String(obj.deviceType);
      this.formModal = obj;
      this.modal = true;
    },
    async submit() {
      await this.checkForm("messageFormModal");
      let site = this.formModal.id ? "appMessageUpdate" : "appMessageAdd";
      await this.$store.dispatch(site, this.formModal);
      this.modal = false;
      await this.getList();
    }
  },
  mounted() {
    this.$store.dispatch("appMessageStatusEnum");
    this.$store.dispatch("appMessageDeviceTypeList");
    this.$store.dispatch("appMessagePushTypeList");
    this.getList();
  },
  watch: {
    time: function(value) {
      value[0]
        ? (() => {
            this.form.start = formatDate(value[0]);
            this.form.end = formatDate(value[1]);
          })()
        : (() => {
            this.form.start = "";
            this.form.end = "";
          })();
    },
    loginTime: function(value) {
      value[0]
        ? (() => {
            this.formModal.loginStart = formatDate(value[0]);
            this.formModal.loginEnd = formatDate(value[1]);
          })()
        : (() => {
            this.formModal.loginStart = "";
            this.formModal.loginEnd = "";
          })();
    },
    registTime: function(value) {
      value[0]
        ? (() => {
            this.formModal.registerStart = formatDate(value[0]);
            this.formModal.registerEnd = formatDate(value[1]);
          })()
        : (() => {
            this.formModal.registerStart = "";
            this.formModal.registerEnd = "";
          })();
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: rgb(79, 255, 113);
}
</style>
