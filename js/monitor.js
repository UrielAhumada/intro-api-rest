const API_URL = "https://68bf12339c70953d96eeabcc.mockapi.io/api/v1/dispositivos_IoT";

const recordsTable = document.getElementById("recordsTable");
const lastStatus = document.getElementById("lastStatus");

// Función para obtener y mostrar registros
async function getRecords() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Ordenar por fecha descendente
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mostrar últimos 10 registros
    const lastTen = data.slice(0, 10);
    recordsTable.innerHTML = lastTen.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td><span class="badge bg-primary">${r.status}</span></td>
        <td>${r.ip}</td>
        <td>${new Date(r.date).toLocaleString("es-MX")}</td>
      </tr>
    `).join("");

    // Último status
    if (data.length > 0) {
      lastStatus.innerHTML = `Último comando: <strong>${data[0].status}</strong>`;
    } else {
      lastStatus.textContent = "No hay registros todavía.";
    }

  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Polling cada 2 segundos
setInterval(getRecords, 2000);

// Inicializar
getRecords();