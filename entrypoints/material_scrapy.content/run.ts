import { baotu_parse_html } from "./baotu_run";
import { qianku_parse_html } from "./qianku_run";
import { qiantu_parse_html } from "./qiantu_run";
import { shetu_parse_html } from "./shetu_run";
import { xiangsheji_parse_html } from "./xiangsheji_run";
import { xiaohongshu_parse_html } from "./xiaohongshu_run";

export async function run() {
	let res = null;
	if (window.location.href.includes("58pic.com")) {
		res = qiantu_parse_html();
	} else if (window.location.href.includes("ibaotu.com")) {
		res = baotu_parse_html();
	} else if (window.location.href.includes("699pic.com")) {
		res = shetu_parse_html();
	} else if (window.location.href.includes("588ku.com")) {
		res = qianku_parse_html();
	} else if (window.location.href.includes("design006.com")) {
		res = xiangsheji_parse_html();
	} else if (window.location.href.includes("xiaohongshu.com")) {
		res = xiaohongshu_parse_html();
	}

	console.log(JSON.stringify(res));

	await browser.runtime.sendMessage({
		type: "fetch",
		data: res,
	});
}
