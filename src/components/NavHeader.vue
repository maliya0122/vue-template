<!--
 * @Descripttion:
 * @Date: 2020-06-08 16:53:17
 * @LastEditTime: 2020-06-09 09:52:03
-->
<template>
   <div class="header">
     <div class="search"></div>
     <div class="login">
        <svg t="1590464466770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5673" width="30" height="30"><path d="M511.435945 302.584307m-302.584307 0a302.584307 302.584307 0 1 0 605.168614 0 302.584307 302.584307 0 1 0-605.168614 0Z" fill="#515151" p-id="5674"></path><path d="M803.763157 603.459098c-23.933222-18.804674-58.123539-17.095159-80.347245 5.128548-54.704508 54.704508-129.923205 88.894825-213.689483 88.894825s-158.984975-34.190317-213.689482-88.894825c-22.223706-22.223706-56.414023-25.642738-80.347245-5.128548C123.375845 682.096828 54.995211 782.958264 32.771505 921.429048c-8.547579 56.414023 30.771285 102.570952 88.894824 102.570952H902.915077c56.414023 0 97.442404-46.156928 88.894825-102.570952-23.933222-138.470785-92.313856-239.33222-188.046745-317.96995z" fill="#515151" p-id="5675"></path></svg>
        <div class="user-info">
          <span> 你好： useradmin</span>
          <span>
           <svg t="1590464398592" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4042" width="24" height="24"><path d="M464.5 64h95.2v509h-95.2z" p-id="4043" fill="#707070"></path><path d="M685.9 227.7l-41 81.9c96.2 48.9 162.4 148.7 162.4 263.4 0 162.5-132.8 295.2-295.3 295.2-162.4 0-295.2-132.7-295.2-295.2 0-115.2 66.7-215.4 163.5-263.9l-0.7-0.2-41.6-81.1c-125.9 64-213 194.9-213 345.2 0 212.8 174.2 387 387 387s387-174.2 387-387c0.1-150.4-87-281.3-213.1-345.3z" p-id="4044" fill="#707070"></path></svg>
          </span>
        </div>
      </div>
   </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  components: {},

  created () {},

  mounted () {},

  methods: {}
}
</script>
<style lang='scss' scoped>
.header{
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .search{
    margin-left: 30px;
    margin-top: 12px;
    .el-select{
      width: 150px;
    }
    .el-input{
      width: 450px;
    }
  }
  .login{
    padding: 15px;
    width: 220px;
    height: 35px;
    margin-right: 3%;
    position: relative;
    .user-info{
      position: absolute;
      display: inline-block;
      span{
        color: #666;
        padding-left: 20px;
      }
      span:last-child{
        position: relative;
        top: 5px;
        left: 10px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
