<template>
  <div class="app-container">
    <div class="item">
      <h4>XXX群托号设置</h4>
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
        <el-table-column prop="name" label="名字" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150">
        </el-table-column>
        <el-table-column prop="isTrust" label="是否托号" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isTrust === 1 ? 'success' : 'info'"
              disable-transitions
            >
              <span v-if="scope.row.isTrust === 0">否</span>
              <span v-else>是</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              :plain="true"
              v-if="scope.row.isTrust === 0"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >设置托号</el-button
            >
            <el-button
              :plain="true"
              v-else-if="scope.row.isTrust === 1"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >取消托号</el-button
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
import util from "@/utils/table.js";
import { membersData } from "@/api/turst";

export default {
  name: "trust",
  data() {
    return {
      filters: {
        phone: "",
        id: "",
      },
      trusts: [],
      total: 0,
      page: 1,
      pageSize: 10,
      sels: [], // 列表选中列
    };
  },
  methods: {
    handleEdit(index, row) {
      this.trusts[index].isTrust === 1
        ? (row.isTrust = 0)
        : this.trusts[index].isTrust === 0
        ? (row.isTrust = 1)
        : "";
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
    handleCurrent(val) {
      this.page = val;
      this.members();
    },
    whether(row) {
      return row.isTrust === 1 ? "是" : row.isTrust === 0 ? "否" : "";
    },
    members() {
      const para = {
        page: this.page,
        phone: this.filters.phone,
        id: this.filters.id,
      };
      membersData(para).then((res) => {
        this.trusts = res.data.members;
        this.total = res.data.total;
      });
    },
  },
  mounted() {
    this.members();
  },
};
</script>