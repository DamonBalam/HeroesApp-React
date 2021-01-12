import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en el HeroScreen', () => {
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    };

    
    test('Debe de mostrar el componente redirect si no existen argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('Debe de mostrar un hero si el parametro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );


        expect( wrapper.find('.row').exists() ).toBe(true);
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de regresar a la pantalla anterior con push', () => {
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ () => <HeroScreen history={ historyMock } /> }  />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });
    
    
    test('Debe de regresar a la pantalla anterior con goBack', () => {
        const historyMock = {
            length: 10,
            goBack: jest.fn(),
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ () => <HeroScreen history={ historyMock } /> }  />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.goBack ).toHaveBeenCalledWith();
        expect( historyMock.push ).not.toHaveBeenCalled();

    });

    test('Debe de llamar al redirect si Hero no existe', () => {
       

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123123123']}>
                <Route path="/hero/:heroeId" component={ () => <HeroScreen history={ historyMock } /> }  />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');



    });
    
    
});
