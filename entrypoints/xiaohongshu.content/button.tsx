import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { XHShandPic } from "./hand_pic";

export const XHSButton = () => {
	return (
		<Box sx={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 9999 }}>
			<Button
				variant="contained"
				size="small"
				sx={{ fontSize: "12px" }}
				onClick={() => {
					XHShandPic();
				}}
			>
				down image
			</Button>
		</Box>
	);
};
