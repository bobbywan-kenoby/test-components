let mountApp;

const app = Vue.createApp({
	data() {
		return {
			canvasSize: 200,
		};
	},
	methods: {},
	computed: {}
});

window.addEventListener('load', event => {
	mountApp = app.mount("#app");
});