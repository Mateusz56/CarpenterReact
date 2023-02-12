import { Formik, Field, Form } from "formik";
import { fetchPost, useFetchData } from "../Hooks/useFetchData"
import { PopupsListContext } from "./PopupsListContext";
import { useContext } from "react";

function AddComponentForm(props) {
    const { removePopup } = useContext(PopupsListContext);

    const [componentProducts] = useFetchData("Product", {ProductTypeList: 1})
    const defaultProductID = componentProducts.values.length > 0 ? componentProducts.values[0].id : 0;

    return (
        <div className="Form">
            <div className="Title">Add component</div>
            <Formik
                initialValues={{ componentID: 0, quantity: "", required: false }}
                onSubmit={(values) => fetchPost('ProductComponent', {
                    productID: props.productID,
                    componentProductID: +values.componentID != 0 ? + values.componentID : defaultProductID,
                    quantity: +values.quantity,
                    required: values.required
                },
                    () => {
                        removePopup(props.id);
                        props.successCallback();
                    },
                    (response) => console.log(response)
                )}
            >
                <Form>
                    <label htmlFor="componentID">Name</label>
                    <Field id="componentID" name="componentID" as="select" placeholder="Select component">
                        {componentProducts.length == 0 ? '' : componentProducts.values.map(x => <option value={x.id}>{x.name}</option>)}
                    </Field>
                    <br />
                    <label htmlFor="quantity">Quantity</label>
                    <Field id="quantity" name="quantity" placeholder="Quantity" type="number" />
                    <br />
                    <label htmlFor="required">Required</label>
                    <Field id="required" name="required" type="checkbox" />
                    <br />
                    <button className="Button Gray" onClick={() => removePopup(props.id)}>Cancel</button>
                    <button type="submit" className="Button">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddComponentForm;