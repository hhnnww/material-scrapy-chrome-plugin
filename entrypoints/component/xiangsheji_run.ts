export function xiangsheji_parse_html() {
	const mas = document.querySelectorAll("li.item a");
	const mas_list = [] as { url: string; img: string }[];
	mas.forEach((el) => {
		const url_f = el.getAttribute("onclick");
		const url_match = url_f?.match(/window\.open\('(.*?)'\)/);
		const img_el = el.querySelector("img");
		if (img_el) {
			const img = img_el.getAttribute("src");

			if (img && url_match) {
				mas_list.push({
					url: `https://www.design006.com${url_match[1]}`,
					img: `${img}`,
				});
			}
		}
	});
	return { mas: mas_list, site_name: "享设计" };
}
