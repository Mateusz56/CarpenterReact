import { WorkstationStatusDescription, WorkstationType, WorkstationTypeDescription } from "../../Enums";

function WorkstationCard(props) {
    return (
        <div className="WorkstationCard" style={{ backgroundColor: props.color }}>
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
                    Allow multiple operations: <input disabled={true} type="checkbox" />
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