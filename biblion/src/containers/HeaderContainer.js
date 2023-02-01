import { useContext, useEffect, useState } from "react";
import { SERVER_URL } from "./BookContainer";
import { UserContext } from "../App";
import { createContext } from "react";

const HeaderContainer = ({books}) => {

    const [user, setUser] = useContext(UserContext)

    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [readers, setReaders] = useState([])

    useEffect(() =>{
        fetch(`${SERVER_URL}/readers`)
        .then(response => response.json())
        .then(response => {
        setReaders(response);
        })
    }, [])


    const handleSubmit = (event) => {
        //event default to stop refreshing
        //make a useEffect that fetches data
        //check if user exists within data
        //if user exists, set user in the context
        //if user does not exist, return error
        event.preventDefault();
        setError("");
        const reader = readers.find(reader => {
            return reader.name === name;
        })
        console.log(reader);

        if (reader) {
            setUser(reader);
        }
        else{
            setError("Could not find user :(");
            setUser(null);
        }
    }

    return (
        <>
        <h1>This is the header</h1>
        {user ? <p>Hi {user.name}</p> : (
        <> 
        <form onSubmit = {handleSubmit}>
            <input 
            type = "text"
            placeholder = "enter name"
            value = {name}
            onChange = {(e) => setName(e.target.value)}/>
            <button 
            type = "submit">Login
            </button>
            <button
            type ="submit">Logout</button>
            </form>
            <p>{error}</p>
         </>   
            )}
        </>
     );
}
 
export default HeaderContainer;