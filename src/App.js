import './Css/App.css';
import './Css/Grid.css';
import './Css/Form.css';
import PopupsContainer from './Components/PopupsContainer';
import { useState } from 'react';
import { PopupsListContext, RemovePopup, AddPopup } from './Components/PopupsListContext';
import ProductsScreen from './Components/ProductsScreen';
import ReceivingScreen from './Components/ReceivingScreen';

function App() {
    const [popupsList, setPopups] = useState([]);
    const addPopup = (popup) => setPopups(AddPopup(popupsList, popup));
    const removePopup = (popup) => setPopups(RemovePopup(popupsList, popup));

    return (
        <div>
            <PopupsListContext.Provider value={{ popupsList, addPopup, removePopup } }>
                <PopupsContainer />
                <ReceivingScreen />
               <ProductsScreen/>
            </PopupsListContext.Provider>
        </div>
    );
}

export default App;
