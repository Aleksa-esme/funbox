module.exports = {
    mode: 'development',
    entry: [
        './public/js/main.js', 
        './public/components/cards.js', 
    ],
    output: {
        filename: "./build.js"
    },
}