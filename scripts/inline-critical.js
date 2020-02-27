const Path = require('path');
const FS = require('fs');
const JSDom = require('jsdom');
const Glob = require('fast-glob');
const Util = require('./deps/util');

const cssPath = Path.resolve(__dirname, `../_site/assets/main.css`);
const css = FS.readFileSync(cssPath, 'utf8');
const sourceHTMLGlob = Path.resolve(__dirname, '../_site/**/*.html');
const htmlFiles = Glob.sync(sourceHTMLGlob).map(path => Path.resolve(__dirname, '../_site/', path));

for (const htmlFile of htmlFiles) {
    const content = FS.readFileSync(htmlFile, 'utf8');
    const { window } = new JSDom.JSDOM(content);
    const { document } = window;
    const criticalStyleElement = document.querySelector('style[data-transform-critical]');

    if (criticalStyleElement) {
        criticalStyleElement.innerHTML = css;
        console.log('Transformed critical styles', { htmlFile, cssPath });
        criticalStyleElement.removeAttribute('data-transform-critical');
    } else {
        console.log('Not modifying critical styles', { htmlFile });
    }

    FS.writeFileSync(htmlFile, Util.getCompleteDocumentHTML(document));
}
