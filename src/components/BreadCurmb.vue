<!--
 * @Descripttion:
 * @Date: 2020-06-09 11:00:10
 * @LastEditTime: 2020-06-09 11:00:45
-->
<template>
  <div class="bread-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <slot name="parentPath"></slot>
      <slot name="childPath"></slot>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .bread-box{
    border-width: 1px;
    border-style: solid;
    border-color: rgb(235, 235, 235);
    border-image: initial;
    border-radius: 3px;
    transition: all 0.2s ease 0s;
    padding: 20px 25px;
    // background-color: rgb(235, 235, 235);
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
