<template>
  <div class="mb-viewport mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">
          <template v-if="!id">添加新用户</template>
          <template v-else>编辑用户信息（{{fd.nick}}）</template>
        </h3>
        <div class="mo-cell mo-text-right">
          <router-link class="mo-btn mo-btn-link" to="/user/" exact>返回</router-link>
          <mb-submit v-model="committing" :click="save"></mb-submit>
        </div>
      </div>
      <div class="mb-panel-body">

        <div class="mo-form-row">
          <label class="mo-form-label">邮箱</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="email" class="mo-input" maxlength="100" v-model="fd.email" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">昵称</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="text" class="mo-input" maxlength="100" v-model="fd.nick" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row" v-if="!id">
          <label class="mo-form-label">密码</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="password" class="mo-input" maxlength="100" v-model="fd.password" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row" v-if="!id">
          <label class="mo-form-label">确认密码</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <input type="password" class="mo-input" maxlength="100" v-model="fd.password2" />
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">性别</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <label class="mo-radio">
                  <input type="radio" name="sex" value="1" v-model="fd.sex" />
                  <span class="icon"></span>
                  <span>先生</span>
                </label>
                <label class="mo-radio">
                  <input type="radio" name="sex" value="2" v-model="fd.sex" />
                  <span class="icon"></span>
                  <span>女士</span>
                </label>
                <label class="mo-radio">
                  <input type="radio" name="sex" value="3" v-model="fd.sex" />
                  <span class="icon"></span>
                  <span>保密</span>
                </label>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row">
          <label class="mo-form-label">角色</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <label class="mo-radio">
                  <input type="radio" name="role" value="1" v-model="fd.role" />
                  <span class="icon"></span>
                  <span>普通用户</span>
                </label>
                <label class="mo-radio">
                  <input type="radio" name="role" value="100" v-model="fd.role" />
                  <span class="icon"></span>
                  <span>管理员</span>
                </label>
                <label class="mo-radio">
                  <input type="radio" name="role" value="200" v-model="fd.role" />
                  <span class="icon"></span>
                  <span>超级管理员</span>
                </label>
              </div>
              <div class="mo-cell-5">&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="mo-form-row" v-show="fd.role == 100">
          <label class="mo-form-label top">权限</span>
          </label>
          <div class="mo-form-flex">
            <div class="mo-row">
              <div class="mo-cell-7">
                <div class="checkbox-group" v-for="(value, key) in jurisdiction" :key="key">
                  <h5 class="checkbox-group-label">{{value.name}}</h5>
                  <label class="mo-checkbox" v-for="(item, k) in value.data" :key="k">
                    <input type="checkbox" name="jurisdiction" :value="`${key}-${k}`" v-model="fd.jurisdiction" />
                    <span class="icon"></span>
                    <span>{{item}}</span>
                  </label>
                </div>
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
import fields from '../field/user'
import { isObjectId, extend } from '@/assets/utils/'
export default {
  name: 'mb-user-form',
  components: {
    mbSubmit,
    mbBreadcrumb
  },
  data() {
    let id = this.$route.params.id
    id = isObjectId(id) ? id : null
    return {
      breadcrumb: [
        {
          url: '/user/',
          name: '用户'
        }
      ],
      committing: false,
      fd: extend({}, fields.fields),
      jurisdiction: fields.jurisdiction,
      id
    }
  },
  methods: {
    save() {
      const method = this.id ? 'put' : 'post'
      const url = this.id ? `/api/user/${this.id}` : '/api/user'
      const self = this
      this.$http[method](url, this.fd)
        .then(
        ({ body }) => {
          if (body.code === 200) {
            this.$layer.toast('保存成功', 3000, {
              cancel() {
                self.$router.push('/user')
              }
            })
          } else {
            this.$layer.toast(body.message)
            this.committing = false
          }
        })
        .catch(e => {
          this.$layer.toast(e.statusText)
          this.committing = false
        })
    },
    getUserInfo() {
      const self = this
      this.fd.password2 = ''
      this.$http.get(`/api/user/${this.id}`)
        .then(({ body }) => {
          if (body.code === 200) {
            for (let key in this.fd) {
              if (body.data[key]) {
                this.fd[key] = body.data[key]
              }
            }
          } else {
            this.$layer.toast(body.message, 2000, {
              cancel() {
                self.$router.push('/user/')
              }
            })
          }
        })
    }
  },
  mounted() {
    if (this.id) {
      this.getUserInfo()
    }
    this.breadcrumb.push({
      name: this.id ? `编辑用户信息` : '添加新用户'
    })
  }
}
</script>
