export class Header {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = 'this is header'
        document.body.appendChild(elem)
    }
}

export class Content {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = 'this is Content'
        document.body.appendChild(elem)
    }
}

export class Footer {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = 'this is Footer'
        document.body.appendChild(elem)
    }
}