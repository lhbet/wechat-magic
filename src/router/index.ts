import {createRouter, createWebHashHistory} from "vue-router"
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../pages/home.vue"),
        },
        {
            path: "/info",
            name: "info",
            component: () => import("../pages/info.vue"),
        }
    ]
})
