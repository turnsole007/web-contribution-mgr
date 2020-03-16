<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
    >
      <template v-for="route in $router.options.routes" v-if="route.children && route.children.length">
      <template v-for="item in route.children" >
        <el-menu-item
          :key="route.path + '/' + item.path"
          :index="item.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
  </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    collapse: {
      type: Boolean
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    defaultActive () {
      return this.$route.path
    }
  }
  /* routes () {
    return this.$router.options.routes
  }, */
  /* activeMenu () {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }, */
}
</script>
