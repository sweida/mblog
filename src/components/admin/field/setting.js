const today = new Date()

const year = today.getFullYear() === 2017 ? '2017' : `2017-${today.getFullYear()}`

export default {
  general: {
    title: '',
    description: '低调的使用mblog',
    lang: 'zh',
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
    pageLimit: 20,
    newCommentNoticle: true,
    replyNotice: true,
    review: true,
    showLink: true,
    enableBlacklist: true,
    blacklist: ''
  }
}
