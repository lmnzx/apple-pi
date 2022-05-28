import {createServer} from 'http'
import { Server } from "socket.io";

const httpServer = createServer()
const io = new Server(httpServer, {});

const port = process.env.PORT || 3000

io.on(
	"connection",
	(socket) => {
		console.log(`client connected: ${socket.id}`);
		socket.on(
			"disconnect",
			() => {
				console.log("user disconnected");
			},
		);
		socket.on(
			"message",
			(msg) => {
				console.dir(msg, { depth: null });
				socket.broadcast.emit("message", msg);
			},
		);
		socket.on(
			"device",
			(msg) => {
				console.dir(msg, { depth: null });
				socket.emit("device", msg);
			},
		);
	},
);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
