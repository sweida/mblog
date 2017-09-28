<template>
  <div class="mb-container">
    <header class="mb-head"></header>
    <aside class="mb-aside">
      <figure class="mb-logo">
        <!-- <img src="../../assets/logo-white.svg" alt="mblog" /> -->
      </figure>
      <nav class="mb-nav">
        <ul>
          <li>
            <router-link to="/dashboard" class="nav-link"><mb-icon name="home"></mb-icon><span class="nav-label">仪表盘</span></router-link to="/dashboard">
          </li>
          <mb-dropmenu>
            <router-link to="/content" slot="toggle" class="nav-link"><mb-icon name="library_books"></mb-icon><span class="nav-label">内容</span></router-link>
            <ul slot="body">
              <li><router-link to="/content/page" class="nav-link-child"><span class="nav-label">页面</span></router-link></li>
              <li><router-link to="/content/article" class="nav-link-child"><span class="nav-label">文章</span></router-link></li>
              <li><router-link to="/content/links" class="nav-link-child"><span class="nav-label">链接</span></router-link></li>
            </ul>
          </mb-dropmenu>
          <li><router-link to="/comment" class="nav-link"><mb-icon name="speaker"></mb-icon><span class="nav-label">评论</span></router-link></li>
          <li><router-link to="/user" class="nav-link"><mb-icon name="people"></mb-icon><span class="nav-label">用户</span></router-link></li>
          <li><router-link to="/theme" class="nav-link"><mb-icon name="palette"></mb-icon><span class="nav-label">主题</span></router-link></li>
           <mb-dropmenu>
            <router-link to="/setting" slot="toggle" class="nav-link"><mb-icon name="settings"></mb-icon><span class="nav-label">设置</span></router-link>
            <ul slot="body">
              <li><router-link to="/setting/1" class="nav-link-child" exact><span class="nav-label">页面</span></router-link></li>
              <li><router-link to="/setting/2" class="nav-link-child" exact><span class="nav-label">文章</span></router-link></li>
              <li><router-link to="/setting/3" class="nav-link-child" exact><span class="nav-label">链接</span></router-link></li>
            </ul>
          </mb-dropmenu>
        </ul>
      </nav>
    </aside>
    <main class="mb-body">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import MbDropmenu from '../ui/dropmenu'
import MbIcon from '../ui/icon'

export default {
  name : 'admin-main',
  components : {
    MbDropmenu,
    MbIcon
  },
  data () {
    return {
    }
  }
}
</script>

