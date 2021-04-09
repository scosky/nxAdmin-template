<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }}&nbsp;群】 流水统计</h4>
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
            <el-button type="primary" v-on:click="getTurs">统计</el-button>
            <el-button type="primary" v-on:click="getFieldTurs">本场流水统计</el-button>
            &nbsp;
            <el-popover
                placement="bottom"
                width="250"
                trigger="hover">
                 <el-button type="primary" v-on:click="txtOut">文本导出</el-button>
                 <el-button type="primary" v-on:click="excelOut">excel导出</el-button>
                <el-button slot="reference">导出</el-button>
            </el-popover>
          </el-form-item>
        </el-form>
      </el-col>

      <div v-if="isShow">
        <el-row :gutter="20">
          <el-col :span="3">
            <div class="grid-content bg-purple">
              总流水:&nbsp;{{waters}}</span>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              总盈亏:&nbsp;{{profit}}</span>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              玩家总数:&nbsp;{{persons}}</span>
            </div>
          </el-col>

           <el-col :span="3"
            ><div class="grid-content bg-purple">
              总包数:&nbsp;{{pack}}</span></div
          ></el-col>

          <el-col :span="3"
            ><div class="grid-content bg-purple">
              错包数:&nbsp;{{errorPack}}</span></div
          ></el-col>
          
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              错包流水:&nbsp;{{errorWaters}}</span></div
          ></el-col>
        </el-row>
      </div>

      <el-table :data="data" highlight-current-row style="width: 100%">
        <el-table-column prop="userId" label="ID" width="120"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="pack" label="包数" width="150">
        </el-table-column>
        <el-table-column prop="water" label="流水" width="150">
        </el-table-column>
        <el-table-column prop="paid" label="盈亏" width="150">
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
import { getTurnovers, getThisField } from "@/api/groupTable";
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
        userId: "",
      },
      isShow: true,
      data: [],
      profit: "0",
      errorPack: "0",
      errorWaters: "0",
      pack: "0",
      persons: "0",
      waters: "0",
      total: 0,
      page: 1,
      active: 0,
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
    handleCurrent(val) {
      this.page = val;
      this.getTurs();
    },
    txtOut() {
      if (this.data.length == 0) {
        if (this.active == 0) {
          this.$message({
            message: "没有统计数据不能导出TXT",
            type: "warning",
          });
        }
        if (this.active == 1) {
          this.$message({
            message: "没有本场统计数据不能导出TXT",
            type: "warning",
          });
        }
        return;
      }
      if (this.active == 0) {
        let txtUrl =
          "http://8.136.115.108:8082/api/mc/group/trade/export/txt?type=1";
        txtUrl +=
          "&userId=" +
          this.filters.userId +
          "&groupId=" +
          this.groupId +
          "&startTime=" +
          this.filters.startTime +
          "&endTime=" +
          this.filters.endTime;
        window.location.href = txtUrl;
      }
      if (this.active == 1) {
        let txtUrl =
          "http://8.136.115.108:8082/api/mc/group/trade/export/txt?type=2";
        url += "&userId=" + this.filters.userId + "&groupId=" + this.groupId;
        window.location.href = txtUrl;
      }
    },
    excelOut() {
      if (this.data.length == 0) {
        if (this.active == 0) {
          this.$message({
            message: "没有统计数据不能导出EXCEL",
            type: "warning",
          });
        }
        if (this.active == 1) {
          this.$message({
            message: "没有本场统计数据不能导出EXCEL",
            type: "warning",
          });
        }
        return;
      }
      if (this.active == 0) {
        let excelUrl =
          "http://8.136.115.108:8082/api/mc/group/trade/export/excel?type=1";
        excelUrl +=
          "&userId=" +
          this.filters.userId +
          "&groupId=" +
          this.groupId +
          "&startTime=" +
          this.filters.startTime +
          "&endTime=" +
          this.filters.endTime;
        window.location.href = excelUrl;
      }
      if (this.active == 1) {
        let excelUrl =
          "http://8.136.115.108:8082/api/mc/group/trade/export/excel?type=2";
        excelUrl +=
          "&userId=" + this.filters.userId + "&groupId=" + this.groupId;
        window.location.href = excelUrl;
      }
    },
    getFieldTurs() {
      const para = {
        page: this.page,
        groupId: this.groupId,
        userId: this.filters.userId,
        size: 10,
      };
      getThisField(para).then((res) => {
        this.active = 1;
        this.data = res.data.list;
        this.data.forEach(function (element, index, array) {
          if (element.paid == null) {
            element.paid = 0;
          }
          const paid = element.paid - element.water;
          element.paid = paid;
        });
        this.total = res.data.total;
        this.persons = res.data.persons;
        this.pack = res.data.pack;
        this.waters = res.data.waters;
        if (res.data.errorPack == null) {
          this.errorPack = 0;
        } else {
          this.errorPack = res.data.errorPack;
        }
        if (res.data.errorPack == null) {
          this.errorWaters = 0;
        } else {
          this.errorWaters = res.data.errorWaters;
        }
        if (res.data.profit == null) {
          this.profit = 0;
        } else {
          this.profit = res.data.profit;
        }
      });
    },
    getTurs() {
      const para = {
        page: this.page,
        startTime: this.filters.startTime,
        endTime: this.filters.endTime,
        groupId: this.groupId,
        userId: this.filters.userId,
        size: 10,
      };
      getTurnovers(para).then((res) => {
        this.active = 0;
        this.data = res.data.list;
        this.data.forEach(function (element, index, array) {
          if (element.paid == null) {
            element.paid = 0;
          }
          const paid = element.paid - element.water;
          element.paid = paid;
        });
        this.total = res.data.total;
        this.persons = res.data.persons;
        this.pack = res.data.pack;
        this.waters = res.data.waters;
        if (res.data.errorPack == null) {
          this.errorPack = 0;
        } else {
          this.errorPack = res.data.errorPack;
        }
        if (res.data.errorPack == null) {
          this.errorWaters = 0;
        } else {
          this.errorWaters = res.data.errorWaters;
        }
        if (res.data.profit == null) {
          this.profit = 0;
        } else {
          this.profit = res.data.profit;
        }
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