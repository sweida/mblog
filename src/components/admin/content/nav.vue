<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">导航</h3>
        <div class="mo-cell mo-text-right">
          <button class="mo-btn mo-btn-positive" @click="formModal=true">新增导航</button>
        </div>
      </div>
      <div class="mb-panel-body">
        <div class="mo-table-responsive">
          <table class="mo-table mo-table-striped" width="100%">
            <thead>
              <tr>
                <th width="20%">名称</th>
                <th width="20%">类型</th>
                <th width="30%">URL</th>
                <th align="center" width="10%">排序</th>
                <th width="20%" align="right">编辑 | 删除 | 显示</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item._id">
                <td>
                  <span v-if="item.isChild" class="mo-text-hint">---- </span>{{item.name}}</td>
                <td>
                  <span v-if="item.type === 0">系统</span>
                  <span class="mo-text-primary" v-if="item.type === 1">自定义</span>
                  <span class="mo-text-negative" v-if="item.type === 2">类别</span>
                  <span class="mo-text-positive" v-if="item.type === 3">页面</span>
                </td>
                <td class="mo-text-hint">
                  <span v-if="item.type === 0 || item.type === 1">{{item.url}}</span>
                  <span v-if="item.type === 2">/c/{{item.url}}</span>
                  <span v-if="item.type === 3">/{{item.page}}</span>
                </td>
                <td align="center"><input type="number" class="mo-input input-inline input-number" v-model.lazy="item.order" @change="updateOrder(item)"></td>
                <td align="right">
                  <div class="mo-btns">
                    <button class="mo-btn mo-btn-small" @click="edit(item)">
                      <i class="mo-icon-edit"></i>
                    </button>
                    <button class="mo-btn mo-btn-small" @click="remove(item)" :disabled="item.type === 0">
                      <i class="mo-icon-delete"></i>
                    </button>

                    <div class="mo-btn mo-btn-small">
                      <label class="mo-switch mo-switch-positive">
                        <input type="checkbox" v-model="item.display" @change="updateDisplay(item)">
                        <span class="icon"></span>
                      </label>
                    </div>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <mo-modal v-model="formModal" top="5%">
      <template slot="title" v-if="!id">新增导航</template>
      <template slot="title" v-else>编辑导航</template>
      <div style="min-width: 480px;" slot="body">
        <form method="post" @submit.prevent="save">
          <div class="mo-row mb-modal-form-row" v-if="!id">
            <label class="mo-cell-2 mb-modal-form-label">方式</label>
            <div class="mo-cell-10" style="padding-top:3px;">
              <label class="mo-radio">
                <input type="radio" name="type" value="1" v-model="fd.type" />
                <span class="icon"></span>
                <span>自定义</span>
              </label>
              <label class="mo-radio">
                <input type="radio" name="type" value="2" v-model="fd.type" />
                <span class="icon"></span>
                <span>从类别新建</span>
              </label>
              <label class="mo-radio">
                <input type="radio" name="type" value="3" v-model="fd.type" />
                <span class="icon"></span>
                <span>从页面新建</span>
              </label>
            </div>
          </div>

          <!-- 自定义 -->
          <div class="mo-clearfix" v-show="fd.type == 1 || id">
            <div class="mo-row mb-modal-form-row">
              <label class="mo-cell-2 mb-modal-form-label">排序</label>
              <div class="mo-cell-10">
                <input type="number" class="mo-input" v-model="fd.order">
              </div>
            </div>

            <div class="mo-row mb-modal-form-row">
              <label class="mo-cell-2 mb-modal-form-label">名称</label>
              <div class="mo-cell-10">
                <input type="text" class="mo-input" maxlength="60" v-model="fd.name">
              </div>
            </div>

            <div class="mo-row mb-modal-form-row" v-if="fd.type == 1 && !fd.isParent">
              <label class="mo-cell-2 mb-modal-form-label">父级</label>
              <div class="mo-cell-10">
                <select class="mo-input" v-model="fd.parent">
                  <option value="">无</option>
                  <option :value="item.id" v-for="item in parentList" :key="item.id" v-if="item.id != id">{{item.name}}</option>
                </select>
              </div>
            </div>

            <div class="mo-row mb-modal-form-row">
              <label class="mo-cell-2 mb-modal-form-label">链接</label>
              <div class="mo-cell-10" v-if="fd.type == 1">
                <input type="url" class="mo-input" maxlength="120" v-model="fd.url" placeholder="http://">
              </div>
              <div class="mo-cell-10 mo-text-hint" style="padding-top:3px;" v-else>该导航地址由系统生成，无法修改</div>
            </div>

            <div class="mo-row mb-modal-form-row">
              <label class="mo-cell-2 mb-modal-form-label">新窗口</label>
              <div class="mo-cell-10" style="padding-top:3px;">
                <label class="mo-switch mo-switch-positive">
                  <input type="checkbox" v-model="fd.newTab">
                  <span class="icon"></span>
                  <span>新窗口打开</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 从类别新建 -->
          <div class="mo-clearfix" v-show="fd.type == 2 && !id">
            <div class="mb-scroller" style="max-height:240px;">
              <mb-cate-tree v-model="categories"></mb-cate-tree>
            </div>
          </div>
          <!-- 从页面新建 -->
          <div class="mo-clearfix" v-show="fd.type == 3 && !id">

          </div>
          <br/>
          <div class="mb-modal-form-row mo-text-right">
            <button type="button" class="mo-btn mo-btn-link" @click="closeModal">取消</button>
            <mo-submit v-model="committing" :click="update" v-if="id"></mo-submit>
            <mo-submit v-model="committing" :click="save" v-else></mo-submit>
          </div>
        </form>
      </div>
    </mo-modal>
  </div>
