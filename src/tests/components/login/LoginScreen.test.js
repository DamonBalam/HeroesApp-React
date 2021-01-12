import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../components/types/types';

describe('Pruebas en el LoginScreen', () => {

    const historyMock = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }


    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
                <LoginScreen history={ historyMock } />
        </AuthContext.Provider>
    );

    test('should mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe realizar el dispatch y la navegacion', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type:types.login,
            payload: {
                name:'Arturo'
            }
        });
        expect( historyMock.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');

        handleClick();

        expect( historyMock.replace ).toHaveBeenCalledWith('/dc');

    });
});
