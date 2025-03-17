import {coupon, lookup} from "@/common/api";
import local from "@/common/local";

const ready = (function () {
	let all = [];
	for (let key in local) {
		let def = local[key];
		let storage;
		if (key.startsWith("sync.")) {
			storage = chrome.storage.sync;
		} else if (!key.startsWith("share.")) {
			storage = chrome.storage.local;
		}
		if (storage) {
			all.push(
				storage.get(key).then((data) => {
					let val = data[key];
					if (!val) return;
					for (let k in def) {
						if (k in val) def[k] = val[k];
					}
				})
			);
		}
	}
	return Promise.all(all);
})();

export const whenReady = ready.then(() => {
	console.log(local);
	chrome.runtime.onMessage.addListener(onMessage);
	function setLocal(data) {
		onMessage({type: "local-write", key: "local.app", data, version: Date.now()}, null, () => {});
	}

	function onMessage(evt, sender, sendResponse) {
		if (evt.type != "status") console.log("onmsg", evt);
		if (["local-read", "sync-read", "share-read"].indexOf(evt.type) >= 0) {
			sendResponse(local[evt.key]);
			return;
		}
		if (["local-write", "sync-write", "share-write"].indexOf(evt.type) >= 0) {
			const def = local[evt.key];
			for (let k in def) {
				let v = evt.data[k];
				if (v != null) def[k] = v;
			}
			sendResponse(0);
			chrome.runtime.sendMessage({
				type: evt.type.slice(0, -5) + "change",
				key: evt.key,
				version: evt.version,
			});
			if (evt.type == "local-write") {
				chrome.storage.local.set({[evt.key]: def});
				return;
			}
			if (evt.type == "sync-write") {
				chrome.storage.sync.set({[evt.key]: def});
			}
		}
		if (evt.type == "lookup") {
			lookup(evt.data)
				.then((data) => {
					sendResponse({data});
				})
				.catch((err) => {
					sendResponse({err});
				});
			return true;
		}
		if (evt.type == "coupon") {
			coupon(evt.data)
				.then((data) => {
					sendResponse({data});
				})
				.catch((err) => {
					sendResponse({err});
				});
			return true;
		}
	}
	return {setLocal};
});

export function setLocal(data) {
	return whenReady.then((x) => x.setLocal(data));
}

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
	if (!message) return;
	console.log("onMessageExternal", message);
	if (message.path == "chrome.setLocal") {
		return setLocal(message.args[0]);
	}
});
