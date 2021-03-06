import React from 'react/addons';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('Results', () => {
	it('Renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Trainspotting': 5});
		const component = renderIntoDocument(
			<Results pair={pair} tally={tally} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, days] = entries.map(e => e.textContent);
				
		expect(entries.length).to.equal(2);
		
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('5');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});
	
	it('invokes the next callback when the next button ins clicked', () => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;
		
		const pair = List.of('Trainspotting', '28 Days Later');
		const component = renderIntoDocument(
			<Results pair={pair}
					tally={Map()}
					next={next}/>
		);
		
		Simulate.click(React.findDOMNode(component.refs.next));
		
		expect(nextInvoked).to.equal(true);
	})
	
	it('Renders the winner once there is one', () => {
		const component = renderIntoDocument(
			<Results winner="Trainspotting"
					pair={["Trainspotting", "38 Days Later"]}
					tally={Map()} />
		);
		
		const winner = React.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	})
});