import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import liff from "@line/liff";
import { COLOR } from "../../App";

function LoggedOut() {
    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item>
                <Button
                    variant="contained"
                    style={{ backgroundColor: COLOR.line }}
                    sx={{ fontSize: 20, fontWeight: "bold" }}
                    onClick={() => liff.login({})}
                >
                    Lineアカウントでログイン
                </Button>
            </Grid>
        </Grid>
    );
}

export default LoggedOut;
