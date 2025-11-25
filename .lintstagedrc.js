const path = require('path');

const buildEslintCommand = (filenames) =>
    `eslint --fix ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' ')}`;

module.exports = {
    'backend/**/*.{ts,js}': [
        'prettier --write',
        buildEslintCommand
    ],
    'frontend/**/*.{ts,js,html,css,scss}': [
        'prettier --write'
    ]
};
