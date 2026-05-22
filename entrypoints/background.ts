import { EnvatodownloadImages } from "./envato.imagedown.content";
import { downloadImages } from "./xiaohongshu.content/download";

export default defineBackground(() => {
	browser.runtime.onMessage.addListener(async (message) => {
		if (message.type === "fetch") {
			const res = await fetch(
				"https://www.yumiwudesign.com/api/OrpcScrapyMaterialRoute/wxt_add",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer default-token",
					},
					body: JSON.stringify(message.data),
				},
			);
			await browser.notifications.create({
				title: "采集成功",
				message: "已经成功采集到后台",
				iconUrl: browser.runtime.getURL("/icon/128.png"),
				type: "basic",
			});
			return res;
		} else if (message.type === "copy_taobao_pic") {
			await browser.notifications.create({
				title: "复制成功",
				message: "已复制到剪贴板",
				iconUrl: browser.runtime.getURL("/icon/128.png"),
				type: "basic",
			});
		} else if (message.type === "down_url") {
			downloadImages(message);
		} else if (message.type === "envato_down_url") {
			EnvatodownloadImages(message);
		}
	});
});
