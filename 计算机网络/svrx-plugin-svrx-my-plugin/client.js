/* globals svrx */

// Ref: https://docs.svrx.io/en/plugin/contribution.html#client
const { io, events, config } = svrx;

// TODO
config.get('user').then(user => {
    console.log(`Hello ${user} from browser`)
})