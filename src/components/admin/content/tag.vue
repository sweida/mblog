<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">标签</h3>
        <div class="mo-cell mo-text-right">
          <button class="mo-btn mo-btn-positive" @click="formModal=true">新增标签</button>
        </div>
      </div>
      <div class="mb-panel-body">
        <div class="mo-table-responsive">
          <table class="mo-table mo-table-striped" width="100%">
            <thead>
              <tr>
                <th width="70%">名称</th>
                <th align="center" width="10%">排序</th>
                <th width="20%" align="right">编辑 | 删除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item._id">
                <td>{{item.name}}</td>
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
      <template slot="title" v-if="!id">新增标签</template>
      <template slot="title" v-else>编辑标签</template>
      <div style="min-width: 480px;" slot="body">
        <form method="post" @submit.prevent="save">
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">名称</label>
            <div class="mo-cell-10">
              <input type="text" class="mo-input" maxlength="60" v-model="fd.name">
            </div>
          </div>
          <div class="mo-row mb-modal-form-row">
            <label class="mo-cell-2 mb-modal-form-label">排序</label>
            <div class="mo-cell-10">
              <input type="number" class="mo-input" maxlength="40" v-model="fd.order">
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
import { extend } from '@/assets/utils/'
import fields from '../field/tag'
export default {
  name: 'mb-tag-list',
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
          name: '标签'
        }
      ],
      formModal: false,
      committing: false,
      fd: extend({}, fields),
      id: null,
      list: [],
    }
  },
  methods: {
    getList() {
      this.parentList = []
      this.$http.get('/api/tag/list')
        .then(({ body }) => {
          if (body.code === 200) {
            this.list = body.data
          }
        })
    },
    save() {
      let method = 'post'
      let url = '/api/tag/'
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
      this.formModal = true
    },
    removeHandler(id) {
      this.$http.delete(`/api/tag/${id}`)
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
      this.$layer.confirm(`您确定删除标签 <b class="mo-text-negative">${item.name}</b> 吗？`, (layer) => {
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


