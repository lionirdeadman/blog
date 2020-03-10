const Path = require('path');
const FS = require('fs');
const JSDom = require('jsdom');
const Util = require('./deps/util');

const searchDocumentPath = Path.resolve(__dirname, '../_site/search.html');
const searchJSONPath = Path.resolve(__dirname, '../_site/search.json');
const searchJSONContent = FS.readFileSync(searchJSONPath, 'utf8');
let nextId = 0;

const content = FS.readFileSync(searchDocumentPath, 'utf8');
const { window } = new JSDom.JSDOM(content);
const { document } = window;

const target = document.querySelector('[data-inline-search-data]');

if (target) {
    console.log('Inline search data');
    target.removeAttribute('data-inline-search-data');
    const searchResults = JSON.parse(searchJSONContent);

    for (const result of searchResults) {
        result.id = nextId++;
    }

    target.innerHTML = `var results = ${JSON.stringify(searchResults)}`;
    FS.writeFileSync(searchDocumentPath, Util.getCompleteDocumentHTML(document));
}