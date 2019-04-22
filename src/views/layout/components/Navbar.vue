<template lang="pug">
  Header(:style="{background: '#fff', height: '60px', boxShadow: '0 1px 3px 1px rgba(0,0,0,.1)', paddingLeft: '0'}")
    Row(type="flex", justify="space-between")
      //- Col(:span="6")
        Button(type="text", @click="toggleSideBar", :style="{boxShadow: 'none'}")
          Icon(class="fa menu-btn", :class="{'fa-dedent':sidebar.opened,'fa-indent':!sidebar.opened}")
      Col.t-right(:span="24")
        Button(type="text", :style="{fontSize: '16px', boxShadow: 'none'}" @click="toogleScreen") 
          Icon(type="md-contract", v-if="isFullScreen")
          Icon(type="md-expand", v-else)
        Dropdown.navbar-dropdown
          .user
            Icon(type="logo-octocat", :style="{marginRight: '10px'}")
            span {{ name || '未知' }}
          DropdownMenu(slot="list")
            DropdownItem(@click.native="change") 修改密码
            DropdownItem(@click.native="logout") 退出
    //- el-dialog(title="修改密码", :visible.sync="dialogVisible", width="30%", :close-on-click-modal="false")
      el-form(:model="form", label-width="100px", ref="editPsd", :rules="rules" )
        el-form-item(
          label='原密码', 
          prop="oldPassword"
        )
          el-input(v-model='form.oldPassword', placeholder="请输入原密码",type="password")
        el-form-item(
          label='新密码', 
          prop="newPassword"
        )
          el-input(v-model='form.newPassword', placeholder="请输入新密码", type="password")
        el-form-item(
          label='重复新密码', 
          prop="reNewPassword"
        )
          el-input(v-model='form.reNewPassword', placeholder="请重复新密码", type="password")
      .dialog-footer(slot='footer')
        Button(@click='dialogVisible = false') 取 消
        Button(type='primary', @click='onSubmit') 确 定
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isFullScreen: false,
      dialogVisible: false,
      form: {
        oldPassword: "",
        newPassword: ""
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入原密码" }],
        newPassword: [{ required: true, message: "请输入新密码" }],
        reNewPassword: [
          { required: true, message: "请再次输入新密码" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store
        .dispatch("LogOut")
        .then(res => {
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          this.$router.push({ path: "/login" });
        });
    },
    change() {
      this.dialogVisible = true;
    },
    checkFormState() {
      return new Promise((resolve, reject) => {
        this.$refs["editPsd"].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject("ss");
          }
        });
      });
    },
    async onSubmit() {
      await this.checkFormState();
      await this.$store.dispatch("updatePassword", this.form);
      this.dialogVisible = false;
      this.$router.push({ path: "/login" });
    },
    toogleScreen() {
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        this.requestFullScreen();
      } else {
        this.exitFullscreen();
      }
    },
    requestFullScreen() {
      var de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    exitFullscreen() {
      var de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-header {
  border-bottom: 1px solid #eef1f7;
  .menu-btn {
    color: rgb(34, 34, 34);
  }
}

.logo {
  margin-right: 20px;
  display: inline-block;
  text-align: left;
  font-size: 20px;
  color: rgb(34, 34, 34);
  img {
    margin-top: 20px;
    width: 150px;
    // transform: scale(.8);
  }
  b {
    padding-left: 12px;
  }
}
.t-right {
  text-align: right;
}
.heading-avatar {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
}
</style>
