export function xiaohongshu_parse_html() {
	const mas = document.querySelectorAll(".note-item a.cover");
	const mas_list = [] as { url: string; img: string }[];
	mas.forEach((el) => {
		const url = el.getAttribute("href");
		const img_el = el.querySelector("img");
		if (img_el) {
			const img = img_el.getAttribute("src");

			if (img && url) {
				mas_list.push({
					url: `https://www.xiaohongshu.com${url}`,
					img: `${img}`,
				});

				console.log(`https://www.xiaohongshu.com${url}`, img);
			}
		}
	});
	return { mas: mas_list, site_name: "小红书" };
}
