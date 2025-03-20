import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

function Item({ itemName }) {
    const [checked, setChecked] = useState(false);
    const [editable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(itemName);

    const toggleEditable = () => {
        setEditable(!editable);
    };

    const handleChecked = () => {
        setChecked(!checked);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="flex flex-row items-center w-full justify-between px-4 sm:px-6 py-2">
            <div className="flex flex-row items-center gap-x-4 relative group w-[85%]">
                <button
                    onClick={toggleEditable}
                    className="absolute opacity-0 group-hover:opacity-100 duration-300 w-8 h-6 rounded-sm justify-center flex items-center bg-purple-300"
                >
                    <MdModeEdit className="text-violet-600 text-xl" />
                </button>

                <div className={`font-normal ml-10 text-gray-400 ${checked ? 'line-through' : ''}`}>
                    {editable ? (
                        <input
                            type="text"
                            value={inputValue}
                            disabled={!editable}
                            onChange={handleChange}
                            className="border p-2 rounded-md w-full"
                        />
                    ) : (
                        <span>{inputValue}</span>
                    )}
                </div>
            </div>


            <input
                type="checkbox"
                id="my-checkbox"
                checked={checked}
                onChange={handleChecked}
                className="ml-4"
            />
        </div>
    );
}

export default Item;
