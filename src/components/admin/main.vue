<template>
  <div class="mb-container" :class="{'nav-min' : minNav}">
    <mb-header v-model="minNav"></mb-header>
    <aside class="mb-aside">
      <figure class="mb-logo">
        <img src="../../assets/logo-white.svg" alt="mblog" />
      </figure>
      <mb-nav></mb-nav>
    </aside>
    <main class="mb-body">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import MbIcon from '../ui/icon'
import MbHeader from './common/header'
import MbNav from './common/nav'

export default {
  name: 'admin-main',
  components: {
    MbIcon,
    MbHeader,
    MbNav
  },
  data() {
    return {
      minNav: false
    }
  },
}
</script>

