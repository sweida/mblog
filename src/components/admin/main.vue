<template>
  <div class="mb-container">
    <header class="mb-head"></header>
    <aside class="mb-aside">
      <figure class="mb-logo">
        <img src="../../assets/logo-white.svg" alt="mblog" />
      </figure>
      <nav class="mb-nav">
        <ul>
          <router-link to="" tag="li"><a class="nav-link"><mb-icon name="home"></mb-icon><span class="nav-label">仪表盘</span></a></router-link>
          <mb-dropmenu>
            <a slot="toggle" class="nav-link"><mb-icon name="library_books"></mb-icon><span class="nav-label">内容</span></a>
            <ul slot="body">
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">页面</span></a></router-link>
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">文章</span></a></router-link>
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">链接</span></a></router-link>
            </ul>
          </mb-dropmenu>
          <router-link to="" tag="li"><a class="nav-link"><mb-icon name="speaker"></mb-icon><span class="nav-label">评论</span></a></router-link>
          <router-link to="" tag="li"><a class="nav-link"><mb-icon name="people"></mb-icon><span class="nav-label">用户</span></a></router-link>
          <router-link to="" tag="li"><a class="nav-link"><mb-icon name="palette"></mb-icon><span class="nav-label">主题</span></a></router-link>
           <mb-dropmenu>
            <a slot="toggle" class="nav-link"><mb-icon name="settings"></mb-icon><span class="nav-label">设置</span></a>
            <ul slot="body">
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">页面</span></a></router-link>
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">文章</span></a></router-link>
              <router-link to="" tag="li"><a class="nav-link-child"><span class="nav-label">链接</span></a></router-link>
            </ul>
          </mb-dropmenu>
        </ul>
      </nav>
    </aside>
    <main class="mb-body">
   
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

