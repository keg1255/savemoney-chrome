<template>
	<div class="savemoney-content" @click="copy">
		<div class="icon" :style="{backgroundImage: `url(${icon})`}"></div>
		<div v-for="(log, i) in logs" :key="i" class="logs">{{ log }}</div>
	</div>
</template>
<script>
import {config} from "@/common/share";
import {callBackground} from "@/common/client";
import {copy, debounce} from "@/common/utils";
export default {
	name: "Content",
	components: {},
	props: {
		name: String,
	},
	data() {
		return {
			open: false,
			icon: chrome.runtime.getURL("icons/icon.png"),
			logs: [],
			item: null,
		};
	},
	computed: {},
	mounted() {
		console.log("xxxx", config);
		let user_type = -1;
		let title = location.href;
		if (
			location.host.indexOf("item.taobao.com") >= 0 ||
			location.host.indexOf("detail.tmall.com") >= 0
		) {
			user_type = 1;
			title = title.replace("detail.tmall.com", "item.taobao.com");
		} else if (location.host.indexOf("item.jd.com") >= 0) {
			user_type = 2;
		}
		if (user_type == -1) return;
		const el = this.$el;
		document.body.appendChild(el);
		console.log("xxxx", chrome.runtime.getURL("icons/icon.png"));
		this.log("查询中...");
		callBackground("lookup", {user_type, title})
			.then((data) => {
				if (!data) return this.log(`没有返利`);
				this.item = data;
				if (data.coupon_amount) this.log(`减${data.coupon_amount}元`);
				let rate = (data.commission_rate * 0.9 * 0.6) / 100;
				let amount = ((rate * (data.zk_final_price - (data.coupon_amount || 0))) / 100).toFixed(2);
				if (+amount > 0.009) this.log(`返${amount}元`);
				else this.log(`返${rate.toFixed(2)}%`);
			})
			.catch((err) => {
				console.error("xxxx", err);
				this.log(err);
			});
	},
	methods: {
		log(msg) {
			this.logs.push(msg);
		},
		copy: debounce(function () {
			if (!this.item) return;
			this.log("获取返利");
			callBackground("coupon", {...this.item, pastable: 2})
				.then((data) => {
					copy(config.short ? data.url : data.click_url) && this.log("链接已复制");
				})
				.catch((err) => {
					console.error("xxxx", err);
					this.log(err);
				});
		}),
	},
};
</script>
<style lang="less">
.savemoney-content {
	width: 80px;
	position: fixed;
	left: 20px;
	top: 50px;
	z-index: 9999999;
	font-weight: bold;
	> .icon {
		width: 40px;
		height: 40px;
		background-size: cover;
		background-position: center;
		cursor: pointer;
	}
	.logs {
		color: #000;
		background-color: rgba(255, 255, 255, 0.85);
	}
}
</style>
