import {List,Map} from 'immutable';

function setState(state, newState){
	return state.merge(newState);
}

function removeVote(state){
	const hasVoted = state.hasVoted;
	const currentPair = state.getIn(['vote', 'pair'], List);
	
	if(currentPair && !currentPair.includes(hasVoted)){
		return state.remove('hasVoted');
		console.log('Removed hasVoted');
	}
	else{
		return state;
	}
	
}

function vote(state, entry){
	const currentPair = state.getIn(['vote', 'pair']);
	if(currentPair && currentPair.contains(entry)){
		return state.set('hasVoted', entry);
	}
	else
	{
		return state;
	}
}

export default function(state = Map(), action){
	switch(action.type){
		case 'SET_STATE':
			return removeVote(setState(state, action.state));
		case 'VOTE':
			return vote(state, action.entry);
	}
	return state;
}