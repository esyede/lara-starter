import Vue from 'vue';
import VueRouter from 'vue-router';
import Loading from 'vue-loading-overlay';

Vue.use(Loading);
Vue.use(VueRouter);

const page = path => () => import('./views/' + path + '.vue').then(m => m.default || m)

const router = new VueRouter({
    mode: 'history',
    base: '/member',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: page('Index'),
            meta: {
                title: 'Dashboard'
            }
        },
        {
            path: '/devices',
            name: 'devices.index',
            component: page('devices/Index'),
            meta: {
                title: 'Devices'
            }
        }
    ]
});

let loader = null;
function hideLoader() {
    if(loader) {
        loader.hide();
        loader = null;
    }
}

function showLoader() {
    hideLoader();
    loader = Vue.$loading.show();
}

router.beforeEach((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name && !['error-404', 'error-500', 'error-503'].includes(to.name)) {
        showLoader();
    }
    next();
});

router.afterEach((to, from) => {
    // Complete the animation of the loader
    hideLoader();
});

export default router;
