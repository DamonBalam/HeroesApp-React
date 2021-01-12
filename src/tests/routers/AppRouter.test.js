import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en el AppRouter', () => {
    const contextValue = {
        dispatch: jest.fn,
        user: {
            logged: false,
        },
    };
    test('Debe de mostrar el login si no esta autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe de mostrar el componente de marvel', () => {
        const contextValue = {
            dispatch: jest.fn,
            user: {
                logged: true,
                name:'Arturo'
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe(true);

    });
    
});
