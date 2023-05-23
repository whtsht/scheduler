//import liff from "@line/liff";
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";
import { CssBaseline } from "@mui/material";
import ja from "dayjs/locale/ja";
import dayjs from "dayjs";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

dayjs.locale(ja);

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
    const MainScreen = isLoggedIn() ? <LoggedIn /> : <LoggedOut />;
    const handle = useFullScreenHandle();

    return (
        <FullScreen handle={handle}>
            <CssBaseline>{MainScreen}</CssBaseline>
        </FullScreen>
    );
}

export default App;
export { COLOR, isLoggedIn };
