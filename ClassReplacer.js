(function() {
    var classReplacements = [];

    ClassReplacer = function() {};

    ClassReplacer.prototype = {
        loadClassMap: function(classMap) {
            classReplacements = [];
            
            for (className in classMap) {
                classReplacements.push([
                    new RegExp('(^|\\s)' + className + '(\\s|$)'),
                    '$1' + classMap[className] + '$2'
                ]);
            }
        },

        replaceClasses: function(rootElement) {
            rootElement = rootElement || document.body;

            if (rootElement.nodeType == document.ELEMENT_NODE) {
                if (rootElement.className) {
                    for (var i = 0; i < classReplacements.length; i++) { 
                        rootElement.className = ''.replace.apply(rootElement.className, classReplacements[i]);
                    }
                }

                for (var i = 0; i < rootElement.childNodes.length; i++) {
                    this.replaceClasses(rootElement.childNodes[i]);
                }
            }
        }
    };

    window.ClassReplacer = new ClassReplacer();
})();
