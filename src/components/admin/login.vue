<template>
  <div class="login-viewport">
    <form class="login-form" method="post" @submit.prevent="login">
      <figure class="logo">
        <img src="../../assets/logo-white.svg" alt="mblog" />
      </figure>
      <div class="form">
        <div class="form-group">
          <input type="email" class="mo-input mo-input-large" placeholder="电子邮箱" v-model.trim="email">
        </div>
        <div class="form-group">
          <input type="password" class="mo-input mo-input-large" placeholder="登录密码" v-model.trim="password" maxlength="20">
        </div>
        <div class="form-group">
          <button class="mo-btn mo-btn-primary mo-btn-large mo-fluid" :disabled="disabled">登 录</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { isEmail } from '@/assets/utils/validate'
import Store from '@/assets/utils/store'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      committing: false
    }
  },
  computed: {
    disabled() {
      return !this.enabled()
    }
  },
  methods: {
    enabled() {
      return isEmail(this.email) && this.password.length >= 6
    },
    login() {
      if (this.enabled()) {
        this.committing = true
        this.$http.post('/api/user/admin/login', { email: this.email, password: this.password })
          .then(({ body }) => {
            if (body.code === 200) {
              Store(true, '_auth_admin_token_', body.data.token)
              Store(true, '_auto_admin_info', body.data.data)
              this.$router.push('/')
            } else {
              this.$layer.toast(body.message)
            }
            setTimeout(() => { this.committing = false }, 2000);
          })
          .catch(e => {
            this.$layer.toast(e.statusText)
            this.committing = false
          })
      }
    }
  },
  created() {
    Store(true, '_auth_admin_token_', null)
    Store(true, '_auto_admin_info', null)
  }
}
</script>