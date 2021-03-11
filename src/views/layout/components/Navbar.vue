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
      <el-form label-width="120px" ref="editForm">
        <el-form-item label="昵称">
          <el-input
            auto-complete="off"
            style="width: 30%"
            v-model="userInfo.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.radio">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            auto-complete="off"
            style="width: 30%"
            v-model="userInfo.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="userInfo.status">
            <el-radio class="radio" :label="0">正常</el-radio>
            <el-radio class="radio" :label="1">已冻结</el-radio>
            <el-radio class="radio" :label="2">已注销</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="好友是否验证">
          <el-switch
            v-model="userInfo.friend"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="允许二维码">
          <el-switch
            v-model="userInfo.qrcode"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="允许手机号">
          <el-switch
            v-model="userInfo.isPhone"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="允许群内">
          <el-switch
            v-model="userInfo.group"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="允许通过名片">
          <el-switch
            v-model="userInfo.card"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="userInfo.signature" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">修改</el-button>
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      :title="passwordNmae"
      :visible.sync="passwordFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            style="width: 50%"
            type="password"
            v-model="ruleForm.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            style="width: 50%"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            style="width: 50%"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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

export default {
  name: "navBar",
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输旧密码"));
      } else if (this.ruleForm.oldPass.length < 6) {
        callback(new Error("密码不能小于6位"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输新密码"));
      } else if (this.ruleForm.checkPass.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else if (this.ruleForm.checkPass != this.ruleForm.oldPass) {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
      } else {
        callback(new Error("新密码和旧密码不能一样"));
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        name: "你的名字",
        phone: 13768354544,
        birthday: "1991-03-14",
        signature: "testesteste",
        radio: 1,
        friend: true,
        qrcode: true,
        isPhone: true,
        group: true,
        card: true,
        status: 0,
      },
      passwordFormVisible: false,
      dialogFormVisible: false,
      passwordNmae: "修改密码",
      userInfoName: "个人信息",
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleUser() {
      this.dialogFormVisible = true;
    },
    passwordUser() {
      this.passwordFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
