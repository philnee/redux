import {List,Map} from 'immutable';

function setState(state, newState){
	return state.merge(newState);
}

function removeVote(state){
	const votedRound = state.getIn(['hasVoted','round']);
	const currentRound = state.getIn(['vote', 'round']);
	
	if((votedRound) && votedRound != currentRound){
		return state.remove('hasVoted');
	}
	else{
		return state;
	}
}

function vote(state, entry){
	const currentPair = state.getIn(['vote', 'pair']);
	const currentRound = state.getIn(['vote', 'round']);
	
	if(currentPair && currentPair.contains(entry)){
		return state.setIn(['hasVoted', 'entry'], entry)
					.setIn(['hasVoted', 'round'], currentRound);
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