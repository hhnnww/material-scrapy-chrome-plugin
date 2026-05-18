import { createRoot } from "react-dom/client";
import { TaobaoButton } from "./taobao-button";

export default defineContentScript({
	matches: ["https://sucai.wangpu.taobao.com/select.htm**"],
	runAt: "document_end",
	main(ctx) {
		const ui = createIntegratedUi(ctx, {
			position: "overlay",
			anchor: "body",
			onMount(container) {
				const rootElement = document.createElement("div");
				container.append(rootElement);

				const root = createRoot(rootElement);
				root.render(<TaobaoButton />);
				return root;
			},
		});

		ui.mount();
	},
});
