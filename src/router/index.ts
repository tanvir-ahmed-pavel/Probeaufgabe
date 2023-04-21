import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "overview",
            component: () => import("../views/ProductOverview.vue"),
        },
        {
            path: "/details/:id",
            name: "details",
            component: () => import("../views/ProductDetails.vue"),
        },

    ],
});
export default router;