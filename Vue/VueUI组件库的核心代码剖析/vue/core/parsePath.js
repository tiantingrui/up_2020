/* 
 *   Parse simple path
 */

let bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));

function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    let segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {
                return
            }
            obj = obj[segments]
        }
        return obj
    }
}