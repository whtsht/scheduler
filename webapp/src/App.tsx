import liff from "@line/liff";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "@fontsource/roboto/400.css";

const color = { line: "#00D816" };

function App() {
    let isLoggedIn = false;
    try {
        isLoggedIn = liff.isLoggedIn();
    } catch (e) {
        console.log(e);
    }
    if (isLoggedIn) {
        const token = liff.getDecodedIDToken();
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                style={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <h1 style={{ textAlign: "center" }}>
                        こんにちは {token?.name} さん
                    </h1>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{ fontSize: 20, fontWeight: "bold" }}
                        onClick={() => {
                            liff.logout();
                            window.location.reload();
                        }}
                    >
                        ログアウト
                    </Button>
                </Grid>
            </Grid>
        );
    } else {
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
                        style={{ backgroundColor: color.line }}
                        sx={{ fontSize: 20, fontWeight: "bold" }}
                        onClick={() => liff.login({})}
                    >
                        Lineアカウントでログイン
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default App;
