import './Css/App.css';
import './Css/Grid.css';
import './Css/Form.css';
import './Css/Buttons.css';
import PopupsContainer from './Components/PopupsContainer';
import { useState } from 'react';
import { PopupsListContext, RemovePopup, AddPopup } from './Components/PopupsListContext';
import ProductsScreen from './Components/ProductsScreen';
import ReceivingScreen from './Components/ReceivingScreen';
import NotificationsContainer from './Components/Notifications/NotificationsContainer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeScreen from './Components/Home/HomeScreen';
import WorkstationsScreen from './Components/WorkstationsScreen';

function App() {
    const [popupsList, setPopups] = useState([]);
    const addPopup = (popup) => setPopups(AddPopup(popupsList, popup));
    const removePopup = (popup) => setPopups(RemovePopup(popupsList, popup));

    return (
        <div>
            <BrowserRouter>
                <PopupsListContext.Provider value={{ popupsList, addPopup, removePopup }}>
                    <PopupsContainer />
                    <NotificationsContainer />
                    <Routes>
                        <Route path="/" element={<HomeScreen/>} />
                        <Route path="/products" element={<ProductsScreen />} />
                        <Route path="/receiving" element={<ReceivingScreen />} />
                        <Route path="/workstations" element={<WorkstationsScreen/>} />
                    </Routes>
                </PopupsListContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
