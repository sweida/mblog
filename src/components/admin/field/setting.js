const today = new Date()

const year = today.getFullYear() === 2017 ? '2017' : `2017-${today.getFullYear()}`

export default {
  general: {
    title: 'MBlog',
    subtitle: '使用mblog创建的站点',
    keyword: 'smohan, mblog',
    description: '低调的使用mblog',
    lang: 'zh',
    pageSize: 20,
    titleType: 3,
    icp: '',
    copyright: `Copyright © ${year} mblog. All Rights Reserved`,
  },
  upload: {
    storage: 'qiniu',
    qiniu: {
      domain: '',
      accessKey: '',
      secretKey: '',
      bucket: ''
    }
  },
  mail: {
    host: '',
    secure: true,
    port: 465,
    user: '',
    pass: '',
    mail: ''
  },
  comment: {
    enable: true,
    visitor: true,
    fieldsRequire: true,
    onlineAvatar: true,
    pagination: true,
    pageSize: 20,
    newCommentNotice: true,
    replyNotice: true,
    review: true,
    showLink: true,
    enableBlacklist: true,
    blacklist: ''
  }
}
