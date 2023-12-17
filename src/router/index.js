import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: import("../layout/layout.vue"),
            children:[
                {
                    path:'home',
                    name:'Home',
                    component:import("../views/Home.vue")
                },
                {
                    path:'im',
                    name:'Im',
                    component:import("../views/Im.vue")
                },
                {
                    path:'ai',
                    name:'Ai',
                    component:import("../views/Ai.vue")
                },
                {
                    path:'personCenter',
                    name:'personCenter',
                    component:import("../views/PersonCenter.vue")
                },
                {
                    path:'clockIn',
                    name:'ChockIn',
                    component:import("../views/ChockIn.vue")
                },
                {
                    path:'introduction',
                    name:'Introduction',
                    component:import("../views/Introduction.vue")
                },
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: import("../views/login.vue")
        },
        {
            path: '/register',
            name: 'Register',
            component: import("../views/register.vue")
        },
        {
            path: '/:pathMatch(.*)',
            name: '404',
            component: import("../views/404.vue")
        },



    ]
})
// 路由守卫
// 每次刷新的时候重新设置路由

router.beforeEach((to, from, next) => {
// 获取缓存的数据
    const store = useUserStore()
    const user = store.user
    const haveUser = user && user.id
    const noPermissionPahths = ['/login', '/register']
    if (!haveUser && !noPermissionPahths.includes(to.path)) {//用户没有登录
        next('/login')
    } else {
        next()
    }
})


export default router
