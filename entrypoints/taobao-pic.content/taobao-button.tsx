import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { handPic } from "./hand_pic";

export function TaobaoButton() {
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
				variant="contained"
				disableElevation
				onClick={async () => {
					await handPic();
				}}
			>
				make xq
			</Button>
		</Box>
	);
}
