import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
    - create an ordered group of docs
    - render a sidebar for each doc of that group
    - provide next/previous navigation

    The sidebars can be generated from the filesystem, or explicitly defined here.

    Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    docsSidebar: [
        'intro',
        {
            type: 'category',
            label: 'FortiGate',
            link: {
                type: 'doc',
                id: 'fortigate/overview',
            },
            items: ['fortigate/change-mac-address', 'fortigate/ipv6', 'fortigate/factory-reset'],
        },
    ],
};

export default sidebars;
