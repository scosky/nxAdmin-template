<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】中奖信息</h4>
    </div>

    <section>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input
              placeholder="用户ID"
              v-model="filters.userId"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
              :controls="false"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              placeholder="开始时间"
              v-model="filters.startTime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="startTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="datetime"
              placeholder="结束时间"
              v-model="filters.endTime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="endTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="wins">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="winData" highlight-current-row style="width: 100%">
        <el-table-column prop="userId" label="ID" width="100"></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="sendAmount"
          label="发包金额"
          width="120"
        ></el-table-column>
        <el-table-column prop="pack" label="包数" width="100"></el-table-column>
        <el-table-column
          prop="sendContent"
          label="发包内容"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="winResult"
          label="开奖结果"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="paidAmount"
          label="赔付金额"
          width="150"
        ></el-table-column>
        <el-table-column prop="time" label="时间" width="200"></el-table-column>
      </el-table>

      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="10"
          :total="total"
          style="float: right"
        >
        </el-pagination>
      </el-col>
    </section>
  </div>
</template>
<script>
import { getWinData } from "@/api/groupTable";
export default {
  name: "win",
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
      groupId: 0,
      filters: {
        startTime: "",
        endTime: "",
        userId: "",
      },
      winData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      startTime: {
        // disabledDate: (time) => {
        //   if (this.filters.endTime) {
        //     return time.getTime() > new Date(this.filters.endTime).getTime();
        //   }
        // },
      },
      endTime: {
        // disabledDate: (time) => {
        //   if (this.filters.startTime) {
        //     return (
        //       time.getTime() <
        //       new Date(this.filters.startTime).getTime() + 86400000
        //     );
        //   }
        // },
      },
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
        groupId: this.groupId,
        size: 10,
      };
      getWinData(para).then((res) => {
        this.winData = res.data;
        this.total = res.total;
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    this.wins();
  },
};
</script>