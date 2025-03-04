const path = require('path');
module.exports = {
mode: 'development',
entry: {
    index: './src/index.js',
    auth: './src/auth.js',
    config: './src/config.js',
    citymanager: './src/bookmanager.js'
},
output: {
path: path.resolve(__dirname, 'dist'),
filename: '[name].bundle.js'
},
watch: true
}