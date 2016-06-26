/**
 * Created by vinxent on 2016/6/25.
 */

var MyComponent1 = Vue.extend({
    template: `<div>{{ topic }}</div>`,
    data: function() {
        return {
            topic: '我是傻逼'
        }
    }
});

var MyComponent2 = Vue.extend({
    template: `<div>哦</div>`
});

var App = Vue.extend({
});

// 注册
Vue.component('app-header', MyComponent1);

//var vm = new Vue({
//    el: '#app'
//});

var router = new VueRouter();
router.map({
    '/foo': {
        component: MyComponent1
    },
    '/bar': {
        component: MyComponent2
    }
});

router.start(App, '#app');