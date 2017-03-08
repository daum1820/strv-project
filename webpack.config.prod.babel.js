import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: 'index.html',
    inject: 'body',
});

const DefinePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.ROOT_URL': JSON.stringify('https://testproject-api.strv.com'),
});

const plugins = [
    HTMLWebpackPluginConfig,
    DefinePlugin,
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new FaviconsWebpackPlugin({ logo: './favicon.png', persistentCache: true }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/), // To load only en|pt-br in momentjs
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: true,
        minimize: false,
    }),
];

const loaders = [
    { test: /.jsx?$/, loader: 'babel-loader', include: [path.resolve('src')] },
    {
        test: /\.s?css$/,
        loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader',
        }),
    },
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.html$/, loader: 'html-loader', query: { minimize: true } },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
    { test: /\.(mp3)$/i, loader: 'file-loader' },
];

const config = {
    entry: './src/index.jsx',
    output: { path: `${__dirname}/dist`, filename: '[hash].js' },
    devtool: 'source-map',
    devServer: {
        clientLogLevel: 'info',
        historyApiFallback: true,
        inline: true,
    },
    resolve: {
        extensions: [
            '.jsx', '.js',
        ],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        alias: {
            'jquery-ui': 'jquery-ui/jquery-ui.js',
        },
    },
    module: {
        rules: loaders,
    },
    plugins,
};


export default config;