module.exports = {
  // Ref: https://docs.svrx.io/en/plugin/contribution.html#schema
  configSchema: {
    user: {
      type: 'string',
      default: 'svrx',
      description: 'username for hello world'
    }
  },

  assets: {
    // script resources
    script: ['./client.js'],
    // css resources
    style: [],
  },

  hooks: {
    // Ref: https://docs.svrx.io/en/plugin/contribution.html#server
    async onCreate({ middleware, injector, events, router, config, logger, io }) {
      // TODO
      return () => {
        // fire onDestory
        logger.log(`Hello ${config.get('user')} from server`);
      };
    },
  },
};
