import Page1 from './Page1.svelte';
import Page2 from './Page2.svelte';
export const Pages = {
    '/': {
        component: Page1,
        title: 'Page1',
    },
    '/Page2': {
        component: Page2,
        title: 'Page2',
    },
};
