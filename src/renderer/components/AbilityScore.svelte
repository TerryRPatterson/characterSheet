<script>
    import data from 'common/data.yaml';
    export let description;
    export let name;
    export let full_name;
    export let skills;
    const abilityScores = data['ability-scores'];
    console.log(typeof abilityScores);
</script>
{abilityScores}