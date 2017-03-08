import webpack, { ProvidePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import HappyPack from 'happypack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.ROOT_URL': JSON.stringify('https://testproject-api.strv.com'),
});

const ExtractTextPluginConfig = new ExtractTextPlugin({ 
    filename: 'bundle.css', allChunks: true 
});

const HappyPackPluginConfig = new HappyPack({
    loaders: [
        {
            loader: 'babel-loader',
            query: { cacheDirectory: true },
        },
    ],
});

const WebpackProvidePluginConfig = new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});

const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({ 
    logo: './favicon.png', persistentCache: true
 });

const plugins = [
    HTMLWebpackPluginConfig,
    DefinePluginConfig,
    ExtractTextPluginConfig,
    HappyPackPluginConfig,
    WebpackProvidePluginConfig,
    FaviconsWebpackPluginConfig
];

const loaders = [
    {
        test: /.jsx?$/,
        loaders: [
            { loader: 'happypack/loader' },
        ],
        include: [path.resolve('src')],
        exclude: [/node_modules/],
    },
    {
        test: /\.s?css$/,
        loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader',
        }),
    },
    { test: /\.html$/, loader: 'html-loader' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
    { test: /\.(mp3)$/i, loader: 'file-loader' },
];

const webpackConfig = {
    entry: './src/index.jsx',
    output: { path: `${__dirname}`, filename: '[name].js' },
    cache: true,
    devtool: 'inline-eval-cheap-source-map',
    devServer: {
        clientLogLevel: 'info',
        historyApiFallback: true,
        inline: true,
    },
    watch: true,
    resolve: {
        extensions: ['.jsx', '.js',],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        alias: {'jquery-ui': 'jquery-ui/jquery-ui.js'},
    },
    module: {
        rules: loaders,
    },
    plugins,
};

export default webpackConfig;