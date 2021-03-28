<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">
      <nx-lang-select class="international right-menu-item"></nx-lang-select>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            src="https://mgbq.github.io/nx-admin-site/home.png"
          />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="handleUser">个人信息</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="passwordUser">修改密码</el-button>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人信息-->
    <el-dialog
      :title="userInfoName"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :model="userInfo"
    >
      <el-form label-width="200px" ref="editForm">
        <el-form-item label="昵称">
          <el-input
            auto-complete="off"
            style="width: 30%"
            v-model="userInfo.nickName"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio v-model="userInfo.sex" label="0">保密</el-radio>
          <el-radio v-model="userInfo.sex" label="1">男</el-radio>
          <el-radio v-model="userInfo.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            auto-complete="off"
            style="width: 30%"
            v-model="userInfo.phone"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="添加好友是否需要验证">
          <el-radio v-model="userInfo.friendApprove" label="0">否</el-radio>
          <el-radio v-model="userInfo.friendApprove" label="1">是</el-radio>
        </el-form-item>

        <el-form-item label="允许二维码添加">
          <el-radio v-model="userInfo.qrcodeAllowed" label="0">否</el-radio>
          <el-radio v-model="userInfo.qrcodeAllowed" label="1">是</el-radio>
        </el-form-item>

        <el-form-item label="允许手机号添加">
          <el-radio v-model="userInfo.phoneAllowed" label="0">否</el-radio>
          <el-radio v-model="userInfo.phoneAllowed" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="允许群内添加">
          <el-radio v-model="userInfo.groupAllowed" label="0">否</el-radio>
          <el-radio v-model="userInfo.groupAllowed" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="允许通过名片添加">
          <el-radio v-model="userInfo.cardAllowed" label="0">否</el-radio>
          <el-radio v-model="userInfo.cardAllowed" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="userInfo.signature" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateUser">修改</el-button>
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="passwordNmae"
      :visible.sync="passwordFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="pwdForm"
        status-icon
        ref="pwdForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            style="width: 50%"
            type="password"
            v-model="pwdForm.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            style="width: 50%"
            type="password"
            v-model="pwdForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            style="width: 50%"
            type="password"
            v-model="pwdForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('pwdForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('pwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import nxBreadcrumb from "@/components/nx-breadcrumb";
import nxHamburger from "@/components/nx-hamburger";
import nxLangSelect from "@/components/nx-lang-select/index";
import { getInfo } from "@/api/login";
import { modifyUser, modifyPwd } from "@/api/users";
import md5 from "blueimp-md5";

export default {
  name: "navBar",
  data() {
    var validateoldPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输旧密码"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输新密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else if (value == this.pwdForm.oldPassword) {
        callback(new Error("新密码与旧密码不能一样"));
      }
      callback();
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.pwdForm.password) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      userInfo: {
        userId: 0,
        nickName: "",
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        signature: "",
        friendApprove: "",
        qrcodeAllowed: "",
        phoneAllowed: "",
        groupAllowed: "",
        cardAllowed: "",
        status: "",
      },
      passwordFormVisible: false,
      dialogFormVisible: false,
      passwordNmae: "修改密码",
      userInfoName: "个人信息",
      pwdForm: {
        oldPassword: "",
        password: "",
        checkPass: "",
      },
      rules: {
        oldPassword: [{ validator: validateoldPassword, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  components: {
    nxBreadcrumb,
    nxHamburger,
    nxLangSelect,
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    handleUser() {
      this.dialogFormVisible = true;
      getInfo().then((res) => {
        this.userInfo = res.data;
      });
    },
    passwordUser() {
      this.passwordFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确认修改密码？", "修改密码", {})
            .then(() => {
              const param = {
                oldPassword: md5(this.pwdForm.oldPassword),
                password: md5(this.pwdForm.password),
              };
              modifyPwd(JSON.stringify(param)).then((res) => {
                this.logout();
              });
            })
            .catch((e) => {});
        }
      });
    },
    updateUser() {
      const param = {
        nickname: this.userInfo.nickName,
        sex: this.userInfo.sex,
        birthday: this.userInfo.birthday,
        signature: this.userInfo.signature,
        friendApprove: this.userInfo.friendApprove,
        phoneAllowed: this.userInfo.phoneAllowed,
        qrcodeAllowed: this.userInfo.qrcodeAllowed,
        cardAllowed: this.userInfo.cardAllowed,
        groupAllowed: this.userInfo.groupAllowed,
      };
      modifyUser(JSON.stringify(param)).then((res) => {
        this.$message({
          message: "修改个人资料成功",
          type: "success",
        });
      });
      this.dialogFormVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .dialog-footer {
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
