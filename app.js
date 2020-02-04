const app = require('./config/server');

const server = app.listen(80, () => console.log('Server online'));

const io = require('socket.io').listen(server);

app.set('io', io);

// create websocket
io.on('connection', socket => {
	console.log('User conected');

	socket.on('disconnect', () => console.log('User desconected'));

	socket.on('msgParaServidor', data => {
		
		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		// users
		if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);
		}
	});

});