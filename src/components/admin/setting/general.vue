<template>
  <div class="mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">常规设置</h3>
        <div class="mo-cell mo-text-right">
          <mb-submit v-model="committing" :click="save"></mb-submit>
        </div>
      </div>
      <div class="mb-panel-body">

        <div class="mo-form-row">
          <label class="mo-form-label">
            <span>
              <sub class="mo-text-negative">*&nbsp;</sub>站点标题</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" maxlength="40" v-model="fd.title" spellcheck="false" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">
            <span>
              <sub class="mo-text-negative">*&nbsp;</sub>站点描述</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <textarea class="mo-input" rows="3" v-model="fd.description" spellcheck="false"></textarea>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">
            <span>
              <sub class="mo-text-negative">*&nbsp;</sub>语言</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <select class="mo-input" v-model="fd.lang">
                  <option value="zh">中文</option>
                </select>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">
            <span>
              <sub class="mo-text-negative">*&nbsp;</sub>版权信息</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <textarea class="mo-input" rows="3" v-model="fd.copyright" spellcheck="false"></textarea>
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
  name: 'mb-setting-general',
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
          name: '常规'
        }
      ],
      fd: extend({}, fields.general),
      committing: false
    }
  },
  methods: {
    save() {
      this.$http.put('/api/setting/batch', { key: 'general', value: this.fd })
        .then(({ body }) => {
          if (body.code === 200) {
            this.$parent.data.general = body.data.general
            setTimeout(() => { this.committing = false }, 1000)
          }
        })
    }
  },
  mounted() {
    this.fd = extend(this.fd, this.$parent.data.general)
  }
}
</script>
