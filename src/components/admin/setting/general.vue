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
          <label class="mo-form-label">站点标题</span>
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
          <label class="mo-form-label">站点副标题</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" maxlength="40" v-model="fd.subtitle" spellcheck="false" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label top">站点关键词</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <textarea class="mo-input" rows="3" v-model="fd.keyword" spellcheck="false"></textarea>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label top">站点描述</label>
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
          <label class="mo-form-label">语言</label>
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
          <label class="mo-form-label">每页显示</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="number" class="mo-input input-inline input-number" v-model="fd.pageSize">&nbsp;&nbsp;篇文章
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">浏览器标题方案</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <select class="mo-input" v-model="fd.titleType">
                  <option value="1">文章标题</option>
                  <option value="2">站点标题</option>
                  <option value="3">文章标题 - 站点标题</option>
                </select>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">ICP备案号</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.icp">
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">版权信息</label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" v-model="fd.copyright">
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
      this.$http.put('/api/setting', { key: 'general', value: this.fd })
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
