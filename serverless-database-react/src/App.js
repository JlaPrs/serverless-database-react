import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from './ebconfig';

function App() {
    return (
        <div className="App" style={{ display: "flex", justifyContent: "center" }}>
            <EasybaseProvider ebconfig={ebconfig}>
                <Dishes />
                <NewDishButton />
            </EasybaseProvider>
        </div>
    );
}

function Dishes() {
    const { Frame, sync, configureFrame } = useEasybase();

    useEffect(() => {
        configureFrame({ tableName: "DISHES", limit: 10 });
        sync();
    }, []);

    const noteRootStyle = {
        border: "2px #444 solid",
        borderRadius: 9,
        margin: 20,
        backgroundColor: "#efefef",
        padding: 6
    };

    return (
        <div style={{ width: 400 }}>
            {Frame().map(ele =>
                <div style={noteRootStyle}>
                    <h3>{ele.title}</h3>
                    <p>{ele.ingredients}</p>
                </div>
            )}
        </div>
    )
}

function NewDishButton() {
    const { Frame, sync } = useEasybase();

    const handleClick = () => {
        const newTitle = prompt("Please enter a title for your Dish");
        const newIngredients = prompt("Please enter the ingredients");

        Frame().push({
            title: newTitle,
            ingredients: newIngredients
        })

        sync();
    }

    return <button onClick={handleClick}> Add Dish </button>
}

export default App;