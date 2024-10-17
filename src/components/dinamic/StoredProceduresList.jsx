import { useEffect, useState } from 'react';
import { apiUrl } from '../../config';

const StoredProceduresList = () => {
  const [storedProcedures, setStoredProcedures] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchStoredProcedures = async () => {
      try {
        const response = await fetch(`${apiUrl}/getStoredProcedures`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
          credentials: 'include', // Incluir credenciales si es necesario
        });

        if (!response.ok) {
          const errorText = await response.text(); // Obtiene el texto de error
          throw new Error(`Error fetching stored procedures: ${errorText}`);
        }

        const data = await response.json();
        setStoredProcedures(data);
      } catch (error) {
        console.error('Error fetching stored procedures:', error);
        setError(error.message); // Guarda el mensaje de error en el estado
      }
    };

    fetchStoredProcedures();
  }, []);

  return (
    <div>
      <h1>Stored Procedures</h1>
      {error ? ( // Mostrar el error si existe
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
        {storedProcedures.length > 0 ? (
          storedProcedures.map((proc, index) => (
            <li key={`${proc.procedureName}_${index}`}> {/* Combina el nombre con el índice para garantizar que la key sea única */}
              {proc.procedureName}
            </li>
          ))
        ) : (
          <p>No stored procedures found.</p>
        )}
      </ul>
      
      )}
    </div>
  );
};

export default StoredProceduresList;
