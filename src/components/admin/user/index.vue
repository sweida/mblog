<template>
  <div class="mb-viewport mo-container-fluid">
    <mb-breadcrumb :links="breadcrumb"></mb-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">用户</h3>
        <div class="mo-cell mo-text-right">
          <router-link to="/user/new/" class="mo-btn mo-btn-positive">新增用户</router-link>
        </div>
      </div>
      <div class="mb-panel-body">

      </div>
    </div>
  </div>
</template>
<script>
import mbBreadcrumb from '@/components/ui/breadcrumb'
export default {
  name: 'mb-user-list',
  components: {
    mbBreadcrumb
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/user/',
          name: '用户'
        },
        {
          name: '列表'
        }
      ],
    }
  },
  methods: {
    getList() {

    }
  },
  mounted() {

  }
}
</script>
