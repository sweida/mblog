<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">
          <div class="mo-inputs">
            <button class="mo-btn" @click="init">全部文章</button>
            <input type="text" placeholder="请输入关键字" class="mo-inputs__cell mo-input input-search" v-model="params.keyword">
            <button class="mo-inputs__cell mo-btn" @click="search">
              <i class="mo-icon-search"></i>
            </button>
          </div>
        </h3>
        <div class="mo-cell mo-text-right">
          <router-link to="/content/article/new/" class="mo-btn mo-btn-positive">新增文章</router-link>
        </div>
      </div>
      <div class="mb-panel-body">
        <div class="mo-table-responsive">
          <table class="mo-table mo-table-striped" width="100%">
            <thead>
              <tr>
                <th width="25%">标题</th>
                <th width="10%">分类</th>
                <th width="10%">创建者</th>
                <th width="8%">
                  <mo-sort v-model="params.sort" name="comments" :type="params.sortType" @change="sortChange">评论</mo-sort>
                </th>
                <th width="8%">
                  <mo-sort v-model="params.sort" name="views" :type="params.sortType" @change="sortChange">浏览</mo-sort>
                </th>
                <th width="12%">
                  <mo-sort v-model="params.sort" name="create" :type="params.sortType" @change="sortChange">创建时间</mo-sort>
                </th>
                <th width="12%">
                  <mo-sort v-model="params.sort" name="update" :type="params.sortType" @change="sortChange">最后修改</mo-sort>
                </th>
                <th width="15%" align="right">编辑 | 删除 | 状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item._id">
                <td>{{item.title}}</td>
                <td>
                  <template v-if="item.category">{{item.category.name}}</template>
                  <template v-else>未分类</template>
                </td>
                <td>{{item.user.nick}}</td>
                <td>{{item.count.comments}}</td>
                <td>{{item.count.views}}</td>
                <td>{{item.createTime | formatDate('yy-MM-dd hh:mm')}}</td>
                <td>{{item.updateTime | formatDate('yy-MM-dd hh:mm')}}</td>
                <td align="right">
                  <div class="mo-btns">
                    <router-link :to="`/user/${item._id}`" class="mo-btn mo-btn-small">
                      <i class="mo-icon-edit"></i>
                    </router-link>
                    <button class="mo-btn mo-btn-small" @click="remove(item)">
                      <i class="mo-icon-delete"></i>
                    </button>
                    <div class="mo-btn mo-btn-small">
                      <label class="mo-switch mo-switch-positive">
                        <input type="checkbox" v-model="item.enabled" @change="updateEnabled(item)">
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
      <div class="mb-panel-foot mo-text-right" v-if="count">
        <mo-paging :pageIndex="params.page" :pageSize="params.limit" :total="count" :showPageSizes="true" @change="pageChange"></mo-paging>
      </div>
    </div>
  </div>
</template>
<script>
import MoBreadcrumb from '@/components/ui/breadcrumb'
import MoPaging from '@/components/ui/paging'
import MoSort from '@/components/ui/sort'
export default {
  name: 'mb-user-list',
  components: {
    MoBreadcrumb,
    MoPaging,
    MoSort
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/content/',
          name: '内容'
        }, {
          url: '/content/article/',
          name: '文章'
        },
        {
          name: '列表'
        }
      ],
      list: null,
      count: 0,
      params: {
        keyword: null,
        page: 1,
        limit: 20,
        sort: '',
        sortType: ''
      },
    }
  },
  methods: {
    getList() {
      this.$http.get('/api/article/list', { params: this.params })
        .then(({ body }) => {
          if (body.code === 200) {
            this.list = body.data.list
            this.count = body.data.count
          }
        })
        .catch(e => this.$layer.toast(e.statusText))
    },
    init() {
      this.params.keyword = ''
      this.params.page = 1
      this.getList()
    },
    search() {
      if (this.params.keyword) {
        this.params.page = 1
        this.getList()
      }
    },
    pageChange(page, limit) {
      this.params.page = page
      this.params.limit = limit
      this.getList()
    },
    sortChange(name, type) {
      this.params.sort = name
      this.params.sortType = type
      this.getList()
    },
    removeHandler(id) {
      this.$http.delete(`/api/article/${id}`)
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
      this.$layer.confirm(`您确定删除文章 <b class="mo-text-negative">${item.title}</b> 吗？`, (layer) => {
        this.removeHandler(item._id)
        layer.close()
      })
    },
    updateEnabled(item) {
      this.$http.put(`/api/user/enabled/${item._id}`, { enabled: item.enabled })
        .then(({ body }) => {
          if (body.code === 200) {
          } else {
            item.enabled = true
            this.$layer.toast(body.message)
          }
        })
        .catch(e => this.$layer.toast(e.statusText))
    }
  },
  mounted() {
    this.init()
  }
}
</script>
