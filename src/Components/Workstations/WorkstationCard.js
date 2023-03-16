function WorkstationCard(props) {
    return (
        <div className="WorkstationCard">
            {props.icon}
            <div>
                {props.description}
            </div>
        </div>
    )
}

export default WorkstationCard;