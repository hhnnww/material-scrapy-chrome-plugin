export function freepik_parse_html() {
	const mas = document.querySelectorAll(".absolute figure.group a.relative");
	const mas_list = [] as { url: string; img: string }[];
	mas.forEach((el) => {
		const url = el.getAttribute("href");
		const img_el = el.querySelector("img");

		if (img_el) {
			const img = img_el.getAttribute("src");

			if (img && url) {
				mas_list.push({
					url: `${url}`,
					img: `${img}`,
				});
			}
		}
	});

	return { mas: mas_list, site_name: "freepik" };
}
