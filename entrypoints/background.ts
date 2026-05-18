export default defineBackground(() => {
	browser.runtime.onMessage.addListener(async (message) => {
		if (message.type === "fetch") {
			const res = await fetch(
				"https://material-scrapy.vercel.app/api/OrpcScrapyMaterialRoute/wxt_add",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer default-token",
					},
					body: JSON.stringify(message.data),
				},
			);

			return res;
		}
	});
});
