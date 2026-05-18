export function qiantu_parse_html() {
	const mas = document.querySelectorAll("div.qtd-card a");
	const mas_list = [] as { url: string; img: string }[];
	mas.forEach((el) => {
		const url = el.getAttribute("href");
		const img_el = el.querySelector("img");
		if (img_el) {
			const img = img_el.getAttribute("data-original");
			if (img && url) {
				mas_list.push({
					url: `https:${url}`,
					img: `https:${img}`,
				});
			}
		}
	});
	return { mas: mas_list, site_name: "千图" };
}
