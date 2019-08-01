<script>
    import {getContext} from 'svelte';
    import {Go} from '@/components/Router';
    export let url;
    export let active = false;

    
    let cssClass;
    export {cssClass as class};

    const go = getContext(Go);
</script>

<a 
    href={url} 
    on:click|preventDefault={() => go(url)}
    class:is-active={active} 
    class={cssClass}
>
    <slot></slot>
</a>