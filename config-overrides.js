const ExtractTextPlugin = require('extract-text-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const path = require('path')
const spawn = require( 'child_process' ).spawnSync

module.exports = function override(config, env) {
  if (env === 'production') {

    // Configure output to use commit sha.
    //const sha = spawn('git', ['rev-parse', 'HEAD']).stdout.toString().trim()
    config.output = {
      filename: `main.[hash:8].js`,
      chunkFilename: '[id].chunk.js',
      path: path.join(__dirname, 'build'),
      publicPath: `${(process.env.CDN || '')}/`,
    }

    // config.plugins.push(new ExtractTextPlugin({ filename: `main.[hash:8].css` }))

    // config.module.rules.forEach((rule) => {
    //   if (rule.oneOf) {
    //     rule.oneOf.forEach((clause) => {
    //       if (clause.test && 'foo.css'.match(clause.test)) {
    //         clause.loader.forEach((loader) => {
    //           console.log({hello: loader})
    //         })
    //       }
    //     })
    //   }
    // })

    // Add S3 Upload
    // config.plugins.push(new S3Plugin({
    //   s3Options: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     region: process.env.AWS_REGION,
    //   },
    //   s3UploadOptions: {
    //     Bucket: process.env.S3_BUCKET,
    //   }
    // }))
    // console.log({config: config})
    // console.log({env: process.env})
    console.log({config: config})
  }

  return config
}
