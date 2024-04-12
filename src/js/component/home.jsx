import React, { useState, useEffect } from 'react';

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    function obtenerDatosApi() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://playground.4geeks.com/todo/users/miguel", requestOptions)
          .then((response) => {
            if (response.ok) {
                return (response.json())
            } else {
                if(response.status === 404) {
                    crearUsuario()
                }
            }
            }) 
        .then((result) => setTodos(result.todos))
        .catch((error) => console.error(error));
        }

        const crearUsuario = () => {
            const requestOptions = {
                method: "POST",
                // redirect: "follow"
            };

            fetch("https://playground.4geeks.com/todo/users/miguel", requestOptions)
                .then((response) => response.json())
                .then((result) => obtenerDatosApi())
                .catch((error) => console.error(error));
        }
    
    useEffect(() => {
        obtenerDatosApi() 
    },[])

    function crearTarea() {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
            "label": inputValue,
            "is_done": false
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            fetch("https://playground.4geeks.com/todo/todos/miguel", requestOptions)
            .then((response) => response.json())
            .then((result) => setTodos([...todos, {
                "label": inputValue,
                "is_done": false
                } ]))
            .catch((error) => console.error(error));
            setInputValue("");
    }

    function borrarTarea(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
            .then((response) => {
                if (response.status === 204) {
                    obtenerDatosApi()
                }
                return response.json()})
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    const pulsarEnter = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            crearTarea(inputValue)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, { tarea: inputValue }]);
            setInputValue("");
        }
    };

    const handleDelete = (id) => {
        borrarTarea(id)
    };

    return (
        <div className="container">
            <h1 className='total'>LISTA DE LA COMPRA</h1>
            <div>
                <input className='input'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={pulsarEnter}
                    placeholder="Escribe tu producto..."
                />
            </div>
            <div className='tareas-container'>
                <ul className='tareas'>
                    {todos.map((todo, index) => (
                        <li key={index} className="tarea-item">
                            <button className="noselect" onClick={() => handleDelete(todo.id)}><span class="text">Comprado</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                            <span className='productos'>{todo.label}</span>
                        </li>
                    ))}
                </ul>
            </div >
            <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
            <div className='total'>{todos.length} PRODUCTOS</div>
        </div >
    );
};

export default Home;
