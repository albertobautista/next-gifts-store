import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  console.log("Conectando a MongoDB 1");
  if (mongoConnection.isConnected) {
    console.log("Ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    console.log("Conectando a MongoDB 2", {
      mongoose,
      connections: mongoose.connections.length,
      isConnected: mongoConnection.isConnected,
      monggose: mongoose.connections[0].readyState,
    });

    mongoConnection.isConnected = mongoose.connections[0].readyState;
    console.log("Conectando a MongoDB 3");

    if (mongoConnection.isConnected === 1) {
      console.log("Usando conexión anterior");
      return;
    }
    console.log("Conectando a MongoDB 4");

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConnected = 1;
  console.log("Conectado a MongoDB:", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log("Desconectado de MongoDB");
};
