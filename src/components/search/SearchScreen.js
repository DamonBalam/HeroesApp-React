import React, { useMemo } from 'react';

import queryString from 'query-string'


import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {


    const location = useLocation();


    const { q = '' } = queryString.parse( location.search );

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });



    const { searchText } = formValues;

    

    const heroesFiltered = useMemo(() => getHeroesByName(q), [ q ] );

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`?q=${ searchText }`);


    }
    
    return (
        <div className='row'>
            <div className='col-5'>
                <h4>Search Screen</h4>
                <hr />

                <form onSubmit={handleSearch}>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Find your hero'
                        name='searchText'
                        value={searchText}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />

                    <button type='submit' className='btn btn-block btn-outline-info mt-1'>
                        Search...
                    </button>
                </form>
            </div>

            <div className='col-7'>
                <h4>Results</h4>
                <hr />

                {q === '' && <div className='alert alert-info animate__animated animate__fadeInRight'>Search a Hero</div>}

                {heroesFiltered.map((hero) => (
                    <HeroCard key={hero.id} hero={hero} />
                ))}
            </div>
        </div>
    );
};
