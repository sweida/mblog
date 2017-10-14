<template>
  <nav class="mb-nav">
    <ul>
      <li>
        <router-link to="/dashboard/" class="nav-link">
          <mb-icon name="home"></mb-icon>
          <span class="nav-label">仪表盘</span>
        </router-link>
      </li>
      <mb-dropmenu v-model="contentOpen">
        <router-link to="/content/" slot="toggle" class="nav-link">
          <mb-icon name="library_books"></mb-icon>
          <span class="nav-label">内容</span>
        </router-link>
        <ul slot="body">
          <li>
            <router-link to="/content/article/" class="nav-link-child">
              <span class="nav-label">文章</span>
            </router-link>
          </li>
          <li>
            <router-link to="/content/page/" class="nav-link-child">
              <span class="nav-label">页面</span>
            </router-link>
          </li>
          <li>
            <router-link to="/content/cate/" class="nav-link-child">
              <span class="nav-label">分类</span>
            </router-link>
          </li>
          <li>
            <router-link to="/content/nav/" class="nav-link-child">
              <span class="nav-label">导航</span>
            </router-link>
          </li>
          <li>
            <router-link to="/content/tag/" class="nav-link-child">
              <span class="nav-label">标签</span>
            </router-link>
          </li>
          <li>
            <router-link to="/content/link/" class="nav-link-child">
              <span class="nav-label">链接</span>
            </router-link>
          </li>
        </ul>
      </mb-dropmenu>
      <li>
        <router-link to="/comment/" class="nav-link">
          <mb-icon name="speaker"></mb-icon>
          <span class="nav-label">评论</span>
        </router-link>
      </li>
      <li>
        <router-link to="/user/" class="nav-link">
          <mb-icon name="people"></mb-icon>
          <span class="nav-label">用户</span>
        </router-link>
      </li>
      <li>
        <router-link to="/theme/" class="nav-link">
          <mb-icon name="palette"></mb-icon>
          <span class="nav-label">主题</span>
        </router-link>
      </li>
      <mb-dropmenu v-model="settingOpen">
        <router-link to="/setting/" slot="toggle" class="nav-link">
          <mb-icon name="settings"></mb-icon>
          <span class="nav-label">设置</span>
        </router-link>
        <ul slot="body">
          <li>
            <router-link to="/setting/general/" class="nav-link-child" exact>
              <span class="nav-label">常规</span>
            </router-link>
          </li>
          <li>
            <router-link to="/setting/upload/" class="nav-link-child" exact>
              <span class="nav-label">上传</span>
            </router-link>
          </li>
          <li>
            <router-link to="/setting/mail/" class="nav-link-child" exact>
              <span class="nav-label">邮件</span>
            </router-link>
          </li>
          <li>
            <router-link to="/setting/comment/" class="nav-link-child" exact>
              <span class="nav-label">评论</span>
            </router-link>
          </li>
        </ul>
      </mb-dropmenu>
    </ul>
  </nav>
</template>
<script>
import MbDropmenu from '../../ui/dropmenu'
import MbIcon from '../../ui/icon'
export default {
  name: 'mb-nav',
  components: {
    MbIcon,
    MbDropmenu
  },
  data() {
    return {
      contentOpen: false,
      settingOpen: false
    }
  },
  methods: {
    toggleRoute(path) {
      this.contentOpen = !!/\/content/.test(path)
      this.settingOpen = !!/\/setting/.test(path)
    }
  },
  mounted() {
    this.toggleRoute(this.$route.path)
  },
  watch: {
    $route(to, from) { }
  }
}
</script>
