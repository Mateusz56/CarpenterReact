import { BookFill, BoxFill, FileEarmarkText, FileEarmarkTextFill, Hammer, Layers, LayersFill } from "../../../../node_modules/react-bootstrap-icons/dist/index";
import ScreenCard from "./ScreenCard";

function HomeScreen() {
    return (<div className={"HomeScreen"}>
        <ScreenCard description={'Receiving'} icon={<FileEarmarkText size={75} />} link={'/receiving'} />
        <ScreenCard description={'Products and components'} icon={<Layers size={75} />} link={'/products'} />
        <ScreenCard description={'Workstations'} icon={<Hammer size={75} />} link={'/workstations'}/>
    </div>)
}

export default HomeScreen;