import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

function Item({ itemName, index, updateItem }) {
    const [checked, setChecked] = useState(false);
    const [editable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState(itemName);

    const toggleEditable = () => {
        setEditable(true);
    };

    const handleChecked = () => {
        setChecked(!checked);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleBlur = () => {
        setEditable(false);
        updateItem(index, inputValue);
    };

    return (
        <div className="flex flex-row items-center w-full justify-between px-4 sm:px-6 py-2">
            <div className="flex flex-row items-center gap-x-4 w-[85%]">
                {/* Edit button always visible */}
                <button
                    onClick={toggleEditable}
                    className="w-8 h-6 rounded-sm cursor-pointer justify-center flex items-center bg-purple-300"
                >
                    <MdModeEdit className="text-violet-600 text-xl" />
                </button>

                <div className={`font-normal ml-2 text-gray-400 ${checked ? 'line-through' : ''}`}>
                    {editable ? (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            className="border p-2 rounded-md w-full"
                        />
                    ) : (
                        <span className="w-full">{inputValue}</span>
                    )}
                </div>
            </div>

            <input
                type="checkbox"
                checked={checked}
                onChange={handleChecked}
                className="ml-4"
            />
        </div>
    );
}

export default Item;
