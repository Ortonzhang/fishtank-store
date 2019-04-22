const mixins = {
  methods: {
    /**
     *
     * @param {*} form name
     * @param {*} 需要循环的数据 返回formData
     */
    checkForm(name, data) {
      return new Promise((resolve, reject) => {
        this.$refs[name].validate(valid => {
          if (valid) {
            if (data) {
              var formData = new FormData();
              for (let [key, value] of Object.entries(data)) {
                if (value !== null) {
                  formData.append(key, value);
                }
              }
              resolve(formData);
            }
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
};
export default mixins;
