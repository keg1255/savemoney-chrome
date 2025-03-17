export function callBackground(type, data) {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage({type, data}, (x) => {
			console.log("xxxx", {type, data, x});
			if (x.err != null) reject(x.err);
			else resolve(x.data);
		});
	});
}
