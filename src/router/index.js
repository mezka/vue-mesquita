import Vue from 'vue';
import Router from 'vue-router';
import VueAgile from 'vue-agile';

import Home from '@/views/Home';
import PuertasBlindadas from '@/views/PuertasBlindadas';
import PuertasCortafuego from '@/views/PuertasCortafuego';
import SistemaAntiasalto from '@/views/SistemaAntiasalto';
import Presupuesto from '@/views/Presupuesto';


Vue.use(Router);
Vue.use(VueAgile);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/puertas-blindadas',
            name: 'PuertasBlindadas',
            component: PuertasBlindadas,
        },
        {
            path: '/puertas-cortafuego',
            name: 'PuertasCortafuego',
            component: PuertasCortafuego,
        },
        {
            path: '/sistema-antiasalto',
            name: 'SistemaAntiasalto',
            component: SistemaAntiasalto,
        },
        {
            path: '/presupuesto',
            name: 'Presupuesto',
            component: Presupuesto,
        },
    ],
});
