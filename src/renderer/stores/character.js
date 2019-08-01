import {writable, derived, readable} from 'svelte/store';


export default class Character {
    constructor({
        level,
        name,
        race,
        characterClass,
        alignment = 'unaligned',
    }) {

    }
}
