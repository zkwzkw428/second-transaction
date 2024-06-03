<template>
    <div class="login-container">
        <el-card class="box-card">
            <div class="login-body">
                <div class="login-title">物转星移</div>
                <el-form ref="form" :model="userForm" :rules="rules">
                    <el-form-item prop="accountNumber">
                        <el-input placeholder="请输入手机号..." v-model="userForm.accountNumber" class="login-input" :maxlength="11" @input="inputHandler">
                            <template slot="prepend">
                                <div class="el-icon-user-solid"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword">
                        <el-input
                            placeholder="请输入密码..."
                            v-model="userForm.userPassword"
                            class="login-input"
                            @keyup.enter.native="login"
                            show-password
                            :minlength="6"
                            :maxlength="16"
                            type="password"
                        >
                            <template slot="prepend">
                                <div class="el-icon-lock"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                  <div class="loginAndReset">
                    <div class="login-submit">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                    <div class="resetForm">
                        <el-button type="success" @click="reset">重置</el-button>
                    </div>
                  </div>
                    <div class="other-submit">
                        <router-link to="/sign-in" class="sign-in-text">注册</router-link>
                        <router-link to="/login-admin" class="sign-in-text">后台登录</router-link>
                    </div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            userForm: {
                accountNumber: '',
                userPassword: ''
            },
            rules: {
                accountNumber: [
                    { required: true, message: '请输入您的手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号码应该为11位', trigger: 'blur' }
                ],
                userPassword: [
                    {required: true, message: '请输入您的密码', trigger: 'blur'},
                    {min:6, max: 16, message: '密码长度应在6~16位之间', trigger: 'blur'}
                ]
            }
        };
    },

    methods: {
        login() {
           this.$refs.form.validate((valid) => {
            if(valid) {
                this.$api
                .userLogin({
                    accountNumber: this.userForm.accountNumber,
                    userPassword: this.userForm.userPassword
                })
                .then(res => {
                    console.log(res);
                    if (res.status_code === 1) {
                        res.data.signInTime = res.data.signInTime.substring(0, 10);
                        this.$globalData.userInfo = res.data;
                        this.$router.push('/index')
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            } else {
                return this.$message({
                    message: this.userForm.accountNumber || this.userForm.userPassword ? '您的手机号或者密码格式发生错误': '您的手机号或者密码没填写',
                    type: 'warning'
                })
            }
           })
        },
        reset() {
            this.$refs.form.resetFields();
        },
        inputHandler(value) {
            if(!Number(value)) {
                this.userForm.accountNumber = ""
                this.$message({
                    message: '手机号只能是数字类型',
                    type: 'warning'
                })
            } else {
                return
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #f1f1f1;
}
.login-body {
    padding: 30px;
    width: 400px;
    height: 100%;
}

.login-title {
    padding-bottom: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #409eff;
}

.login-input {
    margin-bottom: 20px;
}
.loginAndReset {
    display: flex;
    justify-content: space-between;
    justify-items: center;
}
.sign-in-container {
    padding: 0 10px;
}

.sign-in-text {
    color: #409eff;
    font-size: 16px;
    text-decoration: none;
    line-height: 28px;
}
.other-submit {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>
