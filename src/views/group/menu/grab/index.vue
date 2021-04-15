<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】秒号设置</h4>
    </div>
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="filters.id" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="members">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="trusts" highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="name" label="群昵称" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="autoGrab" label="是否秒号" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.autoGrab === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.autoGrab === '0'">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="grabStatus" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.grabStatus === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.grabStatus === '0'">停用</span>
              <span v-else>启用</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.autoGrab === '0'"
              size="mini"
              type="primary"
              @click="setGrab(scope.$index, scope.row)"
              >设置秒号</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.autoGrab === '1'"
              size="mini"
              type="primary"
              @click="cancelGrab(scope.$index, scope.row)"
              >取消秒号</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.grabStatus === '0'"
              size="mini"
              type="primary"
              @click="startGrab(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.grabStatus === '1'"
              size="mini"
              type="primary"
              @click="stopGrab(scope.$index, scope.row)"
              >停用</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="pageSize"
          :total="total"
          style="float: right"
        >
        </el-pagination>
      </el-col>

      <el-dialog
        title="确认交易密码"
        :visible.sync="pwdVisible"
        :close-on-click-modal="false"
      >
        <el-input
          v-model="pwd"
          placeholder="请输入交易密码"
          style="width: 200px"
          type="password"
        ></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setGrabValue('paid')"
            >确认</el-button
          >
          <el-button @click.native="pwdVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import {
  grabData,
  setGrab,
  cancelGrab,
  startGrab,
  stopGrab,
} from "@/api/turst";
import md5 from "blueimp-md5";
export default {
  name: "grab",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      groupId: "",
      filters: {
        id: "",
        phone: "",
        groupId: "",
      },
      trusts: [],
      total: 0,
      page: 1,
      pageSize: 10,
      pwdVisible: false,
      pwd: "",
      index: 0,
      row: null,
    };
  },
  methods: {
    setGrab(index, row) {
      this.pwdVisible = true;
      this.index = index;
      this.row = row;
    },
    setGrabValue() {
      if (this.pwd.length < 6) {
        this.pwdVisible = false;
        this.$message({
          message: "只能输入密码[密码最少6位]",
          type: "warning",
        });
        return false;
      }
      this.pwdVisible = false;
      const tradePwd = md5(this.pwd);
      const param = {
        userId: this.row.id,
        groupId: this.groupId,
        tradePwd: tradePwd,
      };
      setGrab(param).then((res) => {
        this.trusts[this.index].autoGrab = "1";
        this.index = 0;
        this.row = null;
        this.pwd = "";
        this.$message({
          message: "设置成功",
          type: "success",
        });
      });
    },
    cancelGrab(index, row) {
      this.$confirm("确认取消秒号？", "取消秒号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          cancelGrab(param).then((res) => {
            this.trusts[index].autoGrab = "0";
            this.trusts[index].grabStatus = "0";
            this.$message({
              message: "取消成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    startGrab(index, row) {
      this.$confirm("确认启用秒号？", "启用秒号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          startGrab(param).then((res) => {
            this.trusts[index].grabStatus = "1";
            this.$message({
              message: "启用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    stopGrab(index, row) {
      this.$confirm("确认停用秒号？", "停用秒号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          stopGrab(param).then((res) => {
            this.trusts[index].grabStatus = "0";
            this.$message({
              message: "停用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    handleCurrent(val) {
      this.page = val;
      this.members();
    },
    members() {
      const para = {
        page: this.page,
        id: this.filters.id,
        phone: this.filters.phone,
        groupId: this.groupId,
        size: 10,
      };
      grabData(para).then((res) => {
        this.trusts = res.data;
        this.total = res.total;
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    this.members();
  },
};
</script>