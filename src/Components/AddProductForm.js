import { Formik, Field, Form, ErrorMessage } from "formik";
import { fetchPost, useFetchData } from "../Hooks/useFetchData"
import { PopupsListContext } from "./PopupsListContext";
import { useContext } from "react";

function AddProductForm(props) {
    const { removePopup } = useContext(PopupsListContext);

    const [ data ] = useFetchData("Product/types")

    return (
        <div className="Form" style={{ width: '350px'}}>
            <div className="Title">Add new product</div>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ name: "", description: "", productType: 0 }}
                onSubmit={(values, { setFieldError }) => fetchPost('Product', {
                    name: values.name,
                    description: values.description,
                    productType: +values.productType
                },
                    () => {
                        removePopup(props.id);
                        props.successCallback();
                    },
                    (response) => Object.entries(response.errors).forEach(x => setFieldError(x[0], x[1]))
                )}
            >
                {({ errors }) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" placeholder="Product name" />
                        {errors.Name ? <div className="Error">{errors.Name.join('\n')}</div> : <br />}
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Product description" />
                        {errors.Description ? <div className="Error">{errors.Description.join('\n')}</div> : <br />}
                        <label htmlFor="productType">Product type</label>
                        <Field id="productType" name="productType" as="select">
                            {data ? Object.keys(data).map(x => <option value={x}>{data[x]}</option>) : ''}
                        </Field>

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

export default AddProductForm;