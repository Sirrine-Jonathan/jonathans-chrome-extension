window.setupDebugHooks = (DOMPurifyInstance) => {
    const timing = ['before', 'after', 'upon'];
    const parts = ['Attributes', 'Elements', 'ShadowDOM'];
    for (const time of timing) {
        for (const part of parts) {
            const entryPoint = `${time}Sanitize${part}`;
            if (typeof DOMPurify.addHook === 'function') { // avoids error during SSR
                DOMPurifyInstance.addHook(entryPoint, (node, data, config) => {
                    console.log(`DOMPurify ${entryPoint}`, {
                        html: node.outerHTML,
                        node,
                        data,
                        config,
                    });
                });
            }
        }
    }
};