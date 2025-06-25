import React, { useEffect, useState } from 'react';
import './UserTable.css';
import defaultPhoto from '../assets/images/default_photo.png'; 

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (email) => {
    fetch(`http://localhost:5000/api/users/${email}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => setUsers(users.filter(user => user.email !== email)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="user-table-container">
      <h1 className="user-table-header">Usuarios Registrados</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Member name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Password</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={defaultPhoto} alt="Avatar" /></td>
              <td>{user.name} {user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleDelete(user.email)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
