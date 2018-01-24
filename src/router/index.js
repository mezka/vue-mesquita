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

Vue.use(Router);
Vue.use(VueAgile);

export default new Router({
    routes: [
        {
            path: '/',
            component: Index,
            props: { loginModal: false },
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: HomeContent,
                },
                {
                    path: 'puertas-blindadas',
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
                    path: 'proveedores-home',
                    name: 'ProveedoresHome',
                    component: ProveedoresHome,
                    beforeEnter: (to, from, next) => {
                        axios
                            .get('/api/user')
                            .then(response => {
                                console.log(response.status);
                                next();
                            })
                            .catch(error => {
                                router.push({
                                    name: from.name,
                                    params: { loginModal: true },
                                });
                            });
                    },
                },
            ],
        },
    ],
});
