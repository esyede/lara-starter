const mix = require("laravel-mix");
require("laravel-mix-bundle-analyzer");
var path = require("path");

if (mix.isWatching()) {
    mix.bundleAnalyzer();
}
mix.webpackConfig(webpack => {
    return {
        resolve: {
            alias: {
                // Alias for using source of BootstrapVue
                "bootstrap-vue$": "bootstrap-vue/src/index.js"
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // Exclude transpiling `node_modules`, except `bootstrap-vue/src`
                    exclude: /node_modules\/(?!bootstrap-vue\/src\/)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, "not_exist_path")],
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /id/)
        ],
        output: {
            chunkFilename: "js/compiled/[name].bundle.js?id=[chunkhash]",
            publicPath: "/"
        }
    };
});
mix.setPublicPath('./public');
mix.js('resources/js/member/member.js', 'js/compiled')
    .js('resources/js/admin/admin.js', 'js/compiled')
    .vue();
    // .sourceMaps();
