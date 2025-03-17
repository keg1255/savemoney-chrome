import local from "./local";

const config = local["local.app"];
const baseURL = "https://savemoney.inu1255.cn/api";

export async function lookup({user_type, title}) {
	let ret = await fetch(baseURL + "/rebate/lookup", {
		method: "POST",
		body: JSON.stringify({user_type, title, uid: config.uid}),
	}).then((x) => x.json());
	if (ret.code) throw ret;
	return ret.data.list?.[0];
}

export async function coupon(item) {
	let ret = await fetch(baseURL + "/rebate/coupon", {
		method: "POST",
		body: JSON.stringify({...item, uid: config.uid}),
	}).then((x) => x.json());
	if (ret.code) throw ret;
	return ret.data;
}
