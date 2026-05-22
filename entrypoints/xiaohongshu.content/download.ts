// 假设这是你的下载主函数
export const downloadImages = async (message: {
	data: string[];
	prefix: string;
}) => {
	// 1. 获取当前时间并自动补零 (月、日、时、分、秒)
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需 +1
	const day = String(now.getDate()).padStart(2, "0");
	const hour = String(now.getHours()).padStart(2, "0");
	const minute = String(now.getMinutes()).padStart(2, "0");
	const second = String(now.getSeconds()).padStart(2, "0");

	// 生成时间文件夹名，格式如: "0518_175708"
	const folderName = `${month}${day}_${hour}${minute}${second}`;

	// 2. 使用 for...of 循环确保按队列顺序下载，防止数字序号因网速错乱
	for (const [index, item] of message.data.entries()) {
		// 生成 3 位数字排序，如: 001, 002, 003...
		const fileNumber = String(index + 1).padStart(3, "0");

		try {
			// 3. 触发浏览器下载
			await browser.downloads.download({
				url: item,
				// 保存路径形如: xhs/0518_175708/001.jpg
				filename: `${message.prefix}/${folderName}/${fileNumber}.jpg`,
				conflictAction: "uniquify", // 若有同名文件自动重命名
			});
			console.log(`第 ${fileNumber} 张图片下载成功`);
		} catch (error) {
			console.error(`第 ${fileNumber} 张图片下载失败:`, error);
		}
	}
};
