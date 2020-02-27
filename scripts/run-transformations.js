const Path = require('path');
const FS = require('fs');
const JSDom = require('jsdom');
const Glob = require('fast-glob');
const Util = require('./deps/util');

const sourceHTMLGlob = Path.resolve(__dirname, '../_site/**/*.html');
const htmlFiles = Glob.sync(sourceHTMLGlob).map(path => Path.resolve(__dirname, '../_site/', path));
const transformations = [];

for (const htmlFile of htmlFiles) {
    const content = FS.readFileSync(htmlFile, 'utf8');
    const { window } = new JSDom.JSDOM(content);
    const { document } = window;

    for (const transformation of transformations) {
        transformation(window);
    }

    FS.writeFileSync(htmlFile, Util.getCompleteDocumentHTML(document));
}

// /** @param window {Window} */
// function transformCodeBlocks ({ document }) {
//     const allCodeBlocks = document.querySelectorAll('.highlighter-rouge');
//     const supportedCodeBlocks = [...allCodeBlocks].filter(codeBlock => /language-[jt]s/.test(codeBlock.className));

//     for (const codeBlock of supportedCodeBlocks) {
//         const highlight = codeBlock.querySelector('.highlight');
//         const button = document.createElement('button');
//         button.className = 'codeblock-export';
//         button.innerText = 'Open in Monaco';

//         console.log('Codeblock', 'Append button.');
//         highlight.appendChild(button);
//     }
// }


