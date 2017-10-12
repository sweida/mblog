<template>
  <div class="mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">评论设置</h3>
        <div class="mo-cell mo-text-right">
          <mb-submit v-model="committing" :click="save"></mb-submit>
        </div>
      </div>
      <div class="mb-panel-body">
        <div class="mb-form-group">
          <h4 class="mb-form-group_title">基本</h4>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.enable" />
              <span class="icon"></span>
              <span>启用评论功能</span>
            </label>
          </div>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.visitor" />
              <span class="icon"></span>
              <span>允许游客评论</span>
            </label>
          </div>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.fieldsRequire" />
              <span class="icon"></span>
              <span>游客昵称邮箱必填</span>
            </label>
          </div>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.onlineAvatar" />
              <span class="icon"></span>
              <span>使用邮箱抓取头像</span>
            </label>
          </div>

          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.pagination" />
              <span class="icon"></span>
              <span>启用评论分页</span>
            </label>
            <span>每页显示</span>
            <input type="number" class="mo-input input-inline input-number" :disabled="!fd.pagination" v-model="fd.pageLimit">
            <span>条评论</span>
          </div>

        </div>

        <div class="mb-form-group">
          <h4 class="mb-form-group_title">邮件通知</h4>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.newCommentNoticle" />
              <span class="icon"></span>
              <span>有新评论时通知您</span>
            </label>
          </div>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.replyNotice" />
              <span class="icon"></span>
              <span>被回复时通知评论者</span>
            </label>
          </div>
        </div>

        <div class="mb-form-group">
          <h4 class="mb-form-group_title">安全</h4>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.review" />
              <span class="icon"></span>
              <span>评论必须经过审核</span>
            </label>
          </div>
          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.showLink" />
              <span class="icon"></span>
              <span>显示外部链接</span>
            </label>
          </div>

          <div class="mb-form-group_item">
            <label class="mo-switch mo-switch-positive">
              <input type="checkbox" name="useCache" v-model="fd.enableBlacklist" />
              <span class="icon"></span>
              <span>开启评论黑名单</span>
            </label>
          </div>

          <div class="mb-form-group_item">
            <p>如果评论的内容、名称、URL、电子邮件或 IP 中包含以下任意字词，评论将被移入回收站。每行输入一个字词或 IP。</p>
            <textarea class="mo-input" rows="4" v-model="fd.blacklist" :disabled="!fd.enableBlacklist"></textarea>
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
          name: '评论'
        }
      ],
      fd: extend({}, fields.comment),
      committing: false
    }
  },
  methods: {
    save() {
      this.$http.put('/api/setting', { key: 'comment', value: this.fd })
        .then(({ body }) => {
          if (body.code === 200) {
            for (let k in body.data) {
              this.$parent.data.comment = body.data.comment
            }
            setTimeout(() => { this.committing = false }, 1000)
          }
        })
    }
  },
  mounted() {
    this.fd = extend(this.fd, this.$parent.data.comment)
  }
}
</script>