</template>
<script>
import MoSubmit from '@/components/ui/submit'
import MoBreadcrumb from '@/components/ui/breadcrumb'
import MoModal from '@/components/ui/modal'
import { arrayToTree, extend } from '@/assets/utils/'
import fields from '../field/nav'
import MbCateTree from '../common/catetree'
export default {
  name: 'mb-nav-list',
  components: {
    MoBreadcrumb,
    MoModal,
    MoSubmit,
    MbCateTree
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/content/',
          name: '内容'
        },
        {
          name: '导航'
        }
      ],
      formModal: false,
      committing: false,
      fd: extend({}, fields),
      id: null,
      list: [],
      parentList: [],
      categories: [],
    }
  },
  methods: {
    getPageList() { },
    getList() {
      this.parentList = []
      this.$http.get('/api/nav/list')
        .then(({ body }) => {
          if (body.code === 200) {
            const tree = arrayToTree(body.data)
            const data = []
            for (let i = 0, len = tree.length; i < len; i++) {
              data.push(tree[i])
              if (tree[i].children && tree[i].children.length) {
                tree[i].isParent = true
                tree[i].children.sort((a, b) => a.order - b.order)
                for (let j = 0, size = tree[i].children.length; j < size; j++) {
                  tree[i].children[j].isChild = true
                  data.push(tree[i].children[j])
                }
              }
            }
            this.list = data
            for (let i = 0, len = body.data.length; i < len; i++) {
              if (!body.data[i].parent) {
                this.parentList.push({
                  id: body.data[i]._id,
                  name: body.data[i].name
                })
              }
            }
          }
        })
    },
    save() {
      let data = Object.create(null)
      const type = Number(this.fd.type)
      data.type = type
      switch (type) {
        case 1:
          if (!this.fd.name) {
            this.$layer.toast('请输入导航名称')
            this.committing = false
            return
          }
          if (!this.fd.url) {
            this.$layer.toast('请输入有效URL地址')
            this.committing = false
            return
          }
          data = this.fd
          break
        case 2:
          if (!this.categories.length) {
            this.$layer.toast('请至少选择一个分类')
            this.committing = false
            return
          }
          data.categories = this.categories
          break
        case 3:
          break
      }

      this.$http.post('/api/nav', data)
        .then(({ body }) => {
          if (body.code === 200) {
            this.$layer.toast('保存成功', 1000)
            this.getList()
            this.closeModal()
          } else {
            this.$layer.toast(body.message)
          }
          setTimeout(() => { this.committing = false }, 2000)
        })
        .catch(e => {
          this.$layer.toast(e.statusText)
          this.committing = false
        })
    },

    update() {
      this.$http.put(`/api/nav/${this.id}`, this.fd)
        .then(({ body }) => {
          if (body.code === 200) {
            this.$layer.toast('保存成功', 1000)
            this.getList()
            this.closeModal()
          } else {
            this.$layer.toast(body.message)
          }
          setTimeout(() => { this.committing = false }, 2000)
        })
        .catch(e => {
          this.$layer.toast(e.statusText)
          this.committing = false
        })
    },

    closeModal() {
      this.formModal = false
      this.id = null
      this.fd = extend({}, fields)
    },

    edit(item) {
      this.id = item._id
      this.fd = extend(this.fd, item)
      if (!this.fd.parent) {
        this.fd.parent = ''
      }
      this.formModal = true
    },

    removeHandler(id) {
      this.$http.delete(`/api/nav/${id}`)
        .then(({ body }) => {
          if (body.code === 200) {
            this.getList()
          } else {
            this.$layer.toast(body.message)
          }
        })
        .catch(e => this.$layer.toast(e.statusText))
    },

    remove(item) {
      this.$layer.confirm(`您确定删除分类 <b class="mo-text-negative">${item.name}</b> 吗？`, (layer) => {
        this.removeHandler(item._id)
        layer.close()
      })
    },

    updateDisplay(item) {
      this.$http.put(`/api/nav/display/${item._id}`, { display: item.display })
    },

    updateOrder(item) {
      if (item.order && !isNaN(item.order)) {
        item.order = Math.floor(Number(item.order))
        this.$http.put(`/api/nav/order/${item._id}`, { order: item.order })
          .then(({ body }) => {
            if (body.code === 200) {
              this.getList()
            }
          })
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>


