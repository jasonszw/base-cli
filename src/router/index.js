import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./../views/Home"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.NODE_ENV === 'production' ? '/activity/three2021/' : '',
	routes
})

export default router
