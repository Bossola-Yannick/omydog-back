import 'dotenv/config';

import { createServer } from 'http';
// import { Server as WsServer } from 'socket.io';
import app from './app/index.app.js';
// import ioApp from './app/io.app.js';

const httpServer = createServer(app);
// const io = new WsServer(httpServer);
// ioApp.init(io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server launched at http://localhost:${PORT}`);
});
