<template>
  <div class="under-construction">
    <img src="https://via.placeholder.com/150" alt="Under Construction Image" />
    <h1>该功能正在开发</h1>
    <p>对不起，我们正在努力开发这个页面，请稍后返回查看。</p>
  </div>
</template>

<script>
export default {
  name: 'video-page',
  data () {
    // 模拟服务端返回的数据
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
.under-construction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
  font-family: 'Arial', sans-serif;
  color: #333;
  text-align: center;
  padding: 0 2em;
}

.under-construction img {
  max-width: 200px;
  margin-bottom: 2em;
}

.under-construction h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

.under-construction p {
  line-height: 1.6;
}
</style>
