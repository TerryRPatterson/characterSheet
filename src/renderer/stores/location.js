import {readable} from 'svelte/store';



export const location = readable(window.location.pathname, (set) => {
    function navigateListener({detail: {url}}) {
        set(url);
    }
    window.addEventListener('navigate', navigateListener);
    return () => window.removeEventListener('navigate', navigateListener);
});
