<template>
  <div class="mb-viewport mo-container-fluid">
    <mo-breadcrumb :links="breadcrumb"></mo-breadcrumb>
    <div class="mb-panel">
      <div class="mb-panel-head mo-row">
        <h3 class="mo-cell">页面</h3>
        <div class="mo-cell mo-text-right">
          <router-link to="" class="mo-btn mo-btn-positive">新增页面</router-link>
        </div>
      </div>
      <div class="mb-panel-body">

      </div>
    </div>
  </div>
</template>
<script>
import MoBreadcrumb from '@/components/ui/breadcrumb'
export default {
  name: 'mb-user-list',
  components: {
    MoBreadcrumb
  },
  data() {
    return {
      breadcrumb: [
        {
          url: '/content/',
          name: '内容'
        },
        {
          name: '页面'
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
