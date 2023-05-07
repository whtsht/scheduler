import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { isLoggedIn, COLOR } from "../App";
import liff from "@line/liff";
import { FullScreenHandle } from "react-full-screen";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

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
            <PersonIcon />
        </Button>
    );
}

function FullScreenButton({ handle }: { handle: FullScreenHandle }) {
    const [checked, setChecked] = useState(false);

    const Icon = checked ? <CloseFullscreenIcon /> : <OpenInFullIcon />;
    useEffect(() => {
        if (checked) {
            handle.enter();
        } else {
            handle.exit();
        }
    }, [checked]);

    return (
        <Button
            variant="contained"
            sx={{ fontsize: 18, fontweight: "bold" }}
            onClick={() => {
                setChecked(!checked);
            }}
        >
            {Icon}
        </Button>
    );
}

function Header({ handle }: { handle: FullScreenHandle }) {
    console.log(window.matchMedia("(display-mode: standalone)").matches);
    const Button = isLoggedIn() ? <LogOutButton /> : <LogInButton />;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        予定管理システム
                    </Typography>

                    <FullScreenButton handle={handle} />
                    {Button}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Header;
