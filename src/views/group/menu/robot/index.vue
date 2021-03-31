<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 托号机器人</h4>
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
        <el-table-column prop="mc" label="是否机器人" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.mc === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.mc === '0'">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mcStatus" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.mcStatus === '1' ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.mcStatus === '0'">停用</span>
              <span v-else>启用</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.mc === '0'"
              size="mini"
              type="primary"
              @click="setRobot(scope.$index, scope.row)"
              >设置机器人</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.mc === '1'"
              size="mini"
              type="primary"
              @click="cancelRobot(scope.$index, scope.row)"
              >取消机器人</el-button
            >

            <el-button
              :plain="true"
              v-if="scope.row.mcStatus === '0'"
              size="mini"
              type="primary"
              @click="startRobot(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.mcStatus === '1'"
              size="mini"
              type="primary"
              @click="stopRobot(scope.$index, scope.row)"
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
  setRobot,
  cancelRobot,
  startRobot,
  stopRobot,
} from "@/api/turst";
export default {
  name: "robot",
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
      ruleVisible: false,
      ruleFrom: {
        period: 5,
        amount: 10,
        pack: 5,
        thunder: 1,
        userId: 0,
      },
    };
  },
  methods: {
    setRobot(index, row) {
      this.$confirm("确认设置机器人？", "设置机器人", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          setRobot(param).then((res) => {
            this.trusts[index].mc = "1";
            this.trusts[index].mcStatus = "1";
            this.$message({
              message: "设置成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    cancelRobot(index, row) {
      this.$confirm("确认取消机器人？", "取消机器人", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          cancelRobot(param).then((res) => {
            this.trusts[index].mc = "0";
            this.trusts[index].mcStatus = "0";
            this.$message({
              message: "取消成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    startRobot(index, row) {
      this.$confirm("确认启用机器人？", "启用机器人", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          startRobot(param).then((res) => {
            this.trusts[index].mcStatus = "1";
            this.$message({
              message: "启用成功",
              type: "success",
            });
          });
        })
        .catch((e) => {});
    },
    stopRobot(index, row) {
      this.$confirm("确认停用机器人？", "停用机器人", {})
        .then(() => {
          const param = {
            userId: row.id,
            groupId: this.groupId,
          };
          stopRobot(param).then((res) => {
            this.trusts[index].mcStatus = "0";
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
        console.log(res);
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