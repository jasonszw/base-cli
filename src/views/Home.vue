<template>
  <div class="home"></div>
</template>
<script>
  export default {
    name: 'Home',
    components: {},
    data() {
      return {}
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    //方法集合
    methods: {},
  }
</script>
<style scoped lang="scss">
  .home {
    width: 750px;
    height: 200px;
    background: #000;
  }
</style>
