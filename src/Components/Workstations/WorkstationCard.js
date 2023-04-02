import { useContext } from "react";
import { WorkstationStatusDescription, WorkstationType, WorkstationTypeDescription } from "../../Enums";
import { PopupsListContext } from "../PopupsListContext";
import WorkstationDetails from "./WorkstationDetails";

function WorkstationCard(props) {
    const { addPopup } = useContext(PopupsListContext);

    return (
        <div className="WorkstationCard" style={{ backgroundColor: props.color }} onClick={() => addPopup(<WorkstationDetails workstationId={props.workstationId} id={Date.now} />)}>
            <div style={{ textAlign: 'center' }}>
                {props.name}
            </div>
            <br/>
            {props.icon}
            <div>
                <div className="Description" title={props.description}>
                    <span>{props.description}</span>
                </div>
                <div>
                    Allow multiple operations: <input disabled={true} checked={props.allowMultipleOperations} type="checkbox" />
                </div>
                <div>
                    Machine type: {WorkstationTypeDescription[props.type]}
                </div>
                <div>
                    Status: {WorkstationStatusDescription[props.status]}
                </div>
            </div>
        </div>
    )
}

export default WorkstationCard;