import { baotu_parse_html } from "./baotu_run";
import { qianku_parse_html } from "./qianku_run";
import { qiantu_parse_html } from "./qiantu_run";
import { shetu_parse_html } from "./shetu_run";

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
	}

	await browser.runtime.sendMessage({
		type: "fetch",
		data: res,
	});
}
