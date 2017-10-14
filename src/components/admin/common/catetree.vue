<template>
  <ul class="catetree-list">
    <template v-if="list.length">
      <li class="catetree-item" v-for="item in list" :key="item._id" :class="{'catetree-item-child' : item.isChild}">
      <label class="mo-checkbox">
        <input type="checkbox" :value="item._id" v-model="model">
        <span class="icon"></span>
        <span v-text="item.name"></span>
      </label>
    </li>
    </template>
    <li v-else>暂无类别，<router-link to="/content/cate/">添加类别</router-link></li>
  </ul>
</template>

<script>
import { arrayToTree } from '@/assets/utils/'
export default {
  name: 'mb-cate-tree',
  props: {
    value: Array
  },
  data() {
    return {
      model: this.value,
      list: []
    }
  },
  mounted() {
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
        }
      })
  },
  watch: {
    model(val) {
      this.$emit('input', val)
    }
  }
}
</script>


<style lang="scss">
.catetree-list {
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 1rem;
  .catetree-item {
    margin: .5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.catetree-item-child {
      margin-left: 1.75rem;
    }
  }
}
</style>
