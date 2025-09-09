const API_URL = "https://68bf12339c70953d96eeabcc.mockapi.io/api/v1/dispositivos_IoT";

const form = document.getElementById("statusForm");
const recordsTable = document.getElementById("recordsTable");
const lastStatus = document.getElementById("lastStatus");

// Función para obtener y ordenar registros
async function getRecords() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Ordenar por fecha descendente (más reciente primero)
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mostrar últimos 5 registros
    const lastFive = data.slice(0, 5);
    recordsTable.innerHTML = lastFive.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td><span class="badge bg-primary">${r.status}</span></td>
        <td>${r.ip}</td>
        <td>${new Date(r.date).toLocaleString("es-MX")}</td>
      </tr>
    `).join("");

    // Mostrar último status
    if (data.length > 0) {
      lastStatus.innerHTML = `Último comando: <strong>${data[0].status}</strong>`;
    } else {
      lastStatus.textContent = "No hay registros todavía.";
    }

  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Función para agregar un nuevo registro
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRecord = {
    name: document.getElementById("name").value,
    status: document.getElementById("status").value,
    ip: document.getElementById("ip").value,
    date: new Date().toISOString() // formato ISO válido
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecord)
    });

    form.reset();
    // Volvemos a cargar la tabla inmediatamente
    getRecords();
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
});

// Inicializar
getRecords();

