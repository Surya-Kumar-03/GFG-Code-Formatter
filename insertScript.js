let source = document.createElement("script");

source.type = "module";
source.src = chrome.runtime.getURL("cppParser.js");
(document.head || document.documentElement).appendChild(source);

source = document.createElement("script");
source.type = "module";
source.src = chrome.runtime.getURL("contentScript.js");
(document.head || document.documentElement).appendChild(source);

source = document.createElement("script");
source.src = chrome.runtime.getURL("parser-java.js");
source.type = "module";
(document.head || document.documentElement).appendChild(source);