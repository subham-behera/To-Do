import { createContext, useContext, useState } from "react";

const TodoContext=createContext();

export const useTodo=()=>useContext(TodoContext);

export const TodoProvider=({children})=>{
    const [items,setItems]=useState(["Journal"]);

    const addItem=()=>{
        setItems([...items,"New Task"]);
    }

    const updateItem=(index,newValue)=>{
        const updatedItems=[...items];
        updatedItems[index]=newValue;
        setItems(updateItem);
    }

    const removeItem=(index)=>{
        setItems(items.filter((_, i) => i !== index));
    }

    return(
        <TodoContext.Provider value={{items,addItem,updateItem,removeItem}}>
            {children}
        </TodoContext.Provider>
    )
}