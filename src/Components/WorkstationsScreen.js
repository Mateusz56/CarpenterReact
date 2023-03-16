import Title from "./Title";
import WorkstationCard from "./Workstations/WorkstationCard";

function WorkstationsScreen() {
    return (
        <div>
            <Title title="Workstations" />
            <div>
                <WorkstationCard/>
            </div>
        </div>
    )
}

export default WorkstationsScreen;