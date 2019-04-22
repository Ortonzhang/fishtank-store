<template lang="pug">
  Card.deposit-active
    .clearfix(slot='title')
      p 积分活动管理
    Button(slot="extra", type="primary", style="transform:translateY(-4px)", @click="add") 添加
    .div(style="padding: 20px")
      Form(inline, :model="form", :label-width="100")
        FormItem(label="活动状态：")
          Select(
            clearable,
            v-model="form.type"
            :style="{width: '200px'}"
          )
            Option(v-for="item in depositRewardStatusMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border, :columns="columns" :data="depositRewardList", :loading="loading", style="overflow: unset")
          template(slot-scope="{row, index}" slot="created")
            div {{ row.created | date }}
          template(slot-scope="{row, index}" slot="onlineTime")
            div {{ row.onlineTime | date }}
          template(slot-scope="{row, index}" slot="offlineTime")
            div {{ row.offlineTime | date }}
          template(slot-scope="{row, index}" slot="status")
            Tag( color="success", v-if="row.status === 1") {{ row.statusLabel }}
            Tag( color="error", v-if="row.status === 0") {{ row.statusLabel }}
          template(slot-scope="{row, index}" slot="isShow")
            Tag( color="success", v-if="row.isShow === 1") {{ row.isShowLabel }}
            Tag( color="error", v-if="row.isShow === 0") {{ row.isShowLabel }}
          template(slot-scope="{ row, index }" slot="action")
            ButtonGroup
              Button(icon="md-pricetags", @click="edit(row.id)", title="修改")
              Button(icon="ios-arrow-up", v-if="row.status !== 1", @click="online(row.id)", title="上线")
              Button(icon="ios-arrow-down", v-if="row.status === 1", @click="offline(row.id)", title="下线")
              Button(icon="ios-bulb-outline", v-if="row.isShow === 1", @click="hide(row.id)", title="隐藏")
              Button(icon="ios-bulb", v-if="row.isShow !== 1", @click="show(row.id)", title="显示")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='depositRewardCount', :current='form.page', @on-change='changePage')
    Modal(
      v-model="modal"
      :title="modalTitle"
      :mask-closable="false"
    )
      Form(ref="depositActiveFormModal", :rules="ruleValidate", :model="formModal", :label-width="120")
        FormItem(label="活动标题：", prop="name")
          Input(v-model="formModal.name", placeholder="请填写活动标题")
        FormItem(label="充值金额：", prop="price")
          Input(v-model="formModal.price", placeholder="请填写充值金额")
        FormItem(label="充值积分：", prop="deposit")
          Input(v-model="formModal.deposit", placeholder="请填写充值积分")
        FormItem(label="赠送积分：", prop="reward")
          Input(v-model="formModal.reward", placeholder="请填写赠送积分")
        FormItem(label="活动排序：")
          Input(v-model="formModal.ord",  placeholder="请填写活动排序")
        FormItem(label="可见性：")
          i-switch(size="large", v-model="formModal.isShow", :true-value="1", :false-value="0")
            span(slot="open") 显示
            span(slot="close") 隐藏
      div(slot="footer")
        Button(@click="cancel") 取消
        Button(type="primary", @click="submit") 确定
</template>

<script>
import { mapGetters } from "vuex";
import { confirmPromise, formatDate } from "@/utils/handle";
const defaultData = () => {
  return {
    deposit: "",
    id: "",
    isShow: 0,
    name: "",
    ord: "",
    price: "",
    reward: ""
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
        { title: "排序", key: "ord" },
        { title: "活动标题", key: "name" },
        { title: "充值金额", key: "price" },
        { title: "充值积分", key: "deposit" },
        { title: "赠送积分", key: "reward" },
        { title: "状态", slot: "status" },
        { title: "是否可见", slot: "isShow" },
        { title: "添加时间", slot: "created" },
        { title: "上线时间", slot: "onlineTime" },
        { title: "下线时间", slot: "offlineTime" },
        { title: "操作", slot: "action", width: "200" }
      ],
      loading: false,
      modal: false,
      modalTitle: "",
      time: "",
      formModal: defaultData(),
      ruleValidate: {
        name: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: "blur"
          }
        ],
        deposit: [
          { required: true, message: "请填写充值积分", trigger: "blur" }
        ],
        reward: [
          { required: true, message: "请填写赠送积分", trigger: "blur" }
        ],
        isShow: [
          { required: true, message: "请选择活动可见性", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      "depositRewardStatusMap",
      "depositRewardList",
      "depositRewardCount"
    ])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("depositRewardList", this.form);
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
      this.modalTitle = "新增充值活动";
      this.modal = true;
    },
    async online(id, status) {
      await confirmPromise(this, "确定上线该活动吗?");
      await this.$store.dispatch("depositRewardOnline", id);
      await this.getList();
    },
    async offline(id, status) {
      await confirmPromise(this, "确定下线该活动吗?");
      await this.$store.dispatch("depositRewardOffline", id);
      await this.getList();
    },
    async hide(id) {
      await confirmPromise(this, "确定隐藏该活动吗?");
      await this.$store.dispatch("depositRewardHide", id);
      await this.getList();
    },
    async show(id) {
      await confirmPromise(this, "确定显示该活动吗?");
      await this.$store.dispatch("depositRewardShow", id);
      await this.getList();
    },
    cancel() {
      this.modal = false;
      this.getList();
    },
    async edit(id) {
      this.modalTitle = "修改充值活动";
      this.formModal = await this.$store.dispatch("depositRewardDetail", id);
      this.formModal.price = String(this.formModal.price);
      this.formModal.reward = String(this.formModal.reward);
      this.formModal.deposit = String(this.formModal.deposit);
      this.modal = true;
    },
    async submit() {
      await this.checkForm("depositActiveFormModal");
      let site = this.formModal.id ? "depositRewardUpdate" : "depositRewardAdd";
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
