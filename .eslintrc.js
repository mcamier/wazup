module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
    },
    plugins: ['react-hooks', 'react'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
        }
    },
    rules: {
        // project customizations here
    }
};