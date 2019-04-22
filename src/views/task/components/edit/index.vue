<template lang="pug">
Drawer(
  v-model="modal"
  :title="modalTitle",
  width="820"
  :mask-closable="false",
  :closable="false",
  :styles="styles"
)
  Form(ref="taskEditFormModal", :rules="ruleValidate", :model="formModal", :label-width="100")
    FormItem(label="任务标题：", prop="name")
      Input(v-model="formModal.name", placeholder="请填写任务标题")
    FormItem(label="任务描述：", prop="taskDesc")
      Input(v-model="formModal.taskDesc", placeholder="请填写分类链接", type="textarea")
    Row
      Col(span="12")
        FormItem(label="任务类型：", prop="taskType")
          Select(
            clearable,
            placeholder="请选择任务类型"
            v-model="formModal.taskType",
          )
            Option(v-for="item in taskTypeStatusMap", :key="item.key", :value="item.key") {{ item.value }}
      Col(span="12")
        FormItem(label="任务分类：", prop="groupId")
          Select(
            filterable
            remote
            clearable
            :loading="selectLoading",
            v-model="formModal.groupId",
            :remote-method="getTaskTypeList"
          )
            Option(v-for="item in taskTypeList", :key="item.value", :value="item.value") {{ item.name }}
            
    Row
      Col(span="12")
        FormItem(label="积分限制：", prop="creditLimit")
          Input(v-model="formModal.creditLimit", placeholder="请填写积分限制")
      Col(span="12")
        FormItem(label="获得积分：", prop="creditCashback")
          Input(v-model="formModal.creditCashback", placeholder="请填写获得积分")
    Row
      Col(span="12")
        FormItem(label="消耗积分：", prop="creditConsume")
          Input(v-model="formModal.creditConsume", placeholder="请填写消耗积分")
      Col(span="12")
        FormItem(label="任务频率：")
          div.task-frequency-box
            Input(v-model.number="formModal.taskLimit",  )
            | 天
            Input(v-model.number="formModal.taskCount",  )
            | 次
    Row
      Col(span="12")
        FormItem(label="任务排序：", prop="ord")
          Input(v-model="formModal.ord", placeholder="请填写任务排序")
      Col(span="12")
        FormItem(label="任务链接：", prop="landingPage")
          Input(v-model="formModal.landingPage",  placeholder="请填写任务链接")
    Row
      Col(span="12")
        FormItem(label="任务结算方式：", porp="feeType")
          Select(
            clearable,
            v-model="formModal.feeType"
          )
            Option(v-for="item in taskClearingFormMap", :key="item.key", :value="item.key") {{ item.value }}
      Col(span="12")
        FormItem(label="任务期限（小时）：", prop="taskExpire")
          Input(v-model="formModal.taskExpire", placeholder="请填写任务期限（小时）")
    Row
      Col(span="12")
        FormItem(label="合作单价（元）：", prop="cooperationPrice")
          Input(v-model="formModal.cooperationPrice", placeholder="请填写合作单价")
      Col(span="12")
        FormItem(label="使用单价（元）：", prop="taskPrice")
          Input(v-model="formModal.taskPrice", placeholder="请填写使用单价")
    Row
      Col(span="12")
        FormItem(label="是否联登：", prop="isCologin")
          Select(
            clearable,
            v-model="formModal.isCologin"
          )
            Option(v-for="item in taskConloginMap", :key="item.key", :value="item.key") {{ item.value }}
      Col(span="12", v-if="formModal.isCologin == 1")
        FormItem(label="公司名称：", prop="companyName")
          Input(v-model="formModal.companyName", placeholder="请填写公司名称")
    Row
      Col(span="12")
        FormItem(label="任务图标：")
          div(style="width: 180px; position: relative;")
            Upload.avatar-uploader(
              :show-upload-list='false', 
              accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png", 
              :max-size='2048', 
              :before-upload='handleBeforeUpload',
              :on-exceeded-size="handleMaxSize",
              action='', 
              :disabled="!!imageUrl"
            )
              img.avatar(v-if='imageUrl', :src='imageUrl')
              Icon.avatar-uploader-icon(type='ios-camera', size='28', v-else)
            .img-delete(v-if='imageUrl', @click="removeImg")
              Icon.el-icon-delete(type="md-trash")
    FormItem(label="产品说明：", prop="terms")
      Input(v-model="formModal.terms", type="textarea", placeholder="请填写产品说明")
    FormItem(label="使用条件：", prop="rules")
      Input(v-model="formModal.rules", type="textarea", placeholder="请填写使用条件")
    FormItem(label="其他说明：", prop="remark")
      Input(v-model="formModal.remark", type="textarea", placeholder="请填写其他说明")
  div(class="use-drawer-footer")
    Button(@click="cancel", style="margin-right: 8px") 取消
    Button(type="primary", @click="submit") 确定
