import React from 'react';
import Winner from './Winner';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
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
		winner: state.get('winnner')
	};
}

export const VotingContainer = connect(mapStateToProps)(Voting);