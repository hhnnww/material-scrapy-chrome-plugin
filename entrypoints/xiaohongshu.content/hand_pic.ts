function transformImageUrl(originalUrl: string) {
	const urlObj = new URL(originalUrl);
	const pathParts = urlObj.pathname.split("/");
	const lastPart = pathParts[pathParts.length - 1];
	const imageId = lastPart.split("!")[0];
	const targetDomain = "http://sns-na-i4.xhscdn.com";
	const queryParams = "?imageView2/2/w/5000/h/5000/format/jpg/q/100&origin=0";
	return `${targetDomain}/${imageId}${queryParams}`;
}

function convertXhsUrlFast(url: string) {
	const keyword = "notes_pre_post/";
	if (!url.includes(keyword)) return null;
	const afterKeyword = url.split(keyword)[1];
	const imgId = afterKeyword.split("!")[0];
	return `https://sns-na-i2.xhscdn.com/notes_pre_post/${imgId}?imageView2/2/w/5000/h/5000/format/jpg/q/100`;
}

export const XHShandPic = () => {
	const pics_ele = document.querySelectorAll(".swiper-slide img");
	const img_list = [] as string[];
	pics_ele.forEach((item) => {
		const img_url = item.getAttribute("src");
		if (img_url) {
			const large_image = convertXhsUrlFast(img_url);
			if (large_image) {
				if (!img_list.includes(large_image)) {
					img_list.push(large_image);
				}
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
