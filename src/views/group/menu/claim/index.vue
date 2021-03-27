<template>
  <div class="app-container">
    <div class="item">
      <h4>{{ name }} 赔付号设置</h4>
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
        <el-table-column prop="autoPaid" label="是否赔付号" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.autoPaid === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.autoPaid === '0'">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="paidStatus" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.paidStatus === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.paidStatus === '0'">停用</span>
              <span v-else>启用</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.autoPaid === '0'"
              size="mini"
              type="primary"
              @click="setIndemnity(scope.$index, scope.row)"
              >设置赔付号</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.autoPaid === '1'"
              size="mini"
              type="primary"
              @click="cancelIndemnity(scope.$index, scope.row)"
              >取消赔付号</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.paidStatus === '0'"
              size="mini"
              type="primary"
              @click="startIndemnity(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.paidStatus === '1'"
              size="mini"
              type="primary"
              @click="stopIndemnity(scope.$index, scope.row)"
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
  setIndemnity,
  cancelIndemnity,
  startIndemnity,
  stopIndemnity,
} from "@/api/turst";
export default {
  name: "claim",
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
    setIndemnity(index, row) {
      this.$confirm("确认设置赔付号？", "设置赔付号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          setIndemnity(param).then((res) => {
            this.trusts[index].autoPaid = "1";
            this.$message({
              message: "设置成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    cancelIndemnity(index, row) {
      this.$confirm("确认取消赔付号？", "取消赔付号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          cancelIndemnity(param).then((res) => {
            this.trusts[index].autoPaid = "0";
            this.trusts[index].paidStatus = "0";
            this.$message({
              message: "取消成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    startIndemnity(index, row) {
      this.$confirm("确认启用赔付号？", "启用赔付号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          startIndemnity(param).then((res) => {
            this.trusts[index].paidStatus = "1";
            this.$message({
              message: "启用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    stopIndemnity(index, row) {
      this.$confirm("确认停用赔付号？", "停用赔付号", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          stopIndemnity(param).then((res) => {
            this.trusts[index].paidStatus = "0";
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
        console.log(res.data);
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