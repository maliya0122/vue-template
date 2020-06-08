<!--
 * @Descripttion:
 * @Date: 2019-12-03 10:18:54
 * @LastEditTime: 2020-06-08 20:21:19
 -->
<template>
  <div style="display: inline-block">
    <div
      class="el-backtop"
      :class="[isCollapse? 'collapse-right': 'collapse-left']"
      @click="isCollapse = !isCollapse"
    >
      <i v-if="isCollapse" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-left"></i>
    </div>
    <el-menu
      :unique-opened="true"
      :style="meunStyle"
      background-color="#03152A"
      text-color="#ddd"
      :collapse="isCollapse"
      :default-openeds="navOpeneds"
    >
      <!-- logo -->
      <div :class="[isCollapse? 'logo-hidden': 'logo']">
        <div v-if="isCollapse">
          <img src="@/assets/logo_hidden.png" />
        </div>
        <div v-else>
          <img else src="@/assets/logo.png" />
        </div>
      </div>

      <el-submenu
        :class="[isCollapse? '': 'nav-li_width']"
        :index="`${fIndex+1}`"
        v-for="(firstRoute, fIndex) in menuMap"
        :key="fIndex"
      >
        <template slot="title">
          <svg
            v-if="fIndex === 0"
            t="1590486964982"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2160"
            width="25"
            height="23"
          >
            <path
              d="M899.22048 929.38752l-64.0512-66.07872c22.18496-29.07136 35.52768-65.28512 35.52768-104.68352 0-95.44192-77.36832-172.81024-172.81024-172.81024s-172.82048 77.35808-172.82048 172.81024 77.37344 172.8 172.81024 172.81536c39.3984 0 75.6224-13.34784 104.66304-35.56352l64.05632 66.0736a23.00928 23.00928 0 0 0 32.57856 0 23.00416 23.00416 0 0 0 0.04608-32.5632z m-201.33888-44.04736c-70.00576 0-126.70976-56.71936-126.70976-126.71488 0-70.00064 56.71936-126.72512 126.70976-126.72512 70.00576 0 126.72 56.72448 126.72 126.72512 0.01536 69.99552-56.71424 126.71488-126.72 126.71488zM492.06784 494.59712c119.80288 0 214.52288-99.84 214.52288-214.528 0-119.808-94.72-214.528-214.52288-214.528-119.808 0-214.528 94.72-214.528 214.528s94.72 214.528 214.528 214.528z"
              fill="#bfbfbf"
              p-id="2161"
            />
            <path
              d="M622.93504 542.6432l-220.4672-8.12032c-144.38912 0-229.38112 109.568-229.38112 109.568-79.872 89.6-74.752 214.528-74.752 214.528 0 84.48 129.536 89.6 129.536 89.6 45.056 5.12 169.47712 5.12 234.496 5.12 40.1152 0 68.84352-5.0432 86.29248-13.81888-44.16512-44.30336-71.4752-105.4208-71.4752-172.91776 0.00512-99.95776 59.90912-185.87136 145.75104-223.95904z"
              fill="#bfbfbf"
              p-id="2162"
            />
          </svg>
          <svg
            v-if="fIndex === 1"
            t="1590487249015"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7202"
            width="25"
            height="20"
          >
            <path
              d="M327.52829653333333 371.21896319999996c-43.690666666666665 0-77.67229653333334 33.981629866666665-77.67229653333334 77.67229653333334s33.981629866666665 77.67229653333334 77.67229653333334 77.67229546666667 77.67229653333334-33.981629866666665 77.67229653333334-77.67229546666667-36.40888853333333-77.67229653333334-77.67229653333334-77.67229653333334z"
              fill="#bfbfbf"
              p-id="7203"
            />
            <path
              d="M698.8989631999999 213.44711146666668c-143.20829653333334 70.3905184-237.87140693333333 63.10874026666668-385.93422293333333 0-259.71674026666665 0-407.7795552 686.9143701333333-213.59881386666666 686.9143701333333 165.05362986666665 0 186.8989632-201.46251840000002 410.20681386666666-201.46251840000002 182.04444479999998 0 288.84385173333334 199.0352597333333 410.20681493333336 199.03525866666664 189.32622186666669 0-7.281778133333333-684.4871114666666-220.880592-684.4871104z m-371.3706666666667 364.0888885333333c-70.3905184 0-126.2174816-55.8269632-126.2174816-126.2174816s55.8269632-126.2174816 126.2174816-126.2174816 126.2174816 55.8269632 126.2174816 126.2174816-58.254221866666654 126.2174816-126.2174816 126.2174816z m288.84385173333334-118.93570346666667c-19.4180736-4.8545184-29.127111466666666-24.272593066666666-21.845333333333333-43.690666666666665 4.8545184-16.990814933333333 24.272593066666666-29.127111466666666 43.690666666666665-21.845333333333333 19.4180736 4.8545184 29.127111466666666 24.272593066666666 21.845333333333333 43.690666666666665-4.8545184 16.990814933333333-24.272593066666666 26.699851733333333-43.690666666666665 21.845333333333333z m84.95407359999999 53.399703466666665c-4.8545184 16.990814933333333-24.272593066666666 29.127111466666666-43.690666666666665 21.845333333333333-19.4180736-4.8545184-29.127111466666666-24.272593066666666-21.845333333333333-43.690666666666665 4.8545184-16.990814933333333 24.272593066666666-29.127111466666666 43.690666666666665-21.845333333333333 16.990814933333333 7.281778133333333 29.127111466666666 26.699851733333333 21.845333333333333 43.690666666666665z m4.8545184-82.52681493333333c-19.4180736-4.8545184-29.127111466666666-24.272593066666666-21.845333333333333-43.690666666666665 4.8545184-16.990814933333333 24.272593066666666-29.127111466666666 43.690666666666665-21.845333333333333 19.4180736 4.8545184 29.127111466666666 24.272593066666666 21.845333333333333 43.690666666666665-7.281778133333333 16.990814933333333-26.699851733333333 26.699851733333333-43.690666666666665 21.845333333333333z m87.38133333333333 58.254221866666654c-4.8545184 16.990814933333333-24.272593066666666 29.127111466666666-43.690666666666665 21.845333333333333-19.4180736-4.8545184-29.127111466666666-24.272593066666666-21.845333333333333-43.690666666666665 4.8545184-16.990814933333333 24.272593066666666-29.127111466666666 43.690666666666665-21.845333333333333 16.990814933333333 4.8545184 26.699851733333333 24.272593066666666 21.845333333333333 43.690666666666665z"
              fill="#bfbfbf"
              p-id="7204"
            />
          </svg>
          <svg
            v-if="fIndex === 2"
            t="1590487365694"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9843"
            width="25"
            height="16"
          >
            <path
              d="M384 480 96 480C44.8 480 0 435.2 0 384L0 96C0 44.8 44.8 0 96 0L384 0c51.2 0 96 44.8 96 96L480 384C480 435.2 435.2 480 384 480z"
              p-id="9844"
              fill="#bfbfbf"
            />
            <path
              d="M384 1024 96 1024C44.8 1024 0 979.2 0 928L0 640c0-51.2 44.8-96 96-96L384 544c51.2 0 96 44.8 96 96l0 281.6C480 979.2 435.2 1024 384 1024z"
              p-id="9845"
              fill="#bfbfbf"
            />
            <path
              d="M787.2 1024 787.2 1024c-134.4 0-243.2-108.8-243.2-236.8l0 0c0-134.4 108.8-236.8 236.8-236.8l0 0c134.4 0 236.8 108.8 236.8 236.8l0 0C1024 915.2 915.2 1024 787.2 1024z"
              p-id="9846"
              fill="#bfbfbf"
            />
            <path
              d="M928 480 640 480C588.8 480 544 435.2 544 384L544 96C544 44.8 588.8 0 640 0l281.6 0C979.2 0 1024 44.8 1024 96L1024 384C1024 435.2 979.2 480 928 480z"
              p-id="9847"
              fill="#bfbfbf"
            />
          </svg>
          <span>{{firstRoute.name}}</span>
        </template>

        <!-- 多层child嵌套 -->
        <div v-if="firstRoute.hasChild > 2">
          <el-submenu
            :index="`${fIndex+1}-${sIndex+1}`"
            v-for="(secondRoute, sIndex) in firstRoute.children"
            :key="sIndex"
          >
            <template slot="title">{{secondRoute.name}}</template>
            <el-menu-item
              :index="`${fIndex+1}-${sIndex+1}-${eIndex+1}`"
              v-for="(lastRoute, eIndex) in secondRoute.children"
              :key="eIndex"
              @click="toPage(fIndex, sIndex, eIndex)"
              :class="[thisRoutName === getCurRoute(fIndex, sIndex, eIndex)? 'list-index':'list-defalut']"
            >{{lastRoute.name}}</el-menu-item>
          </el-submenu>
        </div>

        <!-- 只有一层child -->
        <el-menu-item-group v-else>
          <el-menu-item
            :index="`${fIndex+1}-${sIndex+1}`"
            v-for="(secondRoute, sIndex) in firstRoute.children"
            :key="sIndex"
            @click="toPage(fIndex, sIndex)"
            :class="[thisRoutName === getCurRoute(fIndex, sIndex)? 'list-index':'list-defalut']"
          >{{secondRoute.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menuMap, _layout, transformRouterConfig } from '@/router/index'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  data () {
    return {
      isCollapse: false,
      childDeep: 1,
      menuMap: [],
      thisRoutName: '',
      meunStyle: {
        height: '',
        position: 'relative'
      },
      navOpeneds: []
    }
  },
  methods: {
    // 菜单导航跳转
    toPage (index, cIndex, eIndex) {
      let fullpath
      if (eIndex || eIndex === 0) {
        fullpath = `${_layout.path}/${this.menuMap[index].path}/${this.menuMap[index].children[cIndex].path}/${this.menuMap[index].children[cIndex].children[eIndex].path}`
      } else {
        fullpath = `${_layout.path}/${this.menuMap[index].path}/${this.menuMap[index].children[cIndex].path}`
      }

      this.$router.push(fullpath)
    },
    init () {
      // 递归检查路由有几层child
      const checkedChild = router => {
        if (router.children) {
          this.childDeep++
          router.children.forEach(_child => {
            checkedChild(_child)
          })
        }
        return this.childDeep
      }
      this.menuMap = menuMap.map(_child => {
        this.childDeep = 1
        return {
          ..._child,
          hasChild: checkedChild(_child)
        }
      })
    },
    // 展开、收起
    chartResize () {
      try {
        const $mainHeight = document.querySelector('.container-main')
        this.meunStyle.height = $mainHeight.offsetHeight + 280 + 'px'
        const windHeight = document.documentElement.clientHeight
        const menuHeight = parseInt(
          this.meunStyle.height.substring(0, this.meunStyle.height.length - 2)
        )
        this.meunStyle.height =
          menuHeight >= windHeight ? menuHeight + 'px' : windHeight + 'px'
      } catch (error) {
        console.log(error)
      }
    },
    menuPosition () {
      // 菜单栏对应位置
      this.thisRoutName = this.$route.name
      // 菜单栏对应展开
      this.navOpeneds = []
      const _meunmap = menuMap.map((_child, index) => {
        return transformRouterConfig(_child, menuMap, index)
      })
      _meunmap.forEach(_child => {
        this.getCurOpenIndex(this.thisRoutName, _child)
      })
    },
    // 当前打开的 sub-menu 的 index 的数组
    getCurOpenIndex (curRooutName, root) {
      if (root.children) {
        root.children.forEach(_child => {
          this.getCurOpenIndex(curRooutName, _child)
        })
      } else {
        if (root.name === curRooutName) {
          const meunStr = root.emunId.split('-')
          let curStr = null
          meunStr.forEach(_str => {
            if (!curStr) {
              curStr = _str
            } else {
              curStr += `-${_str}`
            }
            this.navOpeneds.push(curStr) // [1, 1-2 , 1-2-3]
          })
        }
      }
    },
    // 获取当前路由的name
    getCurRoute (fIndex, sIndex, eIndex) {
      if (eIndex || eIndex === 0) {
        return this.menuMap[fIndex].children[sIndex].children[eIndex].name
      } else {
        return this.menuMap[fIndex].children[sIndex].name
      }
    }
  },
  mounted () {
    this.init()
    this.chartResize()
    // 切页面菜单栏自适应
    const $mainHeight = document.querySelector('.container-main')
    this.erd = elementResizeDetectorMaker()
    this.erd.listenTo($mainHeight, this.chartResize)
    // 视窗变化菜单栏自适应
    window.onresize = () => {
      this.chartResize()
    }
    this.menuPosition()
  },
  watch: {
    $route (to, from) {
      this.menuPosition()
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 70px;
  width: 200px;
  background-color: #03152a;
  margin: 0;
}
.logo img {
  position: relative;
  left: 10px;
  top: 5px;
  width: 90%;
  height: auto;
}
.logo-hidden {
  height: 70px;
  width: 64px;
  background-color: #03152a;
  margin: 0;
}
.logo-hidden img {
  width: 55px;
  background-color: #03152a;
  margin: 5px;
}
.list-index {
  color: #fff !important;
  background: #409eff !important;
}
.list-defalut {
  color: #ddd !important;
}
.nav-li_width {
  width: 200px;
}
.collapse {
  position: absolute;
  z-index: 99;
}
.collapse-right {
  position: absolute;
  top: 50%;
  left: 45px;
}
.collapse-left {
  position: absolute;
  top: 50%;
  left: 180px;
}
</style>

<style lang="scss">
//修改子菜单的背景色
.el-menu-item {
  background-color: #03152a !important;
}
//字体颜色：
.el-aside {
  color: #333;
}
//鼠标悬浮时，子菜单的样式
.el-menu-item:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #2268b0 !important;
}
//.鼠标悬浮时，主菜单的样式
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #2268b0 !important;
}
</style>
