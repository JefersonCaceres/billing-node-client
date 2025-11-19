import axios from "axios";

const BASE_URL = process.env.JAVA_BACKEND_URL || "http://localhost:30320";

async function main() {
  try {
    console.log("=== 1) Crear cliente ===");

    const clientPayload = {
      documentType: "CC",
      document: `DOC_${Date.now()}`,
      name: "Jefferson Caceres",
      email: `jefferson_${Date.now()}@example.com`,
      phone: "3001234567",
      address: "Barranquilla",
      active: true      
    };

    const createResp = await axios.post(
      `${BASE_URL}/api/clients/create`,
      clientPayload
    );
    console.log("Cliente creado:", createResp.data);

    console.log("\n=== 2) Consultar cliente por documento ===");
    const getResp = await axios.get(
      `${BASE_URL}/api/clients/get/${clientPayload.document}`
    );
    console.log("Cliente obtenido:", getResp.data);

    console.log("\n=== 3) Generar factura para el cliente ===");

    const invoiceRequest = {
      items: [
        { description: "Prod 1", quantity: 2, unitPrice: 100000 }, 
        { description: "Prod 2", quantity: 1, unitPrice: 150000 }   
      ]
    };

    const invoiceResp = await axios.post(
      `${BASE_URL}/api/clients/bill/${clientPayload.document}`,
      invoiceRequest
    );
    console.log("Factura generada:", invoiceResp.data);

    console.log("\n=== 4) (Opcional) Eliminar cliente ===");
    const deleteResp = await axios.delete(
      `${BASE_URL}/api/clients/delete/${clientPayload.document}`
    );
    console.log("Cliente eliminado, status:", deleteResp.status);

    console.log("\n✅ Script Node.js finalizado correctamente.");

  } catch (error) {
    console.error("\n❌ Error ejecutando el script Node.js:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Body:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
  }
}

main();
