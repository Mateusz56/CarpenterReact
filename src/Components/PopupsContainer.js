import { PopupsListContext } from "./PopupsListContext";
import { useContext } from "react";

function PopupsContainer(props) {
    const { popupsList } = useContext(PopupsListContext);

    return (
        <div className={`PopupsContainer ${popupsList.length > 0 ? ' Active' : ''}`}>
            {popupsList.map(x =>
                <div key={x.props.id} className="PopupContainer">
                    {x}
                </div>
                )}
        </div>    
    )
}

export default PopupsContainer;