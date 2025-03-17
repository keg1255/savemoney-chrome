import Vue from "vue";
import App from "../view/popup.vue";
import "@/styles/common.less";
import {waitLocals} from "@/common/utils";

Vue.config.productionTip = false;

/* eslint-disable no-new */
waitLocals().then(() => {
	window.vue = new Vue({
		render: (h) => h(App),
	}).$mount("#app");
});
