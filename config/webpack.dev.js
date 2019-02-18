// 一个常见的`webpack`配置文件
//console.log(__dirname)
const path=require("path");
const uglify = require('uglifyjs-webpack-plugin');
const  htmlPlugin=require("html-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const  extractTextPlugin=require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
const common = require('./common');

const CopyWebpackPlugin = require('copy-webpack-plugin');
var website ={
    publicPath:"http://localhost:8888/"
    // publicPath:"http://192.168.1.103:8888/"
}
//console.log(process.env);
// common.assetsPath();

module.exports = {
        mode:"development",
        entry:{
        "main1":"./src/main.js", ////入口文件的配置项已多次提及的唯一入口文件
        "main2":"./src/main1.js", ////入口文件的配置项已多次提及的唯一入口文件
        "b":"./src/b.js", ////入口文件的配置项已多次提及的唯一入口文件
        
         },
       //出口问件的配置项
         output: {
            //打包路径
            path: path.resolve(__dirname,'../dist'),
            //打包的文件名称
            filename: "[name]-[chunkhash].js",
            publicPath:website.publicPath 
        },
        //配置webpack开发服务功能
        devServer: {
            contentBase: path.resolve(__dirname,'../dist'), //本地服务器所加载的页面所在的目录
            host:"localhost",
            //服务器压缩是否开启
            compress:true,
            //配置服务端口号
            port:8888
        },
                  //模块:例如解读css,图片如何转换，压缩
        module: {
       rules:[

       //babel 配置
          {
               test:/\.(jsx|js)$/,
               use:{
                   loader:'babel-loader'
               },
                 //打包除这个文件之外的文件
                exclude: path.resolve(__dirname,"../node_modules"),
                //打包包括的文件
                include: path.resolve(__dirname, "../src"),
           },
          //css-loader
         {
                test: /\.css$/,
                 use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                    {loader:"css-loader"},
                    {loader:"postcss-loader",
                    }

                    ]
                  }),
            },
            {
                test: /\.less$/,
                 use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                    {loader:"css-loader"},
                    {loader:"less-loader"}

                    ]
                  }),
            },
       /*  {
                test: /\.css$/,
                 use: [{
                    loader:"style-loader"
                 },{
                    loader:"css-loader"
                 }
             ]
            },*/

         /*{
                test: /\.less$/,
                 use: [{
                    loader:"style-loader"
                 },{
                    loader:"css-loader"
                 },{
                    loader:"less-loader"
                 }


                 ]
             },*/

      //   {
      //     test: /\.(html)$/,
      //       use: {
      //         loader: 'html-loader',
      //         options: {
      //   //minimize: true,
      //   //removeComments: false,
      //   //collapseWhitespace: true
      // }
      //       }
      //    },




         //   {
         // test: /\.(htm|html)$/i,
         //  use:[ 'html-withimg-loader'] 
         //  },
             { test:/\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名称
              use:[
              { loader:'url-loader', //是指定使用的loader和loader的配置参数 
                options:{ 
                limit:200, //是把小于500B的文件打成Base64的格式，写入JS 
                outputPath:'images/',  //打包后的图片放到images文件夹下
                        } 
             }
                  ] 
          }

       ]
   


        },
                      //插件，用于生产模板和各项功能
       plugins: [
        new webpack.DefinePlugin({
  'PRODUCTION': JSON.stringify(true),
  'VERSION': JSON.stringify("5fa3b9"),
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
    }),
        //   new webpack.optimization.splitChunks({
        //     name: 'vendor',
        //     filename: '[name].js'
        // }),
            // new uglify(), // 
              new htmlPlugin({
              // minify:{ //是对html文件进行压缩
              //  removeAttributeQuotes:true, //removeAttrubuteQuotes是却掉属性的双引号。 
              //  }, 
               hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。 
               template:'./src/index.html' //是要打包的html模版路径和文件名称。 
           }),
               new extractTextPlugin({
                filename: 'css/[name].css'
               }),
               new PurifyCSSPlugin(
               { //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
                paths: glob.sync(path.resolve(__dirname,'../src/*.html')), 
              }),

                new CleanWebpackPlugin(
            ['dist'],　 //匹配删除的文件
            {
                root: path.resolve(__dirname,'..'),       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
            ),
                new webpack.HashedModuleIdsPlugin(),

                new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist'),
        ignore: ['.*']
      }
    ]),
 

                ]

};

