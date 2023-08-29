var styleElement = document.createElement("style");
styleElement.textContent = `
.format-button {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: 700;
  color: #2f8d46;
  background-color: white;
  border-radius: 0.375rem; 
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms; 
  transition-duration: 500ms; 
  margin-right: 1.25rem; 
}

.format-button:hover {
  background-color: #E5E7EB; 
}
`;

document.head.appendChild(styleElement);

const formatCode = () => {
  var editorElements = document.getElementsByClassName("ace_editor");
  var editor = ace.edit(editorElements[0]);
  var code = editor.getValue();

  var formattedCode = js_beautify(code, {
    indent_size: 4,
    brace_style: "expand",
  });
  formattedCode = customFormatting(formattedCode);
  editor.setValue(formattedCode);
  editor.clearSelection();
};

setTimeout(() => {
  var button = document.createElement("button");
  button.textContent = "Format";
  button.className = "format-button";

  var sidebar = document.querySelector(".problems_menu_wrap_content__BwiWt");
  sidebar.appendChild(button);

  // Calls the formatCode() function
  button.addEventListener("click", formatCode);

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === "F") {
      event.preventDefault();

      formatCode();
    }
  });
}, 1000);

const customFormatting = function (formatted) {
  return formatted
    .replace(/\}\r\n/g, "}\n\n")
    .replace(/\<\s([a-zA-Z0-9_,: *&<>]+)\s>/g, "<$1>")
    .replace(/\<\s([a-zA-Z0-9_,: *&<>]+)>/g, "<$1>")
    .replace(/\<([a-zA-Z0-9_:*]+)\s>/g, "<$1>")
    .replace(/iterator\s</g, "iterator<")

    .replace(/ = {\s*([0-9 ,-.]+)\s+};/g, " = { $1 };")
    .replace(/\n\s*\n/g, "\n\n")
    .replace(/,\n\n/g, ",\n")
    .replace(/\r\n\t{}/g, " {}")
    .replace(/\{\r\n\n/g, "{\r\n")
    .replace(/\r\n\tconst & /g, " const &")
    .replace(/,\s+const /g, ", const ")
    .replace(/#\r\ndefine/g, "#define")
    .replace(/#\ndefine/g, "#define")
    .replace(/# define/g, "\r\n#define")
    .replace(/;#define/g, ";\r\n#define")
    .replace(/#define/g, "\n#define")
    .replace(/\n\s*\n#define/g, "\n#define")
    .replace(/;\r\n#define/g, ";\r\n\r\n#define")
    .replace(/;\n#define/g, ";\n\n#define")
    .replace(/\r\n#include/g, "#include")
    .replace(/\n#include/g, "#include")
    .replace(
      /([a-zA-Z0-9\t ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+)#include/g,
      "$1\r\n#include"
    )
    .replace(/vector </g, "vector<")
    .replace(/set </g, "set<")
    .replace(/map </g, "map<")
    .replace(/queue </g, "queue<")
    .replace(/stack </g, "stack<")
    .replace(/stack </g, "stack<")
    .replace(/deque </g, "deque<")
    .replace(/list </g, "list<")
    .replace(/array </g, "array<")
    .replace(/ - > /g, "->")
    .replace(/\(\s+{\s+/g, "({ ")
    .replace(/\s+\}\)/g, " })")
    .replace(/\tpublic_colon/g, "public:")
    .replace(/\tprivate_colon/g, "private:")
    .replace(/\tprotected_colon/g, "protected:")

    .replace(/^#define(.*)$/, "#define")

    .replace(/xxxx/g, "const")
    .replace(/\*(\s+)const/g, "*const")

    .replace(/operator (\W+) /g, "operator$1")
    .replace(/operator<= >/g, "operator<=>")
    .replace(/=(\s+)default/g, "= default")
    .replace(/; \}/g, ";\n}")
    .replace(/{\n\t\t\t/g, "{ ")
    .replace(/= { {/g, "= {\n\t\t{")
    .replace(/} };/g, "}\n\t};")

    .replace(/(\W+)\* /g, "$1*")
    .replace(/;\*/g, "; *")
    .replace(/(\w+) \*(\w+);/g, "$1 * $2;")
    .replace(/(\w+) \*(\w+)\)/g, "$1 * $2)")
    .replace(/(\w+) \*(\w+)\(/g, "$1 * $2(")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\</g, "$1 * $3 <")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\>/g, "$1 * $3 >")
    .replace(/(\w+)(\s*)\*(\w+)(\s*)\=/g, "$1 * $3 =")
    .replace(/(\d+)(\s*)\*(\d+)/g, "$1 * $3")

    .replace(/(\W) \* (\w)/g, "$1 *$2")
    .replace(/->\* /g, "->*")
    .replace(/ \[ &/g, " [&")
    .replace(/\r\n\r\nusing/g, "\r\nusing")
    .replace(/\n\nusing/g, "\nusing")
    .replace(/\s,\s/g, ", ")
    .replace(/> ::/g, ">::")

    .replace(/(\s+)&\s+/g, "$1&")
    .replace(/\s\[/g, "[")
    .replace(/\(\s/g, "(")
    .replace(/\s\)/g, ")")

    .replace(/int \* /g, "int *")
    .replace(/char \* /g, "char *")
    .replace(/double \* /g, "double *")
    .replace(/float \* /g, "float *")
    .replace(/bool \* /g, "bool *")
    .replace(/void \* /g, "void *")
    .replace(/wchar_t \* /g, "wchar_t *")

    .replace(/(\w+) \*\* /g, "$1 **")

    .replace(/\((\w+) \*\)/g, "($1*)")
    .replace(/(\w+) \*\>/g, "$1*>")

    .replace(/(\s)\<= /g, "$1 <= ")

    .replace(/\((\w+) &(\w+)\)/g, "($1 & $2)")
    .replace(/\[(\w+) &(\w+)\]/g, "[$1 & $2]")

    .replace(/\s<\s/g, "<")
    .replace(/\s<([^<])/g, "<$1")
    .replace(
      /([A-Za-z0-9_,\.\(\)\[\]\-\>]+)<([A-Za-z0-9_,\.\(\)\[\]\-\>]+)([\s\;\)])/g,
      "$1 < $2$3"
    )

    .replace(/<(\s+)const/g, "<const")

    .replace(/#include</g, "#include <")
    .replace(/#include < /g, "#include <")
    .replace(/(\w)\> /g, "$1 > ")
    .replace(/(\w)\>= /g, "$1 >= ")
    .replace(/\s+{}/g, " {}")
    .replace(/\s+{\s+}/g, " {}")

    .replace(/\s\<\s(\w+)\s\*,/g, "<$1*,")
    .replace(/\[ \*/g, "[*")

    .replace(/\<(\w+)\s\>/g, "<$1>")
    .replace(/, (\w+)\s\>/g, ", $1>")

    .replace(/\/\/TEMPLATE/g, "template <")
    .replace(/\[ = \]/g, "[=]")
    .replace(/\}\n\n}/g, "}\n}")
    .replace(/\}\n\n(\s*)\}/g, "}\n$1}")
    .replace(/\}\n\n(\s+)\}/g, "}\n$1}")

    .replace(/\}\n\n(\s+)else/g, "}\n$1else")

    .replace(/\n\}\)\;/g, "\n\t});")
    .replace(/\,\[/g, ", [")

    .replace(/\;\n\n(\s+)\}/g, ";\n$1}")

    .replace(/(\s+)\{([ \t]+)(\w+)/g, "$1{$1\t$3")
    .replace(/(\s+)\{([ \t]+)\/\//g, "$1{$1$2//")
    .replace(/=\s{(\s+)/g, "= { ")

    .replace(/\{\r\n\s+([0-9,-\s.]+)\r\n\s+\}/g, "{ $1 }")
    .replace(/\{\n\s+([0-9,-\s.]+)\n\s+\}/g, "{ $1 }")
    .replace(/\{ \{/g, "{\n\t\t{")
    .replace(/ \/\//g, "\t//")

    .replace(/(['"])(\s+)\}/g, "$1 }")
    .replace(/(\w+) \* (\w+) =/g, "$1 *$2 =")
    .replace(/(\w+) \* (\w+)\)/g, "$1 *$2)")
    .replace(/(\w+) \* (\w+)\(/g, "$1* $2(")

    .replace(/(\w+) \*\& (\w+)/g, "$1* &$2")

    .replace(/\s\<\s(\w+)\s\>/g, "<$1>")
    .replace(/\s\<\s(\w+)\,/g, "<$1,")
    .replace(/\{\}~/g, "{}\n\t~")
    .replace(/_cast </g, "_cast<")

    .replace(/\>\s+\{\s*([A-Za-z0-9 ,-.\"]+)\s+\}\;/g, "> { $1 };");
};
