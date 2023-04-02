import { useContext } from "react";
import { WorkstationStatus, WorkstationStatusDescription, WorkstationTypeDescription } from "../../Enums";
import { fetchPost, useFetchData } from "../../Hooks/useFetchData";
import { PopupsListContext } from "../PopupsListContext";
import { WorkstationColors, WorkstationsIcons } from "./WorkstationsConfiguration";

function WorkstationDetails(props) {
    const { addPopup, removePopup } = useContext(PopupsListContext);
    const [workstationObject, fetchWorkstation] = useFetchData(`Workstations/${props.workstationId}`)
    const workstation = workstationObject ? workstationObject.workstation : null;
    const history = workstationObject ? workstationObject.workstationHistory : null;

    const closeThisPopup = () => removePopup(props.id)

    const changeWorkstationStatus = (status) => {
        fetchPost(`Workstations/status/${props.workstationId}`, { status: status }, closeThisPopup )
    }

    return (
        <div>
            <div className="WorkstationCard Big" style={workstation ? { backgroundColor: WorkstationColors[workstation.color] } : {}}>
                <div style={{ textAlign: 'center' }}>
                    {workstation ? workstation.name : ''}
                </div>
                <br />
                {workstation ? WorkstationsIcons[workstation.icon](75) : ''}
                <div>
                    <div className="Description" title={workstation ? workstation.description : ''}>
                        <span>{workstation ? workstation.description : ''}</span>
                    </div>
                    <div>
                        Allow multiple operations: <input disabled={true} checked={workstation ? workstation.allowMultipleOperations : ''} type="checkbox" />
                    </div>
                    <div>
                        Machine type: {workstation ? WorkstationTypeDescription[workstation.type] : ''}
                    </div>
                    <div>
                        Status: {workstation ? WorkstationStatusDescription[workstation.status] : ''}
                    </div>
                </div>
            </div>
            <div>
                {history ? history.map(x => <div>{WorkstationStatusDescription[x.status]} | {new Date(x.eventDate).toLocaleString()}</div>) : ''}
            </div>
            <div style={{ marginTop: '5px' }}>
                <button className={"Button"} onClick={() => changeWorkstationStatus(WorkstationStatus.Active)}>Activate</button>
                <button className={"Button Red"} onClick={() => changeWorkstationStatus(WorkstationStatus.Maintenance)}>Maintenance</button>
                <button className={"Button Gray"} onClick={() => changeWorkstationStatus(WorkstationStatus.Archived)} style={{ marginRight: '40px' }}>Archive</button>
                <button className={"Button Blue"} onClick={() => { removePopup(props.id) }}>Edit</button>
                <button className={"Button Gray"} onClick={closeThisPopup}>Close</button>
            </div>
        </div>
        )
}

export default WorkstationDetails;