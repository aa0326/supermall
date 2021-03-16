import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import ('views/home/Home');

const Cart = () => import ('views/cart/Cart');

const Category = () =>  import ('views/category/Category');

const Profile = () =>  import ('views/profile/Profile');

const Detail = () =>  import ('views/detail/Detail');

const routes = [{
        path: "",
        redirect: '/Home',
    },
    {
        path: "/Home",
        component: Home
    },
    {
        path: "/Cart",
        component: Cart
    },
    {
        path: "/Category",
        component: Category
    },
    {
        path: "/Profile",
        component: Profile
    },
    {
        path:'/Detail',
        component:Detail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router