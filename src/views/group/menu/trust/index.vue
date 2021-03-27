<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 托号设置</h4>
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
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="msend" label="是否托号" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.msend === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.msend === '0'">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mstatus" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.mstatus === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.mstatus === '0'">停用</span>
              <span v-else>启用</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.msend === '0'"
              size="mini"
              type="primary"
              @click="setTrust(scope.$index, scope.row)"
              >设置托号</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.msend === '1'"
              size="mini"
              type="primary"
              @click="cancelTrust(scope.$index, scope.row)"
              >取消托号</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.mstatus === '0'"
              size="mini"
              type="primary"
              @click="startTrust(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.mstatus === '1'"
              size="mini"
              type="primary"
              @click="stopTrust(scope.$index, scope.row)"
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
    </section>
  </div>
</template>
<script>
import {
  membersData,
  setTrust,
  cancelTrust,
  startTrust,
  stopTrust,
} from "@/api/turst";
export default {
  name: "trust",
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
    };
  },
  methods: {
    setTrust(index, row) {
      this.$confirm("确认设置托号？", "设置托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          setTrust(param).then((res) => {
            this.trusts[index].msend = "1";
            this.$message({
              message: "设置成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    cancelTrust(index, row) {
      this.$confirm("确认取消托号？", "取消托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          cancelTrust(param).then((res) => {
            this.trusts[index].msend = "0";
            this.trusts[index].mstatus = "0";
            this.$message({
              message: "取消成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    startTrust(index, row) {
      this.$confirm("确认启用托号？", "启用托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          startTrust(param).then((res) => {
            this.trusts[index].mstatus = "1";
            this.$message({
              message: "启用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    stopTrust(index, row) {
      this.$confirm("确认停用托号？", "停用托号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          stopTrust(param).then((res) => {
            this.trusts[index].mstatus = "0";
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
      membersData(para).then((res) => {
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