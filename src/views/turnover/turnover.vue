<template>
  <div class="app-container">
    <div class="item">
      <h4>流水统计</h4>
    </div>
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="filters.startTime"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="结束时间"
              v-model="filters.endTime"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.groupId" placeholder="群ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="turs">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="data.data" highlight-current-row style="width: 100%">
        <el-table-column prop="seq" label="编号" width="120"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="pack" label="包数" width="150">
        </el-table-column>
        <el-table-column prop="water" label="流水" width="150">
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
import { turnoverData } from "@/api/turnover";

export default {
  name: "turnover",
  data() {
    return {
      groupId: 0,
      filters: {
        startTime: "",
        endTime: "",
        groupId: 0,
      },
      data: {},
      total: 0,
      page: 1,
      pageSize: 10,
      sels: [], // 列表选中列
    };
  },
  methods: {
    handleCurrent(val) {
      this.page = val;
      this.turs();
    },
    turs() {
      const para = {
        page: this.page,
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        groupId: this.filters.groupId,
      };
      turnoverData(para).then((res) => {
        this.data = res.data.turnoverData;
        console.log("###" + JSON.stringify(res.data.turnoverData));
        this.total = res.data.total;
      });
    },
  },
  mounted() {
    this.turs();
  },
};
</script>