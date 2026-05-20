import { createRoot } from "react-dom/client";
import { XHSButton } from "./button";
import { XHShandPic } from "./hand_pic";

export default defineContentScript({
	runAt: "document_end",
	matches: ["https://www.xiaohongshu.com/*"],
	main(ctx) {
		XHShandPic();
		const ui = createIntegratedUi(ctx, {
			position: "overlay",
			anchor: "body",
			onMount(container) {
				const rootElement = document.createElement("div");
				container.append(rootElement);

				const root = createRoot(rootElement);
				root.render(<XHSButton />);
				return root;
			},
		});

		ui.mount();
	},
});
