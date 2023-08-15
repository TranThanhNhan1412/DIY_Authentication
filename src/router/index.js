import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore, useAlertStore } from '@/stores';


export const routes = [
    {
        path: "/",
        name: "home",
        meta: {
            title: "Home",
        },
        component: () => import("@/page/HomePage.vue")
    },
    {
        path: "/account/login",
        name: "login",
        meta: {
            title: "Login",
        },
        component: () => import("@/page/LoginPage.vue")
    },
    {
        path: "/account/register",
        name: "register",
        meta: {
            title: "Register",
        },
        component: () => import("@/page/RegisterPage.vue")
    },
    {
        path: "/account/user",
        name: "user",
        meta: {
            title: "User",
        },
        component: () => import("@/page/UserPage.vue")
    },
    {
        path: "/account/add",
        name: "add_user",
        meta: {
            title: "Add",
        },
        component: () => import("@/page/AddUserPage.vue")
    },
    {
        path: "/account/edit",
        name: "edit_user",
        meta: {
            title: "Edit",
        },
        component: () => import("@/page/EditUserPage.vue")
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]



export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
});

router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});


export default router