</template>
<script>
import { mapGetters } from "vuex";
const defaultData = () => {
  return {
    id: "",
    name: "",
    taskDesc: "",
    taskType: "",
    groupId: "",
    creditLimit: "",
    creditCashback: "",
    creditConsume: "",
    taskCount: "",
    taskLimit: "",
    ord: "",
    feeType: "",
    taskExpire: "",
    cooperationPrice: "",
    taskPrice: "",
    isCologin: "",
    companyName: "",
    logoFile: "",
    landingPage: "",
    terms: "",
    rules: "",
    remark: ""
  };
};
export default {
  props: ["modal", "id"],
  data() {
    return {
      ruleValidate: {
        name: [
          { required: true, message: "请输入任务标题", trigger: "change" }
        ],
        taskDesc: [
          { required: true, message: "请输入任务描述", trigger: "change" }
        ],
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        groupId: [
          { required: true, message: "请选择任务分类", trigger: "change" }
        ],
        creditLimit: [
          { required: true, message: "请输入积分限制", trigger: "change" }
        ],
        creditCashback: [
          { required: true, message: "请输入获得积分", trigger: "change" }
        ],
        creditConsume: [
          { required: true, message: "请输入消耗积分", trigger: "change" }
        ],
        taskLimit: [
          { required: true, message: "请输入任务频率天数", trigger: "change" }
        ],
        taskCount: [
          { required: true, message: "请输入任务频率次数", trigger: "change" }
        ],
        ord: [{ required: true, message: "请输入任务排序", trigger: "change" }],
        taskExpire: [
          { required: true, message: "请输入任务期限", trigger: "change" }
        ],
        cooperationPrice: [
          { required: true, message: "请输入合作单价", trigger: "change" }
        ],
        taskPrice: [
          { required: true, message: "请输入使用单价", trigger: "change" }
        ],
        isCologin: [
          { required: true, message: "请选择是否联登", trigger: "change" }
        ],
        feeType: [
          { required: true, message: "请选择任务结算方式", trigger: "change" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        landingPage: [
          { required: true, message: "请输入任务链接", trigger: "change" }
        ]
      },
      formModal: defaultData(),
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      imageUrl: "",
      taskTypeList: [],
      selectLoading: false
    };
  },
  methods: {
    cancel() {
      this.$emit("hide");
    },
    async getInfo() {
      if (this.id) {
        let obj = await this.$store.dispatch("taskDetail", this.id);
        obj.isCologin = String(obj.isCologin);
        obj.taskPrice = String(obj.taskPrice);
        obj.taskType = String(obj.taskType);
        obj.creditCashback = String(obj.creditCashback);
        obj.creditLimit = String(obj.creditLimit);
        obj.creditConsume = String(obj.creditConsume);
        obj.taskExpire = String(obj.taskExpire || "");
        obj.feeType = String(obj.feeType);
        obj.ord = String(obj.ord);
        this.formModal = { ...obj };
        this.imageUrl = obj.logo;
      } else {
        this.formModal = defaultData();
        this.imageUrl = "";
      }
    },
    async submit() {
      if (this.formModal.taskLimit === "" || this.formModal.taskCount === "") {
        this.$Notice.warning({
          title: "错误",
          desc: "请设置任务频率"
        });
        return Promise.reject("请设置任务频率");
      }
      if (!this.formModal.logoFile && !this.formModal.id) {
        this.$Notice.warning({
          title: "错误",
          desc: "请上传任务图标"
        });
        return Promise.reject("请上传任务图标");
      }
      let formData = await this.checkForm("taskEditFormModal", this.formModal);
      let site = this.id ? "taskUpdate" : "taskAdd";
      await this.$store.dispatch(site, formData);
      this.$emit("hide");
    },
    handleBeforeUpload(file) {
      if (file.size / 1000 > 1000) {
        this.$Notice.warning({
          title: "错误",
          desc: "文件 " + file.name + " 太大，不能超过 1M。"
        });
      } else {
        this.imageUrl = URL.createObjectURL(file);
        this.formModal.logoFile = file;
      }
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    removeImg() {
      this.imageUrl = "";
      URL.revokeObjectURL(this.formModal.logoFile);
      this.formModal.logoFile = "";
    },
    async getTaskTypeList(name) {
      if (name !== "") {
        this.selectLoading = true;
        let list = await this.$store.dispatch("taskGetNameValueListByName", {
          name
        });
        this.taskTypeList = list.map(item => {
          return {
            name: item.name,
            value: String(item.value)
          };
        });
        this.selectLoading = false;
      } else {
        this.taskTypeList = [];
      }
    }
  },
  computed: {
    modalTitle: function() {
      return this.id ? "修改任务" : "新增任务";
    },
    ...mapGetters([
      "taskTypeStatusMap",
      "taskTypeStatusMap",
      "taskClearingFormMap",
      "taskConloginMap",
      "taskClassifyStatusMap"
    ])
  },
  watch: {
    modal: function(value) {
      value && this.getInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.task-frequency-box {
  display: flex;
  .ivu-input-wrapper {
    width: 100px;
    margin: 0 10px;
  }
}
</style>
