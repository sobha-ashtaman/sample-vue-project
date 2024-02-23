import LoginView from '../views/Admin/LoginView.vue'
import DashboardView from '../views/Admin/DashboardView.vue'
const admin_routes = [
    {
        path: '',
        name: 'admin.login',
        component: LoginView,
    },
    {
        path: '/dashboard',
        name: 'admin.dashboard',
        component: DashboardView,
        meta: {
            guest: false
        }
      },
];

admin_routes.map(function(route){
    route.path = '/admin'+route.path
    return route;
});

export default admin_routes;