import { heroes } from "../data/heroes";


export const getHeroById = ( id ) => {

    const hero = heroes.filter((hero) => hero.id === id);
    return hero[0];
    
};
