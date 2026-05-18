import { createRoot } from "react-dom/client";
import { BottomButton } from "./component/button";

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

		ui.mount();
	},
});
