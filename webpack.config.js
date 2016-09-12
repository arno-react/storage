var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: './src/Storage',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'arno-storage.js',
        library: 'Arno',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.less','.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel'
        }]
    }
};
