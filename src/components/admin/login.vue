<template>
  <div class="login-viewport">
    <form class="login-form">
      <figure class="logo">
        <img src="../../assets/logo-white.svg" alt="mblog" />
      </figure>
      <div class="form">
        <div class="form-group">
          <input type="text" class="mo-input mo-input-large" placeholder="电子邮箱">
        </div>
        <div class="form-group">
          <input type="text" class="mo-input mo-input-large" placeholder="登录密码">
        </div>
        <div class="form-group">
          <button class="mo-btn mo-btn-primary mo-btn-large mo-fluid">登 录</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AppLogo from '@/components/ui/logo'
export default {
  name: 'login',
  components: {
    AppLogo
  }
}
</script>