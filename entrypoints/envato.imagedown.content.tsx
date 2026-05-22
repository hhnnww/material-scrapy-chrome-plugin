import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createRoot } from "react-dom/client";

export default defineContentScript({
	runAt: "document_end",
	matches: ["https://app.envato.com/*"],
	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			position: "overlay",
			anchor: "body",
			onMount(container) {
				const rootElement = document.createElement("div");
				container.append(rootElement);

				const root = createRoot(rootElement);
				root.render(<EnvatoButton />);
				return root;
			},
		});

		ui.mount();
	},
});

const EnvatoButton = () => {
	return (
		<Box sx={{ position: "fixed", right: 20, bottom: 60, zIndex: 9999 }}>
			<Button
				variant="contained"
				size="small"
				onClick={() => {
					EnavtoHanldImages();
				}}
			>
				下载ENVATO图片
			</Button>
		</Box>
	);
};

const EnavtoHanldImages = () => {
	const downloadBtn = document.querySelector(
		'button[data-cy="idp-download-button"]',
	) as HTMLButtonElement;

	if (downloadBtn) {
		downloadBtn.click();
	}

	const image_elements = document.querySelectorAll("div[data-item-index] img");
	const url_list = [] as string[];
	image_elements.forEach((item) => {
		const srcet = item.getAttribute("srcset");
		if (!srcet) return;
		const url = getMaxSrcsetImg(srcet);
		url_list.push(url);
	});

	browser.runtime.sendMessage({
		type: "envato_down_url",
		data: url_list,
	});
};

function getMaxSrcsetImg(srcsetStr: string) {
	const list = srcsetStr.split(",").map((item) => {
		const [url, size] = item.trim().split(/\s+/);
		return { url, w: parseInt(size) };
	});
	return list.sort((a, b) => b.w - a.w)[0].url;
}

export const EnvatodownloadImages = async (message: { data: string[] }) => {
	for (const [index, item] of message.data.entries()) {
		const fileNumber = String(index + 1).padStart(3, "0");

		try {
			// 3. 触发浏览器下载
			await browser.downloads.download({
				url: item,
				filename: `${fileNumber}.jpg`,
				conflictAction: "uniquify", // 若有同名文件自动重命名
			});
			console.log(`第 ${fileNumber} 张图片下载成功`);
		} catch (error) {
			console.error(`第 ${fileNumber} 张图片下载失败:`, error);
		}
	}
};
