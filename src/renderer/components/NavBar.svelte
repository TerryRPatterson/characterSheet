<script>
    import {location} from '@/stores/location';
    import Link from '@/components/Link';

    export let pages;

    $: pageList = Object.entries(pages).map(([url, rest]) => {
        return {
            url,
            ...rest,
        };
    });
</script>


<nav class="navbar">
    <div class="navbar-brand">
        {#each pageList as {url, title}}
            <Link 
                {url}
                class="navbar-item is-tab"
                active={$location === url}
            >
                {title}
            </Link>
        {/each}
    </div>
</nav>