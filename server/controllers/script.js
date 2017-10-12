const {
  exec
} = require('child_process')


/**
 * 1 生成模板
 * 2 编译
 */
exports.run = async(req, res) => {
  exec('npm run build', function (err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
  })
}
