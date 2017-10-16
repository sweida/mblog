<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">文章</h3>
        <div class="mo-cell mo-text-right">
          <router-link class="mo-btn mo-btn-link" to="/content/article/" exact>返回</router-link>
          <mo-submit v-model="committing" :click="save"></mo-submit>
        </div>
      </div>
      <div class="mb-panel-body">

        <div class="mb-tabs" style="margin-top:-1rem;">
          <ul class="mb-tabs-head">
            <li class="mb-tabs-nav" :class="{'mb-tabs-nav_active' : tab === 1}" @click="toggleTab(1)">基本</li>
            <li class="mb-tabs-nav" :class="{'mb-tabs-nav_active' : tab === 2}" @click="toggleTab(2)">高级</li>
            <li class="mb-tabs-nav" :class="{'mb-tabs-nav_active' : tab === 3}" @click="toggleTab(3)">设置</li>
          </ul>
          <div class="mb-tabs-body">
            <!-- 基本 -->
            <div class="mb-tabs-pane" :class="{'mb-tabs-pane_active' : tab === 1}">
              <div class="mb-form-group">
                <div class="mb-form-group_item">
                  <input type="text" class="mo-input mo-input-large" maxlength="100" v-model="fd.title" placeholder="输入文章标题" />
                </div>

                <div class="mb-form-group_item">
                  <div class="mo-row">
                    <div class="mo-cell">
                      <div class="mo-inputs">
                        <label class="mo-inputs__cell mo-btn readonly">别名</label>
                        <input type="text" class="mo-inputs__cell mo-input" placeholder="别名用于自定义文章链接" v-model="fd.alias">
                      </div>
                    </div>
                    <div class="mo-cell">
                      <div class="mo-inputs">
                        <label class="mo-inputs__cell mo-btn readonly">分类</label>
                        <select class="mo-inputs__cell mo-input" v-model="fd.category">
                          <option value="">请选择分类</option>
                          <option :value="cat._id" v-for="cat in categoryList" :key="cat._id">{{cat.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-form-group_item">
                  <h5 class="mo-text-description">文章内容：</h5>
                  <div id="contentEditor"></div>
                </div>

              </div>
            </div>
            <!-- 高级 -->
            <div class="mb-tabs-pane" :class="{'mb-tabs-pane_active' : tab === 2}">
              <div class="mb-form-group">
                <div class="mb-form-group_item">
                  <h5 class="mo-text-description">文章摘要：</h5>
                  <textarea class="mo-input" rows="6" placeholder="文章摘要" v-model="fd.excerpt"></textarea>
                </div>
                <div class="mb-form-group_item">
                  <h5 class="mo-text-description">标签：</h5>
                  <mo-tag-picker v-model="fd.tags"></mo-tag-picker>
                </div>

                <div class="mb-form-group_item">
                  <h5 class="mo-text-description">标记：</h5>
                  <label class="mo-checkbox" v-for="(v, k) in marks" :key="k">
                    <input type="checkbox" name="mark" :value="k" v-model="fd.mark" />
                    <span class="icon"></span>
                    <span>{{v}}</span>
                  </label>

                </div>

              </div>
            </div>
            <!-- 设置 -->
            <div class="mb-tabs-pane" :class="{'mb-tabs-pane_active' : tab === 3}">
              <div class="mb-form-group">
                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.draft" />
                    <span class="icon"></span>
                    <span>保存为草稿</span>
                  </label>
                </div>

                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.allowComment" />
                    <span class="icon"></span>
                    <span>启用评论</span>
                  </label>
                </div>
                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.top" />
                    <span class="icon"></span>
                    <span>首页置顶</span>
                  </label>
                </div>
                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.categoryTop" />
                    <span class="icon"></span>
                    <span>分类置顶</span>
                  </label>
                </div>

                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.allowReward" />
                    <span class="icon"></span>
                    <span>开启打赏</span>
                  </label>
                </div>
                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.license" />
                    <span class="icon"></span>
                    <span>注明版权</span>
                  </label>
                </div>
                <div class="mb-form-group_item">
                  <label class="mo-switch mo-switch-positive">
                    <input type="checkbox" name="useCache" v-model="fd.encrypt" />
                    <span class="icon"></span>
                    <span>文章加密</span>
                  </label>
                  <input type="text" class="mo-input" style="width: auto; margin-left: 20px;" :class="{'input-visible' : fd.encrypt, 'mo-invisible' : !fd.encrypt}" placeholder="设置密码" v-model="fd.password" maxlength="20" />
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import MoSubmit from '@/components/ui/submit'
import MoBreadcrumb from '@/components/ui/breadcrumb'
import fields from '../field/article'
import { isObjectId, extend, getCateMap } from '@/assets/utils/'
import MoTagPicker from '@/components/ui/tag-picker'
export default {
  name: 'mb-user-list',
  components: {
    MoSubmit,
    MoBreadcrumb,
    MoTagPicker
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/content/',
          name: '内容'
        },
        {
          name: '文章'
        }
      ],
      committing: false,
      fd: extend({}, fields.field),
      contentEditor: null,
      tab: 1,
      marks: fields.marks,
      categoryList: [],
      id: null
    }
  },
  methods: {
    getCategoryList() {
      this.$http.get('/api/category/list')
        .then(({ body }) => {
          if (body.code === 200) {
            const map = getCateMap(body.data)
            this.categoryList = map.list
          }
        })
    },
    toggleTab(tab) {
      this.tab = tab
    },
    save() {
      let method = 'post', url = '/api/article'
      if (this.id) {
        method = 'put'
        url += '/' + this.id
      }
      const self = this
      this.$http[method](url, this.fd)
        .then(({ body }) => {
          if (body.code === 200) {
            this.$layer.toast('保存成功', 3000, {
              cancel() {
                self.$router.push('/content/article/')
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
    }
  },
  mounted() {
    this.getCategoryList()

    this.contentEditor = new wangEditor('#contentEditor')
    this.contentEditor.customConfig.onchange = (html) => {
      this.fd.contents = html
    }
    this.contentEditor.create()
  }
}
</script>
