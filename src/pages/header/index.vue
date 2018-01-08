<template>
    <div class="page-header">
        <span class="page-title">道路运输企业主体责任落实平台 
            <span class="page-sign__tip" @click="officialCertification" v-if="!officalStatus">未官方认证(官方认证)</span>
        <span class="page-sign__tip" v-else>官方认证(已认证)</span>
        </span>
        <div class="func-bar clearfix">
            <span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.operator"
                    :label="item.operator"
                    :value="item.operator">
                    </el-option>
                </el-select>
                <span class="add-icon" @click="addOperator">
                    <i class="el-icon-circle-plus-outline"></i>
                </span>
            </span>
            <span class="setting">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="setting-info">
                        <span class="setting-avatar">
                            <img src="../../assets/images/avatar.jpg" />
                        </span> admin
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">修改密码</el-dropdown-item>
                <el-dropdown-item command="2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            </span>
            <el-dialog title="修改密码" :visible.sync="changepassword">
                <el-form :model="password">
                    <el-form-item label="旧密码">
                        <el-input v-model="password.lastPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="password.newPassword" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changepassword = false">取 消</el-button>
                    <el-button type="primary" @click="modifyPwd">确 定</el-button>
                </div>
                </el-dialog>
            <el-dialog title="添加操作员" :visible.sync="visible" :before-close="close">
                <div>
                    <el-form ref="form" label-width="100px">
                        <el-form-item label="操作员名称">
                            <el-input v-model="inputValue"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="道路运输企业实名制认证" :visible.sync="dialogVisbile" :before-close="close">
                <div>
                    <el-form ref="officalForm" label-width="100px">
                        <el-form-item label="道路运输经营许可证号">
                            <el-input v-model="officalForm['roadLicense']"></el-input>
                            <input type="file" :value="officalForm['roadLicensePic']" />
                        </el-form-item>
                        <el-form-item label="工商执照号码">
                            <el-input v-model="officalForm['businessLicense']"></el-input>
                            <input type="file" :value="officalForm['businessLicensePic']" />
                        </el-form-item>
                        <el-form-item label="法人代表">
                            <el-input v-model="officalForm['legalPerson']"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="officalForm['phone']"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="confirmOffical">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {
        queryOperator,
        insertOperator
    } from '../../api/operator';
    import {
        modifyPwdRequest,
        logoutRequest
    } from '../../api/login';
    import {
        officalConfirm,
        officalConfirmStatus
    } from '../../api/user';
    import cache from 'Utils/cache';
    import {
        SESSION_KEY
    } from 'Utils/constants';
    export default {
        data() {
            return {
                options: [],
                value: '',
                visible: false,
                inputValue: '', // 操作员姓名
                password: {},
                changepassword: false,
                dialogVisbile: false,
                officalStatus: false, // 是否认证
                officalForm: {
                    roadLicense: '',
                    businessLicense: '',
                    roadLicensePic: '',
                    businessLicensePic: '',
                    legalPerson: '',
                    phone: ''
                }
            }
        },
        methods: {
            close: function () {
                this.visible = false;
                this.dialogVisbile = false;
            },
            // 添加操作员
            addOperator() {
                this.visible = true;
                this.inputValue = '';
            },
            confirm() {
                if (!this.inputValue) {
                    this.$message({
                        message: '操作员姓名不能为空',
                        type: 'warning'
                    });
                    return;
                }
                insertOperator(this.inputValue).then(res => {
                    this.visible = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.queryOperate()
                })
            },
            modifyPwd () {
                if (!this.password.lastPassword) {
                    alert('请输入旧密码');
                    return;
                } else if (!this.password.newPassword) {
                    alert('请输入新密码');
                    return;
                }
                const param = `?oldPassword=${this.password.lastPassword}&newPassword=${this.password.newPassword}`;
                return modifyPwdRequest(param).then(res => {
                    if (res.code === 1) {
                        this.$message({
                            message: '修改密码成功',
                            type: 'success'
                        });
                        this.changepassword = false;
                    } else {
                        this.$message.error(res.content);
                    }
                });
            },
            queryOperate() {
                queryOperator().then(res => {
                    this.options = res;
                    if (res.length > 0) {
                        this.value = res[0].operator;
                        cache.session.set(SESSION_KEY.OPERATOR, this.value);
                    }
                })
            },
            handleCommand(e) {
                if (e === '1') {
                    this.changepassword = true
                } else if (e === '2') {
                    this.$confirm('退出登录将无法进行操作，确定退出?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        logoutRequest().then(d => {
                            console.log(d);
                        }).catch(() => {
                            this.$message.error('退出失败，请重试');
                        });
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                    }).catch(() => {
                        console.log();
                    });
                }
                // console.error('e', e);
                console.error('e', e);
            },
            // 官方认证
            officialCertification() {
                this.dialogVisbile = true;
            },
            // 提交官方认证
            confirmOffical() {
                officalConfirm(this.officalForm)
                .then(res => {
                })
            }
        },
        watch: {
            value(val) {
                cache.session.set(SESSION_KEY.OPERATOR, val);
            }
        },
        mounted() {
            this.queryOperate();
            officalConfirmStatus()
                .then(res => {
                    this.officalStatus = res;
                })
        }
    }

</script>
