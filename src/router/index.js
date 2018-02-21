import Vue from 'vue';
import Router from 'vue-router';
import VueAgile from 'vue-agile';
import axios from 'axios';

import Index from '@/views/Index';
import HomeContent from '@/views/HomeContent';
import PuertasBlindadas from '@/views/PuertasBlindadas';
import PuertasCortafuego from '@/views/PuertasCortafuego';
import SistemaAntiasalto from '@/views/SistemaAntiasalto';
import Presupuesto from '@/views/Presupuesto';
import ProveedoresHome from '@/views/ProveedoresHome';
import Presupuestador from '@/views/Presupuestador';

Vue.use(Router);
Vue.use(VueAgile);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Index,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: HomeContent,
                },
                {
                    path: 'puertas-blindadas?',
                    name: 'PuertasBlindadas',
                    component: PuertasBlindadas,
                },
                {
                    path: 'puertas-cortafuego',
                    name: 'PuertasCortafuego',
                    component: PuertasCortafuego,
                },
                {
                    path: 'sistema-antiasalto',
                    name: 'SistemaAntiasalto',
                    component: SistemaAntiasalto,
                },
                {
                    path: 'presupuesto',
                    name: 'Presupuesto',
                    component: Presupuesto,
                },
                {
                    path: 'presupuestador',
                    name: 'Presupuestador',
                    component: Presupuestador,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'proveedores-home',
                    name: 'ProveedoresHome',
                    component: ProveedoresHome,
                    meta: { requiresAuth: true },
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        axios
            .get('/api/user')
            .then(response => {
                console.log(response.status);
                next();
            })
            .catch(error => {
                next({
                    name: from.name,
                    query: { modal: true },
                });
            });
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;
