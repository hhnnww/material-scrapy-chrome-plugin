import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { run } from "./run";

export function BottomButton() {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				zIndex: 9999,
				padding: "10px",
			}}
		>
			<Button
				variant="contained"
				onClick={() => {
					run();
				}}
			>
				采集
			</Button>
		</Box>
	);
}
