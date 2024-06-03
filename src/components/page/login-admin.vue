<template>
    <div class="login-container">
        <el-card class="box-card">
            <div class="login-body">
                <div class="login-title">后台管理</div>
                <el-form ref="form" :model="userForm" :rules="rules">
                    <el-form-item prop="accountNumber">
                        <el-input placeholder="请输入管理员账号" v-model="userForm.accountNumber" class="login-input">
                            <template slot="prepend">
                                <div class="el-icon-user-solid"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="adminPassword">
                        <el-input
                            placeholder="请输入管理员密码"
                            v-model="userForm.adminPassword"
                            class="login-input"
                            @keyup.enter.native="login"
                            show-password
                            :maxlength="16"
                        >
                            <template slot="prepend">
                                <div class="el-icon-lock"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <div class="adminLoginArea">
                        <div class="login-submit">
                            <el-button type="primary" @click="login">登录</el-button>
                        </div>
                        <div class="reset">
                            <el-button @click="resetForm">重置</el-button>
                        </div>
                    </div>
                    <div class="other-submit">
                        <router-link to="/login" class="sign-in-text">返回前台</router-link>
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
                adminPassword: ''
            },
            rules: {
                accountNumber: [{ required: true, message: '请输入您的管理员账号', trigger: 'blur' }],
                adminPassword: [
                    { required: true, message: '请输入您的密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 16,
                        message: '密码必须为6~16位的数字与字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        login() {
            this.$refs.form.validate(valid => {
                // 通过验证
                if (valid) {
                    console.log(valid);
                    this.$api
                        .adminLogin({
                            accountNumber: this.userForm.accountNumber,
                            adminPassword: this.userForm.adminPassword
                        })
                        .then(res => {
                            console.log(res);
                            if (res.status_code === 1) {
                                console.log(res);
                                this.$sta.isLogin = true;
                                this.$sta.adminName = res.data.adminName;
                                this.$router.replace({ path: '/platform-admin' });
                            } else {
                                this.$message.error('登录失败，账号或密码错误！');
                            }
                        });
                } else {
                    // 提示用户输入有误
                    this.$message({
                        type: 'warning',
                        message: '您的账号或者密码不符合规范'
                    });
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
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
    cursor: pointer;
}
.login-input {
    margin-bottom: 20px;
}
.adminLoginArea {
    display: flex;
    justify-content: space-between;
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
