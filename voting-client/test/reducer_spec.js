import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE', 
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({Trainspotting: 1})
				})
			})
		};
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	});
	
	it('handles SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type:'SET_STATE', 
			state:{
				vote:{
					pair:['Trainspotting', '28 Days Later'],
					tally: {Trainspotting:1}
				}
			}
		};
		const nextState = reducer(initialState, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	})
	
	it('handles SET_STATE without initial state', () => {
		const action = {
			type:'SET_STATE', 
			state:{
				vote:{
					pair:['Trainspotting', '28 Days Later'],
					tally: {Trainspotting:1}
				}
			}
		};
		const nextState = reducer(undefined, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting:1}
			}
		}));
	});
	
	it('handles VOTE by setting hasVoted', () => {
		const state = fromJS({
			vote:{
				round:1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type:'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(state, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				round:1,
				pair:['Trainspotting', '28 Days Later'],
				tally:{Trainspotting: 1}
			},
			hasVoted: {entry:'Trainspotting',
						round:1}
		}));
	});
	
	it('VOTE for an invalid entry does not set hasVoted', () => {
		const state = fromJS({
			vote:{
				round:1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type:'VOTE', entry: 'Armageddon'};
		const nextState = reducer(state, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				round:1,
				pair:['Trainspotting', '28 Days Later'],
				tally:{Trainspotting: 1}
			}
		}));
	});
	
	it('removes hasVoted if pair and round changes', () => {
		const state = fromJS({
			vote:{
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted:{entry:'Trainspotting',
						round:1}
		});
		
		const action = {
			type: 'SET_STATE',
			state: {
			vote: {
				round: 2,
				pair: ['Sunshine', 'Slumdog Millionaire']
			}
			}
		};
		
		const nextState = reducer(state, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				round: 2,
				pair:['Sunshine', 'Slumdog Millionaire']
			}
		}));
	});
	
	it('removes hasVoted if pair and round changes with an entry the same', () => {
		const state = fromJS({
			vote:{
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted:{entry:'Trainspotting',
						round:1}
		});
		
		const action = {
			type: 'SET_STATE',
			state: {
			vote: {
				round: 2,
				pair: ['Sunshine', 'Trainspotting']
			}
			}
		};
		
		const nextState = reducer(state, action);
		
		expect(nextState).to.equal(fromJS({
			vote:{
				round: 2,
				pair:['Sunshine', 'Trainspotting']
			}
		}));
	});
	
	
});