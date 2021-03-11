<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getGroups">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="groups"
      highlight-current-row
      @selection-change="selsChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="groupId" width="60"> </el-table-column>
      <el-table-column prop="name" label="群名称" width="120"> </el-table-column>
      <el-table-column prop="creator" label="创建人" width="120"> </el-table-column>
      <el-table-column prop="owner" label="群主" width="120"> </el-table-column>
      <el-table-column prop="status" label="状态" width="120"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120"> </el-table-column>
      <el-table-column label="操作" width="150">
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float: right"
      >
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
import util from '@/utils/table.js'
import {
  getGroupListPage,
} from "@/api/groupTable";

export default {
  data() {
    return {
      filters: {
        name: "",
      },
      groups: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      }
    };
  },
  methods: {
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? "男" : row.sex === 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getGroups();
    },
    // 获取用户列表
    getGroups() {
      const para = {
        page: this.page,
        name: this.filters.name,
      };
      getGroupListPage(para).then((res) => {
        this.total = res.data.total;
        this.groups = res.data.groups;
      });
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.getGroups()
  }
};
</script>

<style scoped>
</style>