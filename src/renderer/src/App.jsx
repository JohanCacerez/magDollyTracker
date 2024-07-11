import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [newUserName, setNewUserName] = useState('')

  useEffect(() => {
    // Obtener usuarios al cargar el componente
    window.api.getUsers().then(setUsers)
  }, [])

  const handleAddUser = () => {
    if (newUserName) {
      window.api
        .createUser(newUserName)
        .then(() => {
          // Actualizar la lista de usuarios después de crear uno nuevo
          return window.api.getUsers()
        })
        .then(setUsers)
      setNewUserName('')
    }
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <h1>development</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Nombre del usuario"
      />
      <button onClick={handleAddUser}>Agregar Usuario</button>
    </div>
  )
}

export default App
