<template>
	<div class="main_app">
		<ol>
			<li class="numbered">
				安装
				<a href="https://sj.qq.com/appdetail/cn.inu1255.hirebate" target="_blank">返省APP</a>
			</li>
			<li class="numbered">登录账号 - 我的 - 用户ID</li>
			<li class="numbered">
				<div class="input-wrapper">
					<span>输入用户ID</span>
					<input v-model="config.uid" type="number" autofocus />
				</div>
			</li>
			<li class="numbered">打开淘宝/京东商品页</li>
			<li class="numbered">右侧出现商品返利信息</li>
		</ol>
	</div>
</template>

<script>
import {config} from "@/common/share";
export default {
	name: "PopupView",
	data() {
		return {
			config,
		};
	},
	computed: {},
	mounted() {},
	methods: {},
};
</script>

<style lang="less">
.main_app {
	padding: 16px;
	padding-left: 0;
	min-width: 375px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ol {
	list-style-type: decimal;
}

li {
	margin-bottom: 10px;
	padding: 8px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

a {
	color: #007bff;
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

/* 美化输入框 */
input {
	width: 100%;
	padding: 10px 12px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 6px;
	box-sizing: border-box; /* 使padding不会影响宽度 */
	transition: all 0.3s ease; /* 平滑过渡效果 */
}

input:focus {
	border-color: #007bff; /* 聚焦时边框变蓝 */
	outline: none; /* 去除默认的聚焦外框 */
	box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 聚焦时添加蓝色阴影 */
}

input:hover {
	border-color: #007bff; /* 鼠标悬停时，边框颜色变蓝 */
}

/* 新增的样式：输入框和文字单行显示 */
.input-wrapper {
	display: flex;
	align-items: center;
}

.input-wrapper span {
	margin-right: 8px; /* 文字和输入框之间的间距 */
	font-size: 14px; /* 文字大小 */
	white-space: nowrap; /* 文字不换行 */
}
</style>
