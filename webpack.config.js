const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Check Environment
const environment = process.env.NODE_ENV || 'production';

console.log(' ----- Build for environment: **** ' + environment + ' **** -----');

const babelReactLoader = 'babel?' + JSON.stringify({ presets: ['es2015'] });


// Webpack entry point scripts (those scripts explicitly included in the html):
// Relative to context path
const entry = {
    index: ['./src/index.js'],
    page: ['./src/page.js']
};

// Webpack output config
const output = {
    // An absolute path to the desired output directory.
    path: './dist/',

    // A filename pattern for the output files
    filename: '[name].js',

    library: 'SlackMessages',

    libraryTarget: 'umd'
};

// Module loaders
const moduleLoaders = {
    loaders: [
        // Compile React compoments from Babel
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [babelReactLoader]
        },

        // Extract css files
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },

        // extract less files
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }
    ]
};

// Webpack Plugins;
const plugins = [
    // Create a css file per each initial chunk
    new ExtractTextPlugin('[name].css')
];


const devServer = {
    contentBase: './dist',
    inline: true
};

// Put all the config together
module.exports  = {
    entry,
    output,
    module: moduleLoaders,
    plugins,
    devServer,
    devtool: 'source-map'
};

