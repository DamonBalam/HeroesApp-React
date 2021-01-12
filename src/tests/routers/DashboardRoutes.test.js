import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en el DashboardRoutes', () => {
    test('Debe de mostrarse correctamente <DashBoardRoutes />', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name:'Arturo',
                logged: true
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Arturo');
    });
});
