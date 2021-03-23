<template>
  <div class="app-container">
    <div class="item">
      <h4>XXX群 开奖查询{{ groupId }}</h4>
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
            <el-input v-model="filters.userId" placeholder="玩家ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="wins">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="winData" highlight-current-row style="width: 100%">
        <el-table-column prop="money" label="金额" width="120">
        </el-table-column>
        <el-table-column prop="packs" label="包数" width="120">
        </el-table-column>
        <el-table-column prop="sendContent" label="发送内容" width="150">
        </el-table-column>
        <el-table-column prop="winResult" label="中奖结果" width="150">
        </el-table-column>
        <el-table-column prop="odds" label="赔率" width="150">
        </el-table-column>
        <el-table-column prop="payAmount" label="赔付金额" width="150">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="200">
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
import { winData } from "@/api/win";

export default {
  name: "win",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      groupId: 0,
      filters: {
        startTime: "",
        endTime: "",
        userId: 0,
      },
      winData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      sels: [], // 列表选中列
    };
  },
  methods: {
    handleCurrent(val) {
      this.page = val;
      this.wins();
    },
    wins() {
      const para = {
        page: this.page,
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        userId: this.filters.userId,
      };
      winData(para).then((res) => {
        this.winData = res.data.winsData;
        this.total = res.data.total;
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    console.log("groupId:" + this.groupId);
    this.wins();
  },
};
</script>