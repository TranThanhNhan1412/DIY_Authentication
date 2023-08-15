import { createRouter, createWebHashHistory } from "vue-router";

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
            title: "Add user",
        },
        component: () => import("@/page/AddUserPage.vue")
    },
    {
        path: "/account/edit",
        name: "edit_user",
        meta: {
            title: "Edit user",
        },
        component: () => import("@/page/EditUserPage.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});


export default router