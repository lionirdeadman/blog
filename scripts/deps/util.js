function formDoctypeString (node) {
    return "<!DOCTYPE "
           + node.name
           + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
           + (!node.publicId && node.systemId ? ' SYSTEM' : '') 
           + (node.systemId ? ' "' + node.systemId + '"' : '')
           + '>';
  }

  function getCompleteDocumentHTML (document) {
    return `${formDoctypeString(document.doctype)}${document.documentElement.outerHTML}`;
  }

module.exports = {
    formDoctypeString,
    getCompleteDocumentHTML
}