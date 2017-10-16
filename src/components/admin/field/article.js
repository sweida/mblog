export default {
  field: {
    title: '',
    //别名
    alias: '',

    //摘录
    excerpt: '',

    //内容
    contents: '',

    //类别
    category: '',

    //标签
    tags: [],

    //封面缩略图
    thumbnail: '',

    //首页置顶
    top: false,

    //分类置顶
    categoryTop: false,

    //允许评论
    allowComment: true,

    //允许打赏
    allowReward: false,

    //版权信息
    license: false,

    //草稿

    draft: false,

    //是否加密
    encrypt: false,
    //密码
    password: '',

    //标记 , 如 new / hot ...
    mark: [],

  },
  marks: {
    original: '原创',
    hot: '热门',
    new: '最新',
    recommend: '推荐'
  }
}
