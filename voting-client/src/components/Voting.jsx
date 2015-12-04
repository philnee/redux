import React from 'react';
import Winner from './Winner';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Vote from './Vote';

export const Voting = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div>
			{this.props.winner ?
				<Winner ref="winner" winner={this.props.winner} /> :
				<Vote {...this.props} />}
		</div>;
	}
});

function mapStateToProps(state){
	return {
		pair:state.getIn(['vote','pair']),
		hasVoted:state.get('hasVoted'),
		winner: state.get('winnner')
	};
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);