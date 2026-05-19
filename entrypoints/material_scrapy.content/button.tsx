import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { run } from "./run";

export function BottomButton() {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: "20px",
				left: "20px",
				zIndex: 9999,
			}}
		>
			<Button
				size="small"
				variant="contained"
				disableElevation
				sx={{ fontSize: "12px" }}
				onClick={() => {
					run();
				}}
			>
				scrapy material
			</Button>
		</Box>
	);
}
