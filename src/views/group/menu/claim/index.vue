<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】赔付号设置</h4>
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
          <el-form-item>
            <el-button type="success" v-on:click="claim"
              >赔付金上限设置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="trusts" highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="name" label="群成员昵称" width="120">
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

      <el-dialog
        title="确认交易密码"
        :visible.sync="pwdVisible"
        :close-on-click-modal="false"
      >
        <el-input
          v-model="pwd"
          placeholder="请输入交易密码"
          style="width: 200px"
          type="password"
        ></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setIndemnityValue('paid')"
            >确认</el-button
          >
          <el-button @click.native="pwdVisible = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="赔付金上限设置"
        :visible.sync="paidMoneyVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="paid"
          ref="paid"
          :rules="moenyRules"
          @submit.native.prevent
        >
          <el-input-number
            v-model="paid.money"
            oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
          ></el-input-number>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updatePaiMoney('paid')"
            >确认</el-button
          >
          <el-button @click.native="paidMoneyVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
import {
  paidData,
  setIndemnity,
  cancelIndemnity,
  startIndemnity,
  stopIndemnity,
} from "@/api/turst";
import md5 from "blueimp-md5";
import { setPaidMoney, getPaidMoney } from "@/api/groupTable";
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
      paidMoneyVisible: false,
      paid: {
        money: 1,
      },
      moenyRules: {
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
      pwdVisible: false,
      pwd: "",
      index: 0,
      row: null,
    };
  },
  methods: {
    claim() {
      this.paidMoneyVisible = true;
      const param = { groupId: this.groupId };
      getPaidMoney(param).then((res) => {
        this.paid.money = res.max;
      });
    },
    updatePaiMoney(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            "最多赔付:【" + this.paid.money + "】金额",
            "赔付金额",
            {}
          )
            .then(() => {
              const param = { groupId: this.groupId, max: this.paid.money };
              setPaidMoney(param).then((res) => {
                this.paidMoneyVisible = false;
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              });
            })
            .catch((e) => {});
        }
      });
    },
    setIndemnity(index, row) {
      this.pwdVisible = true;
      this.index = index;
      this.row = row;
    },
    setIndemnityValue() {
      if (this.pwd.length < 6) {
        this.pwdVisible = false;
        this.pwd = "";
        this.$message({
          message: "只能输入密码[密码最少6位]",
          type: "warning",
        });
        return false;
      }
      this.pwdVisible = false;
      const tradePwd = md5(this.pwd);
      const param = {
        userId: this.row.id,
        groupId: this.groupId,
        tradePwd: tradePwd,
      };
      setIndemnity(param).then((res) => {
        this.trusts[this.index].autoPaid = "1";
        this.index = 0;
        this.row = null;
        this.pwd = "";
        this.$message({
          message: "设置成功",
          type: "success",
        });
      });
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
      paidData(para).then((res) => {
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