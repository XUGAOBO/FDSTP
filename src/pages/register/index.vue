<template>
    <article class="register">
      <h1>注册</h1>
      <section class="register-content">
        <el-form  label-position="right" :model="formData" status-icon :rules="rules" size="medium" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="经营范围">
            <!-- <el-input v-model="formData.email"></el-input> -->
            <el-select :style="{width:'500px'}" v-model="formData.email" multiple placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>


          </el-form-item>
          <el-form-item label="操作员姓名" prop="mobile">
            <el-input v-model.number="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <el-cascader
              :style="{width: '500px'}"
              :options="areaData"
              v-model="selectedOptions"
              @change="changeArea">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button :style="{width: '200px', marginRight: '50px'}" type="primary" @click="signup('formData')">提交</el-button>
            <el-button :style="{width: '200px'}" @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </article>
</template>
<script>

import { register, areaOpts } from '@/api/login';
export default {
  data () {
    const validateText = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (String(value).length !== 11) {
            callback(new Error('请输入11位手机号码'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    // const checkMobile = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('电话号码不能为空'));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'));
    //     } else {
    //       callback();
    //     }
    //   }, 1000);
    // };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      name: '',
      password: '',
      formData: {
        username: '',
        name: '',
        pass: '',
        checkPass: '',
        email: [],
        mobile: '',
        phone: '',
        company: ''
      },
      areaData: [],
      selectedOptions: [],
      rules: {
        username: [
          { required: true, validator: validateText, trigger: 'blur' }
        ],
        name: [
          { required: true, validator: validateText, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
    },
     options: [{
          value: '普通货物运输',
          label: '普通货物运输'
        },{
          value: '货物专用运输（集装箱、冷藏、罐式）',
          label: '货物专用运输（集装箱、冷藏、罐式）'
        },{
          value: '大型物件运输',
          label: '大型物件运输'
        },{
          value: '道路危险货物运输',
          label: '道路危险货物运输'
        },{
          value: '道路旅客运输',
          label: '道路旅客运输'
        }]
      }
  },
  methods: {
    signup () {
      const { username, name, pass, email, mobile, phone } = this.formData;
      const areaInfo = this.selectedOptions[this.selectedOptions.length - 1];
      const sendData = {
        loginName: username,
        name,
        password: pass,
        email,
        phone,
        mobile,
        'company.area.id': areaInfo
      };
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!areaInfo) {
            this.$message.error('请输入公司信息');
            return;
          }
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let formData = new FormData()
          for (let key in sendData) {
            formData.append(key, sendData[key])
          }
          register(formData).then(data => {
            loading.close();
            if (data.code === 1) {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
              setTimeout(() => {
                this.$router.push('/login')
              }, 800);
            } else {
              this.$message.error(data.errorMsg);
            }
          });
        }
        this.$message.error('请输入信息');
      });
    },
    changeArea (data) {
      console.log(data);
    }
  },
  created () {
    areaOpts().then(data => {
      this.areaData = data;
    })
  }
}
</script>
<style>
.register {
  position: relative;
}
.register h1 {
  font-size: 30px;
  text-align: center;
  padding: 20px 0;
}
.register-content {
  width: 600px;
  position: absolute;
  left: 50%;
  margin-left: -300px;
} 
</style>