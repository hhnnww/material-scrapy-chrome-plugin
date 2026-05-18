export async function handPic() {
	const piclist = document.querySelectorAll(".items .item");
	const image_obj_list: { num: number; name: string; img: string }[] = [];

	// 用 for...of 循环，可以随时 break 停止
	for (const pic of piclist) {
		const img_ele = pic.querySelector("img");
		const img_url = img_ele?.getAttribute("src")?.replace("_100x100", "");
		const name_ele = pic.querySelector(".name");
		const name = name_ele?.textContent?.trim(); // 加 trim() 去掉空格更稳

		if (name && img_url) {
			const number = parseInt(name.split("_")[1].split(".")[0], 10);

			// 等于 1 时 push 最后一个，然后直接停止循环
			if (number === 1) {
				image_obj_list.push({
					num: number,
					name: name,
					img: img_url,
				});
				break; // 👈 关键：停止遍历
			}

			// 大于 1 才 push
			if (number > 1) {
				image_obj_list.push({
					num: number,
					name: name,
					img: img_url,
				});
			}
		}
	}
	image_obj_list.sort((a, b) => a.num - b.num);
	console.log(image_obj_list);
	let text = `<div class="dm_module" data-id="11286177" data-title="会员免费" id="ids-module-11286177">
<p><a data-spm-anchor-id="a2126o.11854294.0.0" href="https://item.taobao.com/item.htm?id=669741402774" target="_blank"><img data-spm-anchor-id="a2126o.11854294.0.i4.39c14831lYQ9jY" src="https://img.alicdn.com/imgextra/i4/862322326/O1CN010fYimm1T3MGpxFKsf_!!862322326.png" /></a></p>
</div>`;

	image_obj_list.forEach((item) => {
		text += `<img src="${item.img}" alt="" />`;
	});

	text += `<div class="dm_module" data-id="11715980" data-title="查看更多" id="ids-module-11715980">
<p><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/862322326/O1CN0186snmc1T3MGobZ9lu_!!862322326.png" style="max-width:750px;" /></p>
</div>`;

	await navigator.clipboard.writeText(text);
	await browser.runtime.sendMessage({
		type: "copy_taobao_pic",
	});
	return text;
}
