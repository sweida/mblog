<template>
  <div class="mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">上传设置</h3>
        <div class="mo-cell mo-text-right">
          <mb-submit v-model="committing" :click="save"></mb-submit>
        </div>
      </div>
      <div class="mb-panel-body">

        <div class="mo-form-row">
          <label class="mo-form-label">
            <span>
              <sub class="mo-text-negative">*&nbsp;</sub>云存储</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <select class="mo-input" v-model="fd.storage">
                  <option value="qiniu">七牛云存储</option>
                </select>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-clearfix" v-if="fd.storage === 'qiniu'">
          <div class="mo-form-row">
            <label class="mo-form-label">
              <span>
                <sub class="mo-text-negative">*&nbsp;</sub>域名</span>
            </label>
            <div class="mo-form-flex">
              <div class="mo-row">
                <div class="mo-cell-7">
                  <input type="text" class="mo-input" v-model="fd.qiniu.domain">
                </div>
                <div class="mo-cell-5">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="mo-form-row">
            <label class="mo-form-label">
              <span>
                <sub class="mo-text-negative">*&nbsp;</sub>accessKey</span>
            </label>
            <div class="mo-form-flex">
              <div class="mo-row">
                <div class="mo-cell-7">
                  <input type="text" class="mo-input" v-model="fd.qiniu.accessKey">
                </div>
                <div class="mo-cell-5">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="mo-form-row">
            <label class="mo-form-label">
              <span>
                <sub class="mo-text-negative">*&nbsp;</sub>secretKey</span>
            </label>
            <div class="mo-form-flex">
              <div class="mo-row">
                <div class="mo-cell-7">
                  <input type="text" class="mo-input" v-model="fd.qiniu.secretKey">
                </div>
                <div class="mo-cell-5">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="mo-form-row">
            <label class="mo-form-label">
              <span>
                <sub class="mo-text-negative">*&nbsp;</sub>bucket</span>
            </label>
            <div class="mo-form-flex">
              <div class="mo-row">
                <div class="mo-cell-7">
                  <input type="text" class="mo-input" v-model="fd.qiniu.bucket">
                </div>
                <div class="mo-cell-5">&nbsp;</div>
              </div>
            </div>
          </div>

        </div>

        <div class="mo-clearfix" v-else>

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
          name: '上传'
        }
      ],
      fd: extend({}, fields.upload),
      committing: false
    }
  },
  methods: {
    save() {
      this.$http.put('/api/setting/batch', { key: 'upload', value: this.fd })
        .then(({ body }) => {
          if (body.code === 200) {
            for (let k in body.data) {
              this.$parent.data.upload = body.data.upload
            }
            setTimeout(() => { this.committing = false }, 1000)
          }
        })
    }
  },
  mounted() {
    this.fd = extend(this.fd, this.$parent.data.upload)
  }
}
</script>
