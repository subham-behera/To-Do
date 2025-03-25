import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Item from "./Item";

function Hero() {
    const [date, setDate] = useState("");
    const [day, setDay] = useState("");
    const [items, setItems] = useState(["Journal"]); 

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`; // e.g., "25-3-2025"

        const savedDate = localStorage.getItem("savedDate");

        if (savedDate === formattedDate) {
            const savedItems = JSON.parse(localStorage.getItem("tasks")) || ["Journal"];
            setItems(savedItems);
        } else {
            localStorage.setItem("tasks", JSON.stringify(["Journal"]));
            localStorage.setItem("savedDate", formattedDate);
        }

        setDate(`${today.getDate()} ${today.toLocaleString('en-IN', { month: 'long' })} ${today.getFullYear()}`);
        setDay(today.toLocaleString('en-IN', { weekday: 'long' }));
    }, []);

    const addItem = () => {
        const newItems = [...items, "New Task"];
        setItems(newItems);
        localStorage.setItem("tasks", JSON.stringify(newItems));
    };

    const updateItem = (index, newText) => {
        const updatedItems = [...items];
        updatedItems[index] = newText;
        setItems(updatedItems);
        localStorage.setItem("tasks", JSON.stringify(updatedItems));
    };

    return (
        <div className="bg-gradient-to-r from-violet-400 to-purple-300 w-screen h-screen flex justify-center items-center px-4 sm:px-6 md:px-8">
            <div className="bg-white w-full max-w-sm h-[450px] flex flex-col rounded-lg shadow-xl relative">
                <div className="w-full h-[10%] flex flex-row top-0 items-center justify-center text-purple-400 shadow-sm font-josefin">
                    <span className="font-semibold text-lg">{day}</span>
                    <span className="ml-1 mr-1">,</span>
                    <span className="font-semibold text-lg">{date}</span>
                </div>
                <div className="font-medium text-xl text-center py-3">
                    To-Do List
                </div>
                <div className="flex flex-col gap-y-3 px-6 overflow-y-auto">
                    {items.map((item, index) => (
                        <Item key={index} index={index} itemName={item} updateItem={updateItem} />
                    ))}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 mb-6">
                    <button onClick={addItem}>
                        <GoPlus className="text-4xl cursor-pointer bg-purple-300 rounded-full shadow-md hover:shadow-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
