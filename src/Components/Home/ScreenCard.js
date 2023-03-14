import { useNavigate } from 'react-router-dom'

function ScreenCard(props) {
    const navigate = useNavigate()

    return (
        <div className="ScreenCard" onClick={() => navigate(props.link) }>
            {props.icon}
            <div>
                {props.description}
            </div>
        </div>
        )
}

export default ScreenCard;