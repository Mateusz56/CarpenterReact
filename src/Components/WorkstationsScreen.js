import Title from "./Title";
import { fetchPatch, fetchPost, useFetchData } from "../Hooks/useFetchData";
import WorkstationCard from "./Workstations/WorkstationCard";
import { WorkstationsIcons, WorkstationColors } from "./Workstations/WorkstationsConfiguration";
import { Plus } from "../../../node_modules/react-bootstrap-icons/dist/index";
import { PopupsListContext } from "./PopupsListContext";
import AddWorkstationForm from "./Workstations/AddWorkstationForm";
import { useContext } from "react";
import WorkstationFilters from "./Workstations/WorkstationFilters";

function WorkstationsScreen() {
    const ICON_SIZE = 90
    const { addPopup } = useContext(PopupsListContext);
    const [workstations, fetchWorkstations] = useFetchData('Workstations')

    const refreshWorkstations = () => fetchWorkstations();

    return (
        <div>
            <Title title="Workstations" />
            <WorkstationFilters />
            <div className="WorkstationsContainer">
                {workstations ? workstations.map((x) => <WorkstationCard key={x.id} icon={WorkstationsIcons[x.icon](ICON_SIZE)} description={x.description} name={x.name} color={WorkstationColors[x.color]} type={x.type} status={x.status} />) : ''}
                <div className="WorkstationCard" onClick={() => addPopup(<AddWorkstationForm id={Date.now} refreshData={refreshWorkstations}></AddWorkstationForm>)}>
                    <Plus size={75} />
                    Add new workstation
                </div>
            </div>
        </div>
    )
}

export default WorkstationsScreen;