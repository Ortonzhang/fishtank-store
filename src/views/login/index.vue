<template lang="pug">
  .login-page
    Card.login-form
      p(slot='title') 登录
      Form(ref='formInline', :model='formInline', :rules='ruleInline')
        FormItem(prop='mobile')
          Input(type='text', v-model='formInline.mobile', placeholder='Username')
            Icon(type='ios-person-outline', slot='prepend')
        FormItem(prop='password')
          Input(type='password', v-model='formInline.password', placeholder='Password')
            Icon(type='ios-lock-outline', slot='prepend')
        FormItem
          Button(type='primary', @click="login", style="width: 100%") 登录
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        mobile: "13666666666",
        password: ""
      },
      ruleInline: {
        mobile: [
          { required: true, message: "请输入用户名！", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码！", trigger: "blur" }]
      }
    };
  },
  methods: {
    checkForm(name) {
      return new Promise((resolve, reject) => {
        this.$refs[name].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject("");
          }
        });
      });
    },
    async login() {
      await this.checkForm("formInline");
      await this.$store.dispatch("Login", this.formInline);
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$bg: "~@/assets/bg.jpg";
.login-page {
  width: 100%;
  height: 100%;
  background: url($bg) center center no-repeat;
  position: absolute;
  background-size: cover;
  background-position: 50%;
  position: relative;
  .login-form {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }
}
</style>
