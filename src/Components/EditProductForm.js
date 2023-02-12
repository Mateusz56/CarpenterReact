import { Formik, Field, Form } from "formik";
import { fetchPut, useFetchData } from "../Hooks/useFetchData"
import { PopupsListContext } from "./PopupsListContext";
import { useContext } from "react";

function EditProductForm(props) {
    const { removePopup } = useContext(PopupsListContext);

    const [data] = useFetchData("Product/types")

    return (
        <div className="Form" style={{ width: '350px' }}>
            <div className="Title">Edit product <span className="DecorativeText">{props.product.name}</span></div>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ name: props.product.name, description: props.product.description, productType: props.product.productType }}
                onSubmit={(values, { setFieldError }) => fetchPut(`Product/${props.product.id}`, {
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
                        <br />
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Product description" />
                        {errors.Description ? <div className="Error">{errors.Description.join('\n')}</div> : <br />}
                        <br />
                        <label htmlFor="productType">Product type</label>
                        <Field id="productType" name="productType" as="select">
                            {data ? Object.keys(data).map(x => <option value={x}>{data[x]}</option>) : ''}
                        </Field>

                        <br />
                        <button className="Button Gray" onClick={() => removePopup(props.id)}>Cancel</button>
                        <button type="submit" className="Button">Submit</button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default EditProductForm;