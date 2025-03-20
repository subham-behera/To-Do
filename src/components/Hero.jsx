import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Item from "./Item";

function Hero() {
    const [date, setDate] = useState();
    const [day, setDay] = useState();
    const [items, setItems] = useState([
        "Journal"
    ]);

    useEffect(() => {
        const today = new Date();
        const dateOfMonth = today.getDate();
        const monthName = today.toLocaleString('en-IN', { month: 'long' });
        const year = today.getFullYear();
        const dayOfWeek = today.toLocaleString('en-IN', { weekday: 'long' });

        const formattedDate = `${dateOfMonth} ${monthName} ${year}`;

        setDate(formattedDate);
        setDay(dayOfWeek);
    }, []);

    const addItem = () => {
        setItems([...items, "New Task"]);
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
                    {items.map((item, index) => {
                        return <Item key={index} itemName={item} />;
                    })}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 mb-6">
                    <button onClick={addItem}>
                        <GoPlus className="text-4xl bg-purple-300 rounded-full shadow-md hover:shadow-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
