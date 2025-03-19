const manifest = {
	name: "返省",
	description:
		"返省,淘宝/京东返利,优惠查询。打开淘宝/京东商品页面左侧会显示返利信息，点击图标可以获取返利链接，通过链接下单获取返利。",
	author: "keg1255",
	homepage_url: "https://github.com/keg1255/savemoney-chrome",
	manifest_version: 3,
	icons: {
		16: "icons/16x16.png",
		48: "icons/48x48.png",
		96: "icons/96x96.png",
		128: "icons/128x128.png",
	},
	permissions: ["storage"],
	// host_permissions: ["*://item.taobao.com/*", "*://item.jd.com/*"],
	// optional_host_permissions: ["*://*/*"],
	action: {
		default_title: "返省",
		default_icon: "icons/48x48.png",
		default_popup: "popup.html",
	},
	background: {
		service_worker: "js/background.js",
		type: "module",
	},
	// devtools_page: 'devtools.html',
	// options_page: 'options.html',
	content_scripts: [
		{
			js: ["js/content.js"],
			run_at: "document_end",
			matches: ["*://item.taobao.com/*", "*://item.jd.com/*"],
			all_frames: false,
		},
	],
	// content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
	web_accessible_resources: [
		{
			matches: ["*://*/*"],
			resources: ["icons/*", "eval.js", "sdk.js"],
		},
	],
};

if (manifest.manifest_version == 2) {
	delete manifest.host_permissions;
	let permissions_v3 = new Set(["offscreen"]);
	manifest.permissions = manifest.permissions.filter((x) => !permissions_v3.has(x));
}

module.exports = manifest;
