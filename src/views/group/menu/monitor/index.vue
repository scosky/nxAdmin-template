<template>
  <div class="app-container">
    <div class="item" style="color: #42b983">
      <h4>【{{ name }} &nbsp;群】报奖信息</h4>
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      class="monitor"
      style="overflow: auto"
      ref="chatContent"
    >
      <div v-for="item in data" :key="item.index" class="content">
        <p>红包发送者:&nbsp;{{ item.name }}</p>
        <p>发包:&nbsp;{{ item.sendBox }}</p>
        <p>金额:&nbsp;{{ item.amount }}元</p>
        <p>开奖:&nbsp;{{ item.draw }}</p>
        <p>赔付:&nbsp;{{ item.money }}元</p>
        <p>时间:&nbsp;{{ item.createTime }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Mock from "mockjs";
export default {
  name: "monitor",
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
      count: 0,
      data: [],
      busy: false,
    };
  },
  methods: {
    loadMore: function () {
      this.busy = true;
      setTimeout(() => {
        const data = {
          name: Mock.Random.cname(),
          sendBox:
            "[" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "]-" +
            Mock.Random.integer(1, 9),
          amount: Mock.Random.integer(0, 100),
          draw:
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9) +
            "-" +
            Mock.Random.integer(1, 9),
          money:
            Mock.Random.integer(1, 10000) +
            " 赔率:" +
            Mock.Random.integer(1, 20),
          createTime: Mock.Random.now("yyyy-MM-dd HH:mm:ss"),
        };
        this.data.push(data);
        this.busy = false;
        this.scrollToBottom();
      }, 1000);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.monitor {
  border-radius: 4px;
  width: 80%;
  height: 480px;
  border: 1px solid #42b983;
}
.content {
  background: rgb(49, 180, 141);
  color: #fff;
  font-size: 14px;
  border-bottom: 1px dashed#fff;
  border-top: 1px dashed#fff;
}
.content p {
  padding-left: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.content p:first-child {
  margin-top: 10px;
}

.content p:last-child {
  margin-bottom: 10px;
}
</style>