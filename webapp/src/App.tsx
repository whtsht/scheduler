//import liff from "@line/liff";
import LoggedIn from "./components/Contents/LoggedIn";
import LoggedOut from "./components/Contents/LoggedOut";
import { CssBaseline } from "@mui/material";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const COLOR = { line: "#00D816" };

function isLoggedIn(): boolean {
    // let ret = false;
    // try {
    //     ret = liff.isLoggedIn();
    // } catch (e) {
    //     console.log(e);
    // }
    // return ret;
    return true;
}

function App() {
    const Scene = isLoggedIn() ? <LoggedIn /> : <LoggedOut />;
    const handle = useFullScreenHandle();

    return (
        <FullScreen handle={handle}>
            <CssBaseline>{Scene}</CssBaseline>
        </FullScreen>
    );
}

export default App;
export { COLOR, isLoggedIn };
