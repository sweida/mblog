<template>
  <div class="mb-viewport">
    <template v-if="loaded">
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
import fields from '../field/setting'
import { extend } from '@/assets/utils/'
export default {
  data() {
    return {
      loaded: false,
      data: {}
    }
  },
  created() {
    this.$http.get('/api/setting')
      .then(({ body }) => {
        if (body.code === 200) {
          this.data = body.data ? body.data : extend({}, fields)
          this.loaded = true
        }
      })
  }
}
</script>
