// ! Début du travail sur le chat - pas utilisé pour présentation APO

// export default {
//   init(server){
//     this.server = server;
//     this.listenEvent();
//     this.users = [];
//   },

//   listenEvent(){
//     // user connexion to websocket server
//     this.server.on('connection', (socket) => {
//       const user = {
//         id: socket.id,
//       };
//       this.users.push(user);
//       console.log(this.users);

//       // user join room with an other user
//       // socket.on('joinRoom', (users) => {

//       //   const userIsPresent = this.server.sockets.sockets.get(users.idA)
//       //   console.log(userIsPresent);
//       //   const room = `${users.idA} - ${users.idB}`;
//       //   console.log(room);
//       //   socket.join(room)
//       //   console.log(`${users.idA} et ${users.idB} ont rejoint le salon`);
//       // });

//       // // users in the same room can send and receive messages
//       // socket.on('sendMessage',({ message, room }) => {
//       //   console.log(`message: ${message} / salle: ${room}`);
//       //   this.server.to(room).emit('receiveMessage', { message, clientId: socket.id });
//       // })

//       socket.on('disconnect', () => {
//         console.log(`user ${user.id} disconnected`);
//         this.users.forEach((user) => {
//           if(user.id === socket.id){
//             this.users.delete(user);
//           }
//         });
//       });
//     });
//   },
// };
