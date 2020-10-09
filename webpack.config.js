const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/public/'
    },
    target: 'node',
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    'style-loader!',
                    'css-loader' 
                ]
            },
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader'
                },
                 exclude: /node_modules/, 
                 
            }
        ]
    }
};