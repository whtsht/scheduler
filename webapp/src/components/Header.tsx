import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { isLoggedIn, COLOR } from "../App";
import liff from "@line/liff";

function LogInButton() {
    return (
        <Button
            variant="contained"
            style={{ backgroundColor: COLOR.line }}
            sx={{ fontSize: 18, fontWeight: "bold" }}
            onClick={() => liff.login({})}
        >
            ログイン
        </Button>
    );
}

function LogOutButton() {
    return (
        <Button
            variant="contained"
            sx={{ fontsize: 18, fontweight: "bold" }}
            onClick={() => {
                liff.logout();
                window.location.reload();
            }}
        >
            ログアウト
        </Button>
    );
}

function Header() {
    const Button = isLoggedIn() ? <LogOutButton /> : <LogInButton />;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        予定管理システム
                    </Typography>
                    {Button}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Header;
