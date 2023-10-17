import React, { useRef, useState } from 'react'
import '../components/todolist.css'
import ModalDelete from './ModalDelete'


const initialState = [
    {
        titulo: 'Tarea 1',
        descripcion: 'Descripcion 1',
        isComplete: false,
        id: 1,
    },
    {
        titulo: 'Tarea 2',
        descripcion: 'Descripcion 2',
        isComplete: false,
        id: 2,
    },
]

function TodoList() {
    const [todoArray, setTodoArray] = useState(initialState)
    const completeCount = todoArray.filter(item => item.isComplete).length
    const pendingCount = todoArray.filter(item => !item.isComplete).length
    const [idEdit, setIdEdit] = useState()
    const [form, setForm] = useState({ titulo: '', descripcion: '' })
    const [show, setShow] = useState(false);
    const [itemEliminar, setItemEliminar] = useState()
    const refTitulo = useRef()
    const refDescripcion = useRef()

    const handleClose = () => setShow(false);

    const addTodo = (e) => {
        e.preventDefault()

        if (idEdit) { // chequea si ya existe la tarea viendo si idEdit es !== de null (es un update)
            if (!form.titulo.trim()) {
                refTitulo.current.focus()
            } else {
                setTodoArray(todoArray.map(item => item.id == idEdit ? { ...item, titulo: form.titulo, descripcion: form.descripcion } : item))
                setForm({ titulo: '', descripcion: '' }) // limpia los input del form
                setIdEdit(null) // reinicio el id seleccionado para editar
            }
        } else {
            // tarea no encontrada en el listado, se trata de una nueva tarea a agregar
            if (form.titulo.trim() !== '' && form.descripcion.trim() !== '') {
                setTodoArray([...todoArray, { titulo: form.titulo, descripcion: form.descripcion, isComplete: false, id: Date.now() }])
                setForm({ titulo: '', descripcion: '' })
            } else if (!form.titulo.trim()) {
                refTitulo.current.focus()
            } else if (!form.descripcion.trim()) {
                refDescripcion.current.focus()
            }
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const deleteTodo = (id) => {
        setTodoArray(todoArray.filter(item => item.id !== id))
        setShow(false)
    }

    const updateTodo = (id) => {
        setIdEdit(id)
        const encontrado = todoArray.find(item => item.id == id)
        setForm({ titulo: encontrado.titulo, descripcion: encontrado.descripcion }) 
        refTitulo.current.focus()
    }

    const deleteAllComplete = () => {
        setTodoArray(todoArray.filter(item => !item.isComplete))
    }

    const toggleTodo = (id) => {
        setTodoArray(todoArray.map(item => item.id == id ? { ...item, isComplete: !item.isComplete } : item))
    }

    const handleModal = (item) => {
        setShow(true) // muestra modal
        setItemEliminar(item) // guarda el item que enviara al modal para eliminar
    }

    return (

        <div className='container mt-5'>
            <form className='d-flex rounded p-3 gap-3' onSubmit={addTodo}>
                <input className='form-control' type="text" name='titulo' placeholder='Titulo' ref={refTitulo} onChange={handleChange} value={form.titulo} />
                <input className='form-control' type="text" name='descripcion' placeholder='Descripcion' ref={refDescripcion} onChange={handleChange} value={form.descripcion} />
                <input className='btn btn-primary' type="submit" value={`${idEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}`} />
            </form>

            <div className="shadow rounded p-3 mt-3 list-group">
                <div className='d-flex justify-content-between align-items-center list-group-item'>
                    <h5 className=''>Todo List</h5>
                    <button className='btn btn-danger' onClick={deleteAllComplete}>Eliminar Tareas Completadas</button>
                </div>

                <div className='listado-tareas'>
                    {todoArray.map(item => (
                        <div className='list-group-item d-flex align-items-center' key={item.id}>
                            <input type="checkbox" className='form-check-input border border-primary' onClick={() => toggleTodo(item.id)} />
                            <p className={`fw-bold p-0 mx-2 flex-grow-1 ${item.isComplete ? 'text-decoration-line-through' : ''}`}>{item.titulo} <br />
                                <span className='fw-normal text-muted'>{item.descripcion}</span>
                            </p>
                            {item.isComplete && <span className='m-2 badge btn-complete'>Completada</span>}
                            <button className='btn btn-primary mx-1' onClick={() => updateTodo(item.id)}>✏️</button>
                            <button className='btn btn-danger mx-1' onClick={() => handleModal(item)}>🗑️</button> {/*muestra modal*/}
                        </div>
                    ))}
                </div>

                <div className='list-group-item d-flex align-items-center'>
                    <span className='fw-400'>Total de tareas: {todoArray.length}, Completadas: {completeCount} , Pendientes: {pendingCount}</span>
                </div>

                <ModalDelete show={show} handleClose={handleClose} item={itemEliminar} deleteTodo={deleteTodo} />
            </div>
        </div>
    )
}

export default TodoList