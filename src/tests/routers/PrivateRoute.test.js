import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Pruebas en el PrivateRoute', () => {

    const props = {
        location: {
            pathname:'/marvel'
        }
    }
    
    Storage.prototype.setItem = jest.fn();

    test('Debe de mostrar el componente si esta autenticado y guardar en localStorage', () => {
        
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute isAuthenticated={ true } component={ ()=> <span>Listo!</span> } {...props} />
            </MemoryRouter>
            );
        
        expect( wrapper.find('span').exists() ).toBe(true);

        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/marvel');

    });


    test('Debe de bloquear el componente si no esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={false} component={() => <span>Listo!</span>} {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

    });
    



    

});
