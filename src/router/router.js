import { createRouter, createWebHashHistory } from 'vue-router'
import AuthenticationState from './auth-guard'

const routes = [

    
    {
        path:'/',
        redirect:'/public'
    },
    
    {
        path: '/public',
        component: () => import("../layouts/PublicLayout.vue"),
        children: [
            {
                path: '/public',
                component: () => import("../modules/InitialPart/pages/Home.vue")
            },

            {
                path: 'register',
                component: () => import("../modules/InitialPart/pages/Register.vue")
            },
            {
                path: 'login',
                component: () => import("../modules/InitialPart/pages/Login.vue")
            },
            {
                path: 'contact',
                component: () => import("../modules/InitialPart/pages/Contact.vue")
            },
            
        ]
    },
    {
        path: '/private',
        component: () => import("../layouts/PrivateLayout.vue"),
        children: [
            {
                path: 'makeRoutines',
                beforeEnter:(to,from,next) =>{
                    AuthenticationState()
                        .then(authentication => {
                            if (!authentication) {
                                next('/public');
                            } else {
                                next();
                            }
                        });
                    },
                component: () => import("../modules/Mainpart/pages/MakeRoutines.vue")
            },
            {
                path: 'myRoutines',
                beforeEnter:(to,from,next) =>{
                    AuthenticationState()
                        .then(authentication => {
                            if (!authentication) {
                                next('/public');
                            } else {
                                next();
                            }
                        });
                    },
                component: () => import("../modules/Mainpart/pages/MyRoutines.vue")
            },
            {
                path: 'addRoutines/:id',
                beforeEnter:(to,from,next) =>{
                    AuthenticationState()
                        .then(authentication => {
                            if (!authentication) {
                                next('/public');
                            } else {
                                next();
                            }
                        });
                },
                component: () => import("../modules/Mainpart/pages/SingularRoutine.vue")
              
            },
        ]
    },

    {
         path: '/:pathMatch(.*)*', component: () => import("../modules/InitialPart/pages/NotFound.vue"),
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router