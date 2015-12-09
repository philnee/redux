export default socket => store => next => action => {
	if(action.meta && action.meta.remote){
		socket.emit('action', action);
		console.log('action sent',action);
	}
	console.log('action',store.getState());
	return next(action);
}