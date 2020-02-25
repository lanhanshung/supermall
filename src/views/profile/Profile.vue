<template>
  <div>
    <nav-bar class="nav-bar"><div slot="center">登录</div></nav-bar>
    <form action="">
      <label for="">手机号:</label><input type="text" name="" id="" /><br/>
      <label for="">密码:</label><input type="text" name="" id="" /><br/>
      <label for="">验证码:</label><input type="text" name="" id="" /><br/>
      <button @click.prevent="">登录</button>
    </form>
    <div class="other">
        <span>验证码登录</span>
        <span>手机快速注册</span> 
    </div>
  </div>
</template>

<script>
import NavBar from 'components/comment/navbar/NavBar'
export default {
  name: 'Profile',
  data () {
    return {}
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
form{
    margin-left: 30px;
}
input {
  border: none;
  outline:0;
  width: 200px;
  height: 30px;
  margin: 30px 0 0 15px;
  border-bottom: 1px solid #ccc;
}
button{
    width: 200px;
    height: 50px;
    border-radius: 30px;
    margin: 30px 0 0 50px;
    background-color: #fab3b3;
    color: #ffffff;
}
.other{
    margin-top: 30px;
    display: flex;
    justify-content:space-around;
}

</style>
