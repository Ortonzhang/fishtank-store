<template lang="pug">
  Card.task-type
    .clearfix(slot='title')
      p 任务列表
    Button(slot="extra", type="primary", style="transform:translateY(-4px)", @click="add") 添加
    .div(style="padding: 20px")
      Form(inline, :model="form", :label-width="100")
        FormItem(label="任务标题：")
          Input(v-model="form.name", :style="{width: '200px'}" placeholder="请输入任务标题")
        FormItem(label="任务类型：")
          Select(
            clearable,
            v-model="form.taskType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskTypeStatusMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="任务分类：")
          Select(
            filterable
            remote
            clearable
            :loading="selectLoading",
            v-model="form.groupId",
            :remote-method="getTaskTypeList",
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskTypeList", :key="item.value", :value="item.value") {{ item.name }}
        FormItem(label="任务结算方式：")
          Select(
            clearable,
            v-model="form.feeType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskClearingFormMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="是否联登：")
          Select(
            clearable,
            v-model="form.isCologin"
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskConloginMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="任务状态：")
          Select(
            clearable,
            v-model="form.status"
            :style="{width: '200px'}"
          )
            Option(v-for="item in taskClassifyStatusMap", :key="item.key", :value="item.key") {{ item.value }}    
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border, :columns="columns" :data="taskList", :loading="loading", style="overflow: unset")
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
              Button(icon="ios-arrow-up", v-if="row.status !== 1", @click="online(row.id)")
              Button(icon="ios-arrow-down", v-if="row.status === 1", @click="offline(row.id)")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='taskCount', :current='form.page', @on-change='changePage')
    task-edit(:id="id", :modal="modal", @hide="hide")
</template>

<script>
import { mapGetters } from "vuex";
import { confirmPromise } from "@/utils/handle";
import taskEdit from "../components/edit";
export default {
  name: "OrderList",
  data() {
    return {
      form: {
        status: "",
        page: 1,
        pageSize: 10
      },
      columns: [
        { title: "任务ID", key: "id", fixed: "left", width: "100" },
        { title: "排序", key: "ord", width: 100 },
        { title: "任务标题", key: "name", width: 100 },
        { title: "任务类型", key: "taskTypeLabel", width: 120 },
        { title: "任务分类", key: "taskTypeLabel", width: 120 },
        { title: "任务结算方式", key: "feeTypeLabel", width: 120 },
        { title: "是否联登", key: "isConloginLabel", width: "100" },
        { title: "任务频率", key: "taskLimit", width: "100" },
        { title: "任务期限", key: "taskExpire", width: "100" },
        { title: "合作单价", key: "cooperationPrice", width: "100" },
        { title: "使用单价", key: "taskPrice", width: "100" },
        { title: "获取积分", key: "score", width: "100" },
        { title: "状态", slot: "status", width: "100" },
        { title: "添加时间", slot: "created", width: "100" },
        { title: "上线时间", slot: "onlineTime", width: "100" },
        { title: "下线时间", slot: "offlineTime", width: "100" },
        { title: "操作", slot: "action", width: 200, fixed: "right" }
      ],
      loading: false,
      modal: false,
      id: "",
      selectLoading: false,
      taskTypeList: []
    };
  },
  computed: {
    ...mapGetters([
      "taskTypeStatusMap",
      "taskClearingFormMap",
      "taskConloginMap",
      "taskClassifyStatusMap",
      "taskList",
      "taskCount"
    ])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getTaskList", this.form);
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
      this.id = "";
      this.modal = true;
    },
    async online(id) {
      await confirmPromise(this, "确定上线该任务分类吗?");
      await this.$store.dispatch("taskOnline", id);
      await this.getList();
    },
    async offline(id) {
      await confirmPromise(this, "确定下线该任务分类吗?");
      await this.$store.dispatch("taskOffline", id);
      await this.getList();
    },
    hide() {
      this.modal = false;
      this.getList();
    },
    async edit(id) {
      this.id = id;
      this.modal = true;
    },
    async getTaskTypeList(name) {
      if (name !== "") {
        this.selectLoading = true;
        this.taskTypeList = await this.$store.dispatch(
          "taskGetNameValueListByName",
          {
            name
          }
        );
        this.selectLoading = false;
      } else {
        this.taskTypeList = [];
      }
    }
  },
  mounted() {
    this.getList();
  },
  components: {
    taskEdit
  },
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
