<template lang="pug">
  Card.task-type
    .clearfix(slot='title')
      p 任务分类列表
    Button(slot="extra", type="primary", style="transform:translateY(-4px)", @click="add") 添加
    .div(style="padding: 20px")
      Form(inline, :label-width="80")
        FormItem(label="分类状态：")
          Select(
            clearable,
            v-model="form.status"
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskClassifyStatusMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border :columns="columns" :data="taskTypeList", :loading="loading", style="overflow: unset")
          template(slot-scope="{row, index}" slot="created")
            div {{ row.created | dateHMS }}
          template(slot-scope="{row, index}" slot="onlineTime")
            div {{ row.onlineTime | dateHMS }}
          template(slot-scope="{row, index}" slot="offlineTime")
            div {{ row.offlineTime | dateHMS }}
          template(slot-scope="{row, index}" slot="status")
            Tag( color="success", v-if="row.status === 1") {{ row.statusLabel }}
            Tag( color="error", v-if="row.status === 0") {{ row.statusLabel }}
          template(slot-scope="{ row, index }" slot="action")
            .ButtonGroup
              Button(icon="md-pricetags", @click="edit(row.id)")
              Poptip(
                confirm
                title="确定上线该任务分类吗?"
                @on-ok="online(row.id)"
              )
                Button(icon="ios-arrow-up", v-if="row.status !== 1")
              Poptip(
                confirm
                title="确定下线该任务分类吗?"
                @on-ok="offline(row.id)"
              )
                Button(icon="ios-arrow-down", v-if="row.status === 1")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='taskTypeCount', :current='form.page', @on-change='changePage')
    Modal(
      v-model="modal"
      :title="modalTitle"
      :mask-closable="false"
      ok-text="提交"
    )
      Form(ref="taskTypeFormModal", :rules="ruleValidate", :model="formModal", :label-width="90")
        FormItem(label="分类名称：", prop="name")
          Input(v-model="formModal.name", placeholder="请填写分类名称")
        FormItem(label="分类链接：", prop="landingPage")
          Input(v-model="formModal.landingPage", placeholder="请填写分类链接")
        FormItem(label="分类排序：")
          Input(v-model="formModal.ord", placeholder="请填写分类排序")
        FormItem(label="分类描述：", prop="description")
          Input(v-model="formModal.description", type="textarea", placeholder="请填写分类描述")
      div(slot="footer")
        Button(@click="cancel") 取消
        Button(type="primary", @click="submit") 确定
</template>

<script>
import { mapGetters } from "vuex";
// import payComponent from "./components/pay";
// import changeComponent from "./components/change";
const defalutData = () => {
  return {
    description: "",
    id: "",
    landingPage: "",
    name: "",
    ord: ""
  };
};
export default {
  name: "OrderList",
  data() {
    return {
      form: {
        status: "",
        page: 1,
        pageSize: 10
      },
      formModal: {},
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        landingPage: [
          { required: true, message: "请填写分类链接", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请填写分类描述", trigger: "blur" }
        ]
      },
      columns: [
        { title: "分类ID", key: "id" },
        { title: "分类排序", key: "ord" },
        { title: "分类名称", key: "name" },
        { title: "状态", slot: "status" },
        { title: "添加时间", slot: "created" },
        { title: "上线时间", slot: "onlineTime" },
        { title: "下线时间", slot: "offlineTime" },
        { title: "操作", slot: "action" }
      ],
      loading: false,
      modal: false,
      modalTitle: ""
    };
  },
  computed: {
    ...mapGetters(["taskClassifyStatusMap", "taskTypeCount", "taskTypeList"])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getTaskTypeList", this.form);
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
      this.formModal = Object.assign({}, { ...defalutData() });
      this.modalTitle = "新增分类";
      this.modal = true;
    },
    checkForm(name) {
      return new Promise((resolve, reject) => {
        this.$refs[name].validate(valid => {
          if (valid) {
            resolve("success");
          } else {
            reject();
          }
        });
      });
    },
    async submit() {
      await this.checkForm("taskTypeFormModal");
      let site =
        this.modalTitle === "新增分类" ? "taskGroupAdd" : "taskGroupUpdate";
      await this.$store.dispatch(site, this.formModal);
      this.modal = false;
      await this.getList();
    },
    async online(id) {
      await this.$store.dispatch("taskGroupOnline", id);
      await this.getList();
    },
    async offline(id) {
      await this.$store.dispatch("taskGroupOffline", id);
      await this.getList();
    },
    cancel() {
      this.modal = false;
    },
    async edit(id) {
      let obj = await this.$store.dispatch("taskGroupDetail", id);
      this.formModal = { ...obj };
      this.modalTitle = "修改分类";
      this.modal = true;
    }
  },
  mounted() {
    this.getList();
  },
  filters: {},
  watch: {
    time: value => {
      console.log(value);
      // this.formInline.tradeTimeStart = value ? value[0] : "";
      // this.formInline.tradeTimeEnd = value ? value[1] : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: rgb(79, 255, 113);
}
</style>
