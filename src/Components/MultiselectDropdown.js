import { useEffect, useRef, useState } from "react"
import { ArrowDown, ChevronDoubleDown } from "../../../node_modules/react-bootstrap-icons/dist/index"
import ReactDOM from 'react-dom'

function MultiselectDropdown(props) {
    const [showValues, setShowValues] = useState(false);
    const thisParent = useRef();
    const [parentBounding, setParentBounding] = useState('');

    const updateParentBounding = () => setParentBounding(thisParent.current ? thisParent.current.getBoundingClientRect() : '');
    const toggleValuesDisplay = (event) => {
        if (event.target != thisParent.current && event.target.parentElement != thisParent.current)
            return;

        if (!showValues)
            updateParentBounding();
        setShowValues(!showValues);
    }

    useEffect(() => {
        updateParentBounding();
        window.addEventListener('resize', updateParentBounding);
        return () => {
            window.removeEventListener('resize', updateParentBounding);
        }
    }, [])

    const setParameters = (value, toggle) => {
        let newState = [...props.parentStateValue]
        if (toggle)
            newState.push(value);
        else
            newState.splice(newState.indexOf(value), 1);

        props.parentSetStateValue(newState);
    }

    function createDisplayString() {
        let displayString = props.parentStateValue.map(x => props.values.find(v => v[0] == x)[1]).join(', ')
        //if (displayString.length > 10)
       //     displayString = `${displayString.slice(0, 7)}...`

        return displayString;

       /* if (props.parentStateValue.length == 0)
            return ''

        let firstDescription = props.values.find(x => x[0] == props.parentStateValue[0])[1]
        if (props.parentStateValue.length == 1)
            return firstDescription
        else
            return `${firstDescription}, ...`*/
    }

    return (
        <div ref={thisParent} onClick={toggleValuesDisplay} className="MultiselectDropdown"><input readOnly={true} disabled={true} style={{ width: '80%', height: '100%', border: '0', backgroundColor: 'white' }} value={createDisplayString()} />
            <ChevronDoubleDown style={{ float: 'right', marginTop: '4px' }} />
            {showValues ?
                ReactDOM.createPortal(<div className="DropdownValues" style={parentBounding ? { top: parentBounding.top + parentBounding.height, left: parentBounding.left, minWidth: parentBounding.width } : {}}>
                    {props.values.map(x => <div key={x[0]}><input checked={props.parentStateValue.includes(x[0])} onChange={(event) => setParameters(x[0], event.target.checked)} style={{ float: 'left' }} type={'checkbox'} /> {x[1]}</div>)}
                </div>, document.getElementById('root'))
                : ''}
        </div>
    );
}

export default MultiselectDropdown;