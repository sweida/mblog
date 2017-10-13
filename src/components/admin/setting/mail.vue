<template>
  <div class="mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">邮件设置</h3>
        <div class="mo-cell mo-text-right">
          <mb-submit v-model="committing" :click="save"></mb-submit>
        </div>
      </div>
      <div class="mb-panel-body">

        <div class="mo-form-row">
          <label class="mo-form-label">加密</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <label class="mo-switch mo-switch-positive">
                  <input type="checkbox" name="useCache" v-model="fd.secure" />
                  <span class="icon"></span>
                </label>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">主机</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.host">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">端口</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.port">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">用户名</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.user">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">密码</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.password">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">发件邮箱</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="email" class="mo-input" v-model="fd.mail">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import mbSubmit from '@/components/ui/submit'
import mbBreadcrumb from '@/components/ui/breadcrumb'
import fields from '../field/setting'
import { extend } from '@/assets/utils/'
export default {
  name: 'mb-setting-upload',
  components: {
    mbSubmit,
    mbBreadcrumb
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/setting/',
          name: '设置'
        },
        {
          name: '邮件'
        }
      ],
      fd: extend({}, fields.mail),
      committing: false
    }
  },
  methods: {
    save() {
      this.$http.put('/api/setting', { key: 'mail', value: this.fd })
        .then(({ body }) => {
          if (body.code === 200) {
            for (let k in body.data) {
              this.$parent.data.mail = body.data.mail
            }
            setTimeout(() => { this.committing = false }, 1000)
          }
        })
    }
  },
  mounted() {
    this.fd = extend(this.fd, this.$parent.data.mail)
  }
}
</script>
