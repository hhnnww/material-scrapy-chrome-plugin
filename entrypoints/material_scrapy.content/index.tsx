import { createRoot } from "react-dom/client";
import { BottomButton } from "./button";

export default defineContentScript({
	matches: ["<all_urls>"],
	runAt: "document_end",
	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			position: "overlay",
			anchor: "body",
			onMount(container) {
				const rootElement = document.createElement("div");
				container.append(rootElement);

				const root = createRoot(rootElement);
				root.render(<BottomButton />);
				return root;
			},
		});

		const current_url = window.location.href;
		const include_url = [
			"ibaotu.com",
			"58pic.com",
			"699pic.com",
			"588ku.com",
			"design006.com",
		];
		if (include_url.some((url) => current_url.includes(url))) {
			ui.mount();
		}
	},
});
