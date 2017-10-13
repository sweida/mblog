<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">分类</h3>
        <div class="mo-cell mo-text-right">
          <button class="mo-btn mo-btn-positive" @click="formModal=true">新增分类</button>
        </div>
      </div>
      <div class="mb-panel-body">
        <div class="mo-table-responsive">
          <table class="mo-table mo-table-striped" width="100%">
            <thead>
              <tr>
                <th width="20%">名称</th>
                <th width="20%">别名</th>
                <th width="30%">描述</th>
                <th align="center" width="10%">排序</th>
                <th width="20%" align="right">编辑 | 删除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item._id">
                <td>
                  <span v-if="item.isChild" class="mo-text-hint">---- </span>{{item.name}}</td>
                <td>{{item.alias}}</td>
                <td>
                  <div class="td-description mo-text-overflow" v-text="item.description"></div>
                </td>
                <td align="center"><input type="number" class="mo-input input-inline input-number" v-model="item.order"></td>
                <td align="right">
                  <div class="mo-btns">
                    <button class="mo-btn mo-btn-small" @click="edit(item)">
                      <i class="mo-icon-edit"></i>
                    </button>
                    <button class="mo-btn mo-btn-small" @click="remove(item)">
                      <i class="mo-icon-delete"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <mo-modal v-model="formModal" top="5%">
      <template slot="title" v-if="!id">新增分类</template>
      <template slot="title" v-else>编辑分类</template>
      <div style="min-width: 480px;" slot="body">
        <form method="post" @submit.prevent="save">
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">名称</label>
            <div class="mo-cell-10">
              <input type="text" class="mo-input" maxlength="60" v-model="fd.name">
            </div>
          </div>
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">别名</label>
            <div class="mo-cell-10">
              <input type="text" class="mo-input" maxlength="40" v-model="fd.alias" placeholder="支持英文数字下划线短横线">
            </div>
          </div>
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">父级</label>
            <div class="mo-cell-10">
              <select class="mo-input" v-model="fd.parent">
                <option value="">无</option>
                <option :value="item.id" v-for="item in parentList" :key="item.id">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">描述</label>
            <div class="mo-cell-10">
              <textarea rows="3" class="mo-input" v-model="fd.description"></textarea>
            </div>
          </div>
          <br/>
          <div class="mb-modal-form-row mo-text-right">
            <button type="button" class="mo-btn mo-btn-link" @click="closeModal">取消</button>
            <mo-submit v-model="committing" :click="save"></mo-submit>
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
import fields from '../field/category'
export default {
  name: 'mb-user-list',
  components: {
    MoBreadcrumb,
    MoModal,
    MoSubmit
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/content/',
          name: '内容'
        },
        {
          name: '分类'
        }
      ],
      formModal: false,
      committing: false,
      fd: extend({}, fields),
      id: null,
      list: [],
      parentList: [],
    }
  },
  methods: {
    getList() {
      this.parentList = []
      this.$http.get('/api/category/list')
        .then(({ body }) => {
          if (body.code === 200) {
            const tree = arrayToTree(body.data)
            const data = []
            for (let i = 0, len = tree.length; i < len; i++) {
              data.push(tree[i])
              if (tree[i].children && tree[i].children.length) {
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
      let method = 'post'
      let url = '/api/category/'
      if (this.id) {
        method = 'put'
        url += this.id
      }
      this.$http[method](url, this.fd)
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
      this.$http.delete(`/api/category/${id}`)
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
  },
  mounted() {
    this.getList()
  }
}
</script>


