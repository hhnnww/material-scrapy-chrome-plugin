function transformImageUrl(originalUrl: string) {
	const urlObj = new URL(originalUrl);
	const pathParts = urlObj.pathname.split("/");
	const lastPart = pathParts[pathParts.length - 1];
	const imageId = lastPart.split("!")[0];
	const targetDomain = "http://sns-na-i4.xhscdn.com";
	const queryParams = "?imageView2/2/w/5000/h/5000/format/jpg/q/100&origin=0";
	return `${targetDomain}/${imageId}${queryParams}`;
}

export const XHShandPic = () => {
	const pics_ele = document.querySelectorAll(".swiper-slide img");
	const img_list = [] as string[];
	pics_ele.forEach((item) => {
		const img_url = item.getAttribute("src");
		if (img_url) {
			const match = img_url.match(/notes_pre_post\/([^!?]+)/);
			const noteId = match ? match[1] : null;
			if (noteId) {
				const large_image_url = `https://sns-na-i2.xhscdn.com/notes_pre_post/${noteId}?imageView2/2/w/5000/h/5000/format/jpg/q/100`;
				if (!img_list.includes(large_image_url))
					img_list.push(`${large_image_url}`);
			} else {
				const large_img = transformImageUrl(img_url);
				if (!img_list.includes(large_img)) {
					img_list.push(large_img);
				}
			}
		}
	});

	browser.runtime.sendMessage({ type: "down_url", data: img_list });
};
