<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 流水统计</h4>
    </div>
    
    <section>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
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
            <el-button type="primary" v-on:click="getTurs">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            总包数:&nbsp;{{pack}}</span></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            总流水:&nbsp;{{waters}}</span></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            总人数:&nbsp;{{persons}}</span></div
        ></el-col>
      </el-row>

      <el-table :data="data" highlight-current-row style="width: 100%">
        <el-table-column prop="userId" label="ID" width="120"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="pack" label="包数" width="150">
        </el-table-column>
        <el-table-column prop="water" label="流水" width="150">
        </el-table-column>
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
import { getTurnovers } from "@/api/groupTable";
import { formatDate } from "@/utils/table";
export default {
  name: "turnover",
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
      },
      data: [],
      pack: "0",
      persons: "0",
      waters: "0.00",
      total: 0,
      page: 1,
      startTime: {
        disabledDate: (time) => {
          if (this.filters.endTime) {
            return time.getTime() > new Date(this.filters.endTime).getTime();
          }
        },
      },
      endTime: {
        disabledDate: (time) => {
          if (this.filters.startTime) {
            return (
              time.getTime() <
              new Date(this.filters.startTime).getTime() + 86400000
            );
          }
        },
      },
    };
  },
  methods: {
    startTimeBlur(e) {
      console.log(this.filters.startTime);
    },
    endTimeBlur() {},
    handleCurrent(val) {
      this.page = val;
      this.getTurs();
    },
    getTurs() {
      const para = {
        page: this.page,
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        groupId: this.groupId,
        size: 10,
      };
      getTurnovers(para).then((res) => {
        this.data = res.data.list;
        this.total = res.data.total;
        this.persons = res.data.persons;
        this.pack = res.data.pack;
        this.waters = res.data.waters;
      });
    },
  },
  mounted() {
    this.groupId = this.id;
    this.getTurs();
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  z-index: -1;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #42b983;
  padding-left: 5px;
  height: 40px;
  line-height: 40px;
  color: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>