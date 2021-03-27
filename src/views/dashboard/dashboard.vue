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
        prop="allowAddFriend"
        label="添加好友"
        width="80"
      ></el-table-column> -->
      <!-- <el-table-column prop="allowSetNickname" label="修改群昵称" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.allowSetNickname === 1 ? 'success' : 'info'"
            disable-transitions
          >
            <span v-if="scope.row.allowSetNickname === 1">允许</span>
            <span v-else>不允许</span>
          </el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="allowVodChat"
        label="语音/视频"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="allowGrpQrcode"
        label="启用群二维码"
        width="80"
      ></el-table-column> -->
      <!-- <el-table-column prop="inviteConfirm" label="邀请成员确认" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.inviteConfirm === 1 ? 'info' : 'success'"
            disable-transitions
          >
            <span v-if="scope.row.inviteConfirm === 1">需要确认</span>
            <span v-else>无需确认</span>
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'info' : 'success'"
            disable-transitions
          >
            <span v-if="scope.row.status === '0'">正常</span>
            <span v-else-if="scope.row.status === '1'">禁言</span>
            <span v-else-if="scope.row.status === '2'">冻结</span>
            <span v-else-if="scope.row.status === '3'">删除</span>
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
          <el-button type="text" @click="catMembers(scope.row)" size="small"
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
        :page-size="10"
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
          <el-select placeholder="群状态">
            <el-option label="正产" value="正产"></el-option>
            <el-option label="禁言" value="禁言"></el-option>
            <el-option label="冻结" value="冻结"></el-option>
            <el-option label="删除" value="删除"></el-option>
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

    <el-dialog
      title="群成员"
      :visible.sync="groupMemberVisible"
      :close-on-click-modal="false"
    >
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="groupfilters" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="groupfilters.id" placeholder="ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="groupfilters.phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getGroupMembers"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="groupMembers" highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="120"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
      </el-table>

      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrent"
          :page-size="groupfilters.pageSize"
          :total="groupfilters.total"
          style="float: right"
        >
        </el-pagination>
      </el-col>
    </el-dialog>
  </section>
</template>

<script>
import { getGroupListPage } from "@/api/groupTable";
import { membersData } from "@/api/turst";
export default {
  data() {
    return {
      dialogFormVisible: false,
      groupMemberVisible: false,
      filters: {
        name: "",
      },
      groups: [],
      total: 0,
      page: 1,
      editGroup: {
        groupId: "",
        name: "",
        creator: "",
        owner: "",
        status: "",
        intro: "",
        qrCode: "",
        profile: "",
        allowAddFriend: "",
        allowSetNickname: "",
        allowVodChat: "",
        allowGrpQrcode: "",
        inviteConfirm: "",
        createTime: "",
      },
      groupMembers: [],
      groupfilters: {
        id: "",
        phone: "",
        groupId: "",
        total: 0,
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getGroups();
    },
    getGroups() {
      const para = {
        page: this.page,
        name: this.filters.name,
        size: 10,
      };
      getGroupListPage(para).then((res) => {
        this.groups = res.data;
        this.total = res.total;
      });
    },
    editGroupHandler(row) {
      this.dialogFormVisible = true;
      this.editGroup = Object.assign({}, row);
    },
    updateGroupData() {
      this.dialogFormVisible = false;
      this.$message({
        message: "修改群资料成功",
        type: "success",
      });
    },
    handleCurrent(val) {
      this.page = val;
      this.getGroups();
    },
    getGroupMembers() {
      const para = {
        page: this.page,
        id: this.groupfilters.id,
        phone: this.groupfilters.phone,
        groupId: this.groupfilters.groupId,
        size: 10,
      };
      membersData(para).then((res) => {
        this.groupMembers = res.data;
        this.groupfilters.total = res.total;
      });
    },
    catMembers(row) {
      this.groupMemberVisible = true;
      this.groupfilters.groupId = row.groupId;
      this.getGroupMembers();
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>

<style scoped>
</style>