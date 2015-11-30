import React from 'react';

export default React.createClass({
	render: function(){
		return <div classname="winner">
			Winner is {this.props.winner}
			</div>;
	}
});