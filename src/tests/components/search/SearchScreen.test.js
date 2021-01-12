const { mount } = require('enzyme');
const { MemoryRouter, Route } = require('react-router-dom');
const { SearchScreen } = require('../../../components/search/SearchScreen');

describe('Pruebas en el SearchScreen', () => {
    

    test('Debe de mostrarse correctamente <SearchScreen />', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();

        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a Hero');
    });


    test('should mostrar a batman y en input del query', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        
        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();

    });
    
});
