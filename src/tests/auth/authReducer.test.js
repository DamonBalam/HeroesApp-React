import { authReducer } from "../../auth/authReducer";
import { types } from "../../components/types/types";

describe('Prueba en el authReducer', () => {
    

    test('Debe de retornar el estado por defecto', () => {
        
        const state = authReducer( { logged: false}, {} );

        expect( state ).toEqual({ logged: false}); 


    });
    
    test('Debe de autenticar y colocar el name del usuario', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Arturo',
                logged: true
            }
        }

        const state = authReducer({ logged: false }, action);

        expect(state).toEqual(action.payload); 

    });
    

    test('Debe de eliminar el usuario y colocar en false el logged', () => {

        const action = {
            type: types.logout
        };
        
        const state = authReducer({ logged: true, name:'Pedro' }, action);

        expect(state).toEqual({ logged: false }); 

    })
    




});
