import {createRouter, createWebHashHistory} from "vue-router"
import Home from "../pages/home.vue";
import Info from "../pages/info.vue";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component:  Home,
        },
        {
            path: "/info",
            name: "info",
            component: Info,
        }
    ]
})
