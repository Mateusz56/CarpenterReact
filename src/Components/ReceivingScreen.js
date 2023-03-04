import ReceivingGrid from "./Receiving/ReceivingGrid";
import Title from "./Title";

function ReceivingScreen() {
    return (
        <div>
            <Title title="Receiving" />
            <ReceivingGrid myStyle={{ display: 'inline-block', height: 'calc(100vh - 55px)', width: 'calc(100% - 8px)' }} />
        </div>
    )
}

export default ReceivingScreen;