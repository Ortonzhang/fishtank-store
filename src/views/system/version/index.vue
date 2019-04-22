<template lang="pug">
  Card.system-version
    .clearfix(slot='title')
      p 版本管理
    Button(slot="extra", type="primary", style="transform:translateY(-4px)", @click="add") 添加
    .div(style="padding: 20px")
      Form(inline, :model="form", :label-width="100")
        FormItem(label="端口：")
          Select(
            clearable,
            v-model="form.type"
            :style="{width: '200px'}"
          )
            Option(v-for="item in versionPlatformTypeMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="时间")
          DatePicker(v-model="time", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px")
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border, :columns="columns" :data="versionList", :loading="loading", style="overflow: unset")
          template(slot-scope="{row, index}" slot="created")
            div {{ row.created | date }}
          template(slot-scope="{row, index}" slot="type")
              div {{ row.type === '1' ? '安卓' : 'IOS' }}
          template(slot-scope="{row, index}" slot="status")
            Tag( color="success", v-if="row.status === 1") {{ row.statusLabel }}
            Tag( color="error", v-if="row.status === 0") {{ row.statusLabel }}
          template(slot-scope="{ row, index }" slot="action")
            ButtonGroup
              Button(icon="md-pricetags", @click="edit(row.id)", title="修改")
              Button(icon="ios-arrow-up", v-if="row.status !== 1", @click="online(row.id, 1)", title="上线")
              Button(icon="ios-arrow-down", v-if="row.status === 1", @click="offline(row.id, 0)", title="下线")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='versionCount', :current='form.page', @on-change='changePage')
    Modal(
      v-model="modal"
      :title="modalTitle"
      :mask-closable="false"
    )
      Form(ref="taskTypeFormModal", :rules="ruleValidate", :model="formModal", :label-width="120")
        FormItem(label="app端口：", prop="type")
          Select(
            clearable,
            v-model="formModal.type"
          )
            Option(v-for="item in versionPlatformTypeMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="下载地址：", prop="url")
          Input(v-model="formModal.url", placeholder="请填写下载地址")
        FormItem(label="最低支持版本：", prop="lowestVersion")
          Input(v-model="formModal.lowestVersion", placeholder="请填写最低支持版本")
        FormItem(label="最高支持版本：", prop="currentVersion")
          Input(v-model="formModal.currentVersion", placeholder="请填写最高支持版本")
        FormItem(label="版本描述：", prop="description")
          Input(v-model="formModal.description", type="textarea", placeholder="请填写版本描述")
      div(slot="footer")
        Button(@click="cancel") 取消
        Button(type="primary", @click="submit") 确定
</template>

<script>
import { mapGetters } from "vuex";
import { confirmPromise, formatDate } from "@/utils/handle";
const defaultData = () => {
  return {
    type: "",
    url: "",
    lowestVersion: "",
    currentVersion: "",
    description: ""
  };
};
export default {
  name: "OrderList",
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
        { title: "时间", slot: "created" },
        { title: "端口", slot: "type" },
        { title: "下载地址", key: "url" },
        { title: "状态", slot: "status" },
        { title: "最低支持版本", key: "lowestVersion" },
        { title: "最高支持版本", key: "currentVersion" },
        { title: "版本更新内容", key: "description" },
        { title: "操作", slot: "action" }
      ],
      loading: false,
      modal: false,
      modalTitle: "",
      time: "",
      formModal: defaultData(),
      ruleValidate: {
        type: [{ required: true, message: "请选择app类型", trigger: "blur" }],
        url: [
          {
            required: true,
            type: "url",
            message: "请填写下载地址",
            trigger: "blur"
          }
        ],
        lowestVersion: [
          { required: true, message: "请填写最低要求版本", trigger: "blur" }
        ],
        currentVersion: [
          { required: true, message: "请填写最高要求版本", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请填写更新描述", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["versionPlatformTypeMap", "versionList", "versionCount"])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getVersionList", this.form);
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
      this.modalTitle = "新增版本";
      this.modal = true;
    },
    async online(id, status) {
      await confirmPromise(this, "确定上线该版本吗?");
      await this.$store.dispatch("versionUpdateStatus", { id, status });
      await this.getList();
    },
    async offline(id, status) {
      await confirmPromise(this, "确定下线该版本吗?");
      await this.$store.dispatch("versionUpdateStatus", { id, status });
      await this.getList();
    },
    cancel() {
      this.modal = false;
      this.getList();
    },
    async edit(id) {
      this.modalTitle = "修改版本";
      this.formModal = await this.$store.dispatch("getVersionDetail", id);
      this.formModal.type = String(this.formModal.type);
      this.modal = true;
    },
    async submit() {
      let site = this.formModal.id ? "versionUpdate" : "versionAdd";
      await this.$store.dispatch(site, this.formModal);
      this.modal = false;
      await this.getList();
    }
  },
  mounted() {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: rgb(79, 255, 113);
}
</style>
