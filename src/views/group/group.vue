<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="群名称"></el-input>
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
    <el-table :data="groups" highlight-current-row style="width: 100%">
      <el-table-column prop="groupId" label="群编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="群名称" width="120">
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="80">
      </el-table-column>
      <el-table-column prop="owner" label="群主" width="80"> </el-table-column>
      <!-- <el-table-column
        prop="isAddFriend"
        label="添加好友"
        width="80"
      ></el-table-column> -->
      <el-table-column prop="isSetNickname" label="修改群昵称" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isSetNickname === 1 ? 'success' : 'info'"
            disable-transitions
          >
            <span v-if="scope.row.isSetNickname === 1">允许</span>
            <span v-else>不允许</span>
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="isVodChat"
        label="语音/视频"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="isGrpQrcode"
        label="启用群二维码"
        width="80"
      ></el-table-column> -->
      <el-table-column prop="inviteConfirm" label="邀请成员确认" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.inviteConfirm === 1 ? 'info' : 'success'"
            disable-transitions
          >
            <span v-if="scope.row.inviteConfirm === 1">需要确认</span>
            <span v-else>无需确认</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'success' : 'info'"
            disable-transitions
          >
            <span v-if="scope.row.status === 0">正常</span>
            <span v-else-if="scope.row.status === 1">禁言</span>
            <span v-else-if="scope.row.status === 2">冻结</span>
            <span v-else-if="scope.row.status === 3">删除</span>
            <span v-else>未知</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="editGroupHandler(scope.row)"
            size="small"
            >编辑</el-button
          >
          <el-button
            type="text"
            @click="catMemberHandle(scope.row)"
            size="small"
            >查看群成员</el-button
          >
        </template>
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

    <!--编辑界面-->
    <el-dialog
      title="群资料"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="editGroup" label-width="120px" ref="editGroup">
        <el-form-item label="群ID" prop="groupId">
          <el-input
            v-model="editGroup.groupId"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="name">
          <el-input
            v-model="editGroup.creator"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="群主" prop="owner">
          <el-input
            v-model="editGroup.owner"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="群昵称" prop="name">
          <el-input v-model="editGroup.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="允许加好友">
          <el-radio-group v-model="editGroup.isAddFriend">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="修改昵称">
          <el-radio-group v-model="editGroup.isSetNickname">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="允许语音/视频">
          <el-radio-group v-model="editGroup.isVodChat">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="启用群二维码">
          <el-radio-group v-model="editGroup.isGrpQrcode">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邀请成员需确认">
          <el-radio-group v-model="editGroup.inviteConfirm">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editGroup.status" placeholder="群状态">
            <el-option label="正产" value="0"></el-option>
            <el-option label="禁言" value="1"></el-option>
            <el-option label="冻结" value="2"></el-option>
            <el-option label="删除" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群公告">
          <el-input type="textarea" v-model="editGroup.intro"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateGroupData">修改</el-button>
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getGroupListPage } from "@/api/groupTable";
export default {
  data() {
    return {
      dialogFormVisible: false,
      filters: {
        name: "",
      },
      groups: [],
      total: 0,
      page: 1,
      sels: [],
      editGroup: {
        groupId: "",
        name: "",
        creator: "",
        owner: "",
        status: "",
        intro: "",
        isAddFriend: "",
        isSetNickname: "",
        isVodChat: "",
        isGrpQrcode: "",
        inviteConfirm: "",
        createTime: "",
      },
    };
  },
  methods: {
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
    editGroupHandler(row) {
      this.dialogFormVisible = true;
      this.editGroup = Object.assign({}, row);
    },
    catMemberHandle(row) {},
    updateGroupData() {
      this.dialogFormVisible = false;
      this.$message({
        message: "修改群资料成功",
        type: "success",
      });
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>

<style scoped>
</style>