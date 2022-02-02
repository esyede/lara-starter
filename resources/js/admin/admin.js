window.Vue = require('vue');

import './bootstrap';
import Vue from 'vue';
import App from './App.vue';
import Routes from './routes.js';

import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
import Pagination from 'vue-pagination-2';
import VueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueCurrencyFilter from 'vue-currency-filter';
import moment from 'moment';
import 'moment-timezone';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import Money from 'v-money';

Vue.directive('tooltip', VTooltip);
Vue.component('Loading', VueLoadingOverlay);
Vue.component('Pagination', Pagination);

Vue.use(Money, {
      decimal: ',',
      thousands: '.',
      prefix: 'Rp ',
      suffix: '',
      precision: 0,
      masked: false
});

Vue.use(Toaster, {
    timeout: 5000
});

Vue.use(VueCurrencyFilter, {
    symbol: 'Rp',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
});

Vue.filter('date_format', function(value, format) {
  if (value) {
    return moment.tz(String(value), 'UTC').tz(window.TIMEZONE?window.TIMEZONE:'Asia/Jakarta').format(format)
  }
});

Vue.filter('sprintf', function(num, add, zeroLength=null) {
    var s = num+"";
    if( zeroLength === undefined || zeroLength === null ) {
        return add + s;
    }
    while (s.length < zeroLength) s = add + s;
    return s;
});

Vue.filter('ucwords', function(text) {
    return text.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
});

Vue.filter('number_format', function(n, d=0, p='.', t='') {
    n = Number(n);
    if( isNaN(n) )
    {
        d = (isNaN(d = Math.abs(d)) ? 0 : d);
        return (0).toFixed(d);
    }
    else
    {
        var isFloat = ((n % 1) !== 0);

        if( isFloat && d == "*" ) {
            d = String(n).split(".")[1].length;
        }
        else if( Number(d) >= 0 ) {
            d = Number(d);
        }
        else {
            d = String(n).split(".");
            if( d.length > 1 ) {
                d = d[1].length;
            }
            else {
                d = 0;
            }
        }

        d = (isNaN(d = Math.abs(d)) ? 2 : d);
        p = (p === undefined ? "." : p);
        t = (t === undefined ? "" : t);
        var s = n < 0 ? "-" : "";
        var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(d)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
        var ret = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (d ? p + Math.abs(n - i).toFixed(d).slice(2) : "");
        return ret;
    }
});

Vue.filter('substr', function(v, start, length, sign='...') {
    if(!v) return '';
    v = v.toString();
    if( v.length > (length-start) ) {
        return v.substring(start, length) + sign;
    }
    return v.substring(start, length);
});

Vue.filter('auto_number_format', function(v, d=0, p='.', t='') {
    if(!v) return '';
    s = v.toString();
    s = s.replace('.', '');
    n = Number(s);
    return this.$options.filters.number_format(n, d, p, t);
});

const app = new Vue({
    el: '#app',
    router: Routes,
    render: h => h(App),
    data() {
        return {

        }
    }
});
