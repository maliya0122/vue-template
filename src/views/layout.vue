<!--
 * @Descripttion:
 * @Date: 2020-06-03 13:56:50
 * @LastEditTime: 2020-06-08 16:57:09
-->
<template>
    <el-container class="layout">
      <el-aside width="auto">
        <MenuList></MenuList>
      </el-aside>

      <el-main>
        <NavHeader></NavHeader>

        <div class="list-table">
          <div class="container-main">
            <transition name="fade-transform" mode="out-in">
              <router-view />
            </transition>
          </div>
        </div>
      </el-main>

    </el-container>
</template>

<script>
import MenuList from '../components/MenuList'
import NavHeader from '../components/NavHeader'
export default {
  data () {
    return {}
  },
  components: {
    MenuList,
    NavHeader
  },

  created () {},

  mounted () {},

  methods: {}
}
</script>
<style lang='scss' scoped>
.layout{
  width: 100%;
  height: auto;
  min-width: 1350px;
  .header{
    height: 65px;
    width: 100%;
    padding: 0;
  }
  .el-main{
    padding: 0;
  }
  .list-table{
    margin-top: 10px;
    width: 100%;
    .container-main{
      padding: 10px;
      height: auto;
      text-align: center;
    }
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
