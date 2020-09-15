// 1. import vConsole
const VConsole = require('path/to/vconsole.min.js')
const vConsole = new VConsole()


// 2. Create plugin object  
const myPlugin = vConsole.VConsolePlugin('my_plugin', 'My Plugin')

// 3. Bind plugin events
myPlugin.on('init', () => {
    console.log('My Plugin init')
})

myPlugin.on('renderTab', (callback) => {
    const html = `<div>Hello VConsole!</div>`
    callback(html)
})

myPlugin.on('addTool', (callback) => {
    let button = {
        name: 'Reload',
        onCLick: function(event) {
            location.reload()
        }
    }
    callback([button])
})

// 4. Add to vConsole
vConsole.addPlugin(myPlugin)






