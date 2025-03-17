import Vue from "vue";
import App from "../view/content.vue";
import {waitLocals} from "@/common/utils";

Vue.config.productionTip = false;
console.log("xxxx");

/* eslint-disable no-new */
waitLocals().then(() => {
	let div = document.createElement("div");
	let vue = new Vue({
		render: (h) => h(App),
	}).$mount(div);
});
