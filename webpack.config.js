var path = require('path'),
    webpack = require('webpack'),
    BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {

    entry: path.join(__dirname, 'src', 'js', 'app.js'),

    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'app.js'
    },

    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw!html-minify'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.styl$/, loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'}
        ],
        resolve: {
            extensions: ['', '.js', '.styl', '.css', '.html', 'json']
        }
    },

    plugins: [

        new BowerWebpackPlugin({
            modulesDirectories: ["bower_components"],
            manifestFiles:      "bower.json",
            includes:           /.*/,
            excludes:           [],
            searchResolveModulesDirectories: true
        }),

        new webpack.optimize.DedupePlugin(),

        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },

    devtool: 'source-map'
};
