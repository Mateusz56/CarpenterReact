import Title from './Title';
import ProductsGrid from './ProductsGrid';
import ComponentsGrid from './ComponentsGrid';
import { useContext, useState } from 'react';
import { SelectedProductIDContext } from './Contexts';

function ProductsScreen(props) {
    const [selectedProductID, setSelectedProductID] = useState(0)

    return (
        <div>
            <Title title="Products" />
            <SelectedProductIDContext.Provider value={{ selectedProductID, setSelectedProductID }}>
                <ProductsGrid myStyle={{ display: 'inline-block', height: 'calc(100vh - 55px)', width: 'calc(50% - 8px)' }} />
                <ComponentsGrid myStyle={{ display: 'inline-block', height: 'calc(100vh - 55px)', width: 'calc(50% - 8px)' }} />
            </SelectedProductIDContext.Provider>
        </div>
    )
}

export default ProductsScreen