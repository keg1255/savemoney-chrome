/**
 * 判断当前页面是否是background进程
 */
export function isBackground() {
	return !self.document;
}
