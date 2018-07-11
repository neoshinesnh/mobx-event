var view = require('./index.marko'); 
var result = view.renderSync();
 
result.appendTo(document.body);