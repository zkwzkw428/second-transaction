<template>
    <div class="sign-in-container">
        <el-card class="box-card">
            <div class="sign-in-body">
                <div class="sign-in-title">注册</div>
                <el-form :model="userInfo" ref="ruleForm" :rules="rules">
                    <el-form-item prop="nickname">
                        <el-input placeholder="请输入昵称..." maxlength="30" v-model="userInfo.nickname" class="sign-in-input" clearable>
                            <template slot="prepend">
                                <div class="el-icon-user-solid"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="accountNumber">
                        <el-input
                            placeholder="请输入手机号..."
                            maxlength="11"
                            v-model="userInfo.accountNumber"
                            class="sign-in-input"
                            @input="inputHandler"
                            clearable
                        >
                            <template slot="prepend">
                                <div class="el-icon-phone"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword">
                        <el-input
                            placeholder="请输入密码..."
                            show-password
                            maxlength="16"
                            v-model="userInfo.userPassword"
                            class="sign-in-input"
                            clearable
                        >
                            <template slot="prepend">
                                <div class="el-icon-lock"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword2">
                        <el-input
                            placeholder="请再次输入密码..."
                            show-password
                            maxlength="16"
                            v-model="userInfo.userPassword2"
                            @keyup.enter.native="signIn"
                            class="sign-in-input"
                            clearable
                        >
                            <template slot="prepend">
                                <div class="el-icon-lock"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
               <div class="register">
                 <div class="sign-in-submit">
                    <el-button type="primary" @click="signIn">提交</el-button>
                </div>
                <div class="reset">
                    <el-button type="info" @click="reset">重置</el-button>
                </div>
               </div>
                <div class="login-container">
                    <span @click="toLogin" class="login-text">登录</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'sign-in',
    data() {
        const validRepassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userInfo.userPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userInfo: {
                accountNumber: '',
                userPassword: '',
                userPassword2: '',
                nickname: ''
            },
            rules: {
                accountNumber: [{ required: true, message: '手机号应该为11位', trigger: 'blur' }],
                nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
                userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' },{
                    min: 6, max: 16, message: '密码应在6~16位之间', trigger: 'blur'
                }],
                userPassword2: [{ validator: validRepassword, trigger: 'blur' }]
            }
        };
    },
    methods: {
        toLogin() {
            this.$router.replace({ path: '/login' });
        },
        signIn() {
            console.log(this.userInfo.nickname);
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$api
                        .signIn(this.userInfo)
                        .then(res => {
                            if (res.status_code === 1) {
                                this.$message({
                                    message: '注册成功！',
                                    type: 'success'
                                });
                                this.$router.replace({ path: '/login' });
                            } else {
                                this.$message.error('注册失败，用户已存！');
                            }
                        })
                        .catch(e => {
                            console.log(e);
                            this.$message.error('注册失败，网络异常！');
                        });
                }else {
                    this.$message({
                        message: '您的注册信息未填写完整或者填写格式错误'
                    })
                }
            });
        },
        inputHandler(value) {
            if(Number(value)) {
                return
            }else {
                this.userInfo.accountNumber = ""
                this.$message({
                    message: '手机号只能是数字类型',
                    type: 'warning'
                })
            }
        },
        reset() {
            this.$refs.ruleForm.resetFields()
        }
    }
};
</script>

<style scoped>
.sign-in-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #f1f1f1;
}
.sign-in-body {
    padding: 30px;
    width: 400px;
    height: 100%;
}

.sign-in-title {
    padding-bottom: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #409eff;
}

.sign-in-input {
    margin-bottom: 20px;
}
.register {
    display: flex;
    justify-content: space-between;
}
.login-container {
    padding: 0 10px;
}
.login-text {
    display: block;
    font-size: 16px;
    cursor: pointer;
    color: #409eff;
}
</style>
