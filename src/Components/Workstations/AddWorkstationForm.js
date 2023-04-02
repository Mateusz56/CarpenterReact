import { useContext, useEffect, useRef, useState } from "react";
import Notifications from "../Notifications/Notifications"
import { PopupsListContext } from "../PopupsListContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { fetchPost } from "../../Hooks/useFetchData";
import { WorkstationType, WorkstationTypeDescription } from "../../Enums";
import TileSelect from "../TileSelect";
import { WorkstationColors, WorkstationsIcons } from "./WorkstationsConfiguration";

function AddWorkstationForm(props) {
    const { removePopup } = useContext(PopupsListContext);
    const [workstationColor, setWorkstationColor] = useState(0);
    const [workstationIcon, setWorkstationIcon] = useState(0);
    const textareaRef = useRef(null);

    const translateTextAreaOnWidthChange = () => {
        console.log(textareaRef.current.style.width)
        const defaultTextAreaWidthPx = 338
        textareaRef.current.style.transform = `translate(${(defaultTextAreaWidthPx - textareaRef.current.clientWidth) / 2}px, 0)`
    }

    const resizeObserver = new ResizeObserver(translateTextAreaOnWidthChange)

    useEffect(() => {
        if (textareaRef.current)
            resizeObserver.observe(textareaRef.current);

        return () => resizeObserver.disconnect();
    })

    return (
    <div className="Form" style={{ width: '350px' }}>
        <div className="Title">Add workstation</div>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ name: "", description: "", type: 0, allowMultipleOperations: false }}
                onSubmit={(values) => {
                    values.type = +values.type;
                    values.icon = workstationIcon;
                    values.color = workstationColor;
                    fetchPost('Workstations', values,
                        () => {
                            removePopup(props.id);
                            props.refreshData();
                        },
                        (json) => Notifications.AddNotification('Error', Object.values(json.errors).map(x => x.join('\n')).join('\n'))
                    )
                }}
        >
            {() => (
                <Form>
                    <label htmlFor="name">Name</label>
                    <Field id="name" name="name" placeholder="Workstation name" />
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Workstation description" as="textarea" innerRef={textareaRef} />
                    <label htmlFor="type">Type</label>
                    <Field id="type" name="type" as="select">
                        {Object.values(WorkstationType).map(x => <option key={x} value={x}>{WorkstationTypeDescription[x]}</option>)}
                    </Field>
                    <label>Color</label>
                        <TileSelect setValue={setWorkstationColor} selectedValue={workstationColor} tiles={WorkstationColors.map((x, i) => { return { backgroundColor: x, value: i } })} />
                        <label>Icon</label>
                        <TileSelect big={true} setValue={setWorkstationIcon} selectedValue={workstationIcon} tiles={Object.entries(WorkstationsIcons).map((x) => { return { content: x[1](40), value: x[0] } })} />
                    <br />
                    <button className="Button Gray" onClick={() => removePopup(props.id)}>Cancel</button>
                    <button type="submit" className="Button">Submit</button>
                </Form>
            )
            }
        </Formik>
    </div>
    )
}

export default AddWorkstationForm;