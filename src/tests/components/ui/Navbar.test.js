import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { types } from '../../../components/types/types';
import { Navbar } from '../../../components/ui/NavBar';

describe('Pruebas en el NavBar', () => {
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Arturo',
            logged: true,
        },
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.text-info').text().trim()).toBe('Arturo');
    });

    test('Debe de llamar el logout y usar history', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout,
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    });
});
