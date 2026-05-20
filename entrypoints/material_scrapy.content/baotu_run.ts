export function baotu_parse_html() {
	const mas = document.querySelectorAll("dl.pic-box>dt>a, li.pic-box>a.jump-details");
	const mas_list = [] as { url: string; img: string }[];
	mas.forEach((el) => {
		const url = el.getAttribute("href");
		const img_el = el.querySelector("img");
		if (img_el) {
			const img = img_el.getAttribute("data-url") || img_el.getAttribute('src');

			if (img && url) {
				mas_list.push({
					url: `https:${url}`,
					img: `https:${img}`,
				});
			}
		}
	});
	return { mas: mas_list, site_name: "包图" };
}
