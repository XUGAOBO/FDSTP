<template>
    <article class="register">
      <h1>注册</h1>
      <section>
        <el-form  label-position="right" :model="formData" status-icon :rules="rules" size="medium" ref="form" label-width="200px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ 
            required: true, message: '请输入邮箱地址', trigger: 'blur' }, {
            type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="mobile">
            <el-input v-model.number="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-cascader
              :options="areaData"
              v-model="selectedOptions"
              @change="changeArea">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signup('formData')">提交</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
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
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    };
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
        email: '',
        mobile: '',
        phone: '',
        company: ''
      },
      areaData: [],
      selectedOptions: [],
      rules: {
        username: [
          { validator: validateText, trigger: 'blur' }
        ],
        name: [
          { validator: validateText, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    signup () {
      const { username, name, pass, email, mobile, phone } = this.formData;
      const areaInfo = this.selectedOptions.join('');
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
              })
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
