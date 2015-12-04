export default socket => store => next => action => {
	if(action.meta && action.meta.remote){
		socket.emit('action', action);
	}
	console.log('action sent',action);
	return next(action);
}