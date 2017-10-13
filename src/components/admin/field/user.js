export default {
  fields: {
    nick: '',
    email: '',
    password: '',
    password2: '',
    avatar: '',
    sex: 1,
    role: 1,
    jurisdiction: []
  },
  jurisdiction: {
    dashboard: {
      name: '仪表盘',
      data: {
        view: '查看'
      }
    },
    article: {
      name: '文章',
      data: {
        add: '新增',
        remove: '删除',
        update: '编辑',
        view: '查看',
      }
    }
  }
}
