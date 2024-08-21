import { createApp, isProxy, reactive } from "vue";
import App from "./App.vue";

import router from './router';
import resourceManager from "../../../doppio/libs/resourceManager";
import call from "../../../doppio/libs/controllers/call";
import socket from "../../../doppio/libs/controllers/socket";
import Auth from "../../../doppio/libs/controllers/auth";
import "./style.css"

const app = createApp(App);
const auth = reactive(new Auth());

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor';


// Plugins
app.use(router);
app.use(resourceManager);

app.use(VueMonacoEditorPlugin, {
	paths: {
		// The recommended CDN config
		vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
	},
})

// Global Properties,
// components can inject this
app.provide("$auth", auth);
app.provide("$call", call);
app.provide("$socket", socket);


// Configure route gaurds
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => !record.meta.isLoginPage)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.isLoggedIn) {
			next({ name: 'Login', query: { route: to.path } });
		} else {
			next();
		}
	} else {
		if (auth.isLoggedIn) {
			next({ name: 'Home' });
		} else {
			next();
		}
	}
});

app.mount("#app");
