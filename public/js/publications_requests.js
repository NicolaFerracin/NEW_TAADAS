$(function() {										
	var RequestsTable = React.createClass({
		getInitialState: function() {
			return {rows: []}
		},
		componentDidMount: function() {
			var that = this;
			 $('.request').on('click', function(e) {
				console.log('button clicked');

				var RequestRow = React.createClass({

					render: function() {
						return (<tr id={this.props.identifier}><td>{this.props.title}</td><td>1</td></tr>)
					}
			});
			var identifier = e.target.attributes.identifier.value;

			console.log('identifier: ', identifier);
			console.log(document.getElementById(identifier));

			if ( 	document.getElementById(identifier) ) {
				return;
			} 

			var rows = that.state.rows;
			rows.push(<RequestRow title={e.target.title} identifier={identifier}/>);
			that.setState({ rows: rows });


	 	});

		},

		className: 'requests-table',
	
		render: function() {
			return (<div><table>
						<thead>
						<tr>	
		            	<th>My Requests</th>
		            	</tr>
			          </thead>
			          <tbody>
			            <tr>
			              <th>Title</th>
			              <th>Qty</th>
			            </tr>
			            { this.state.rows }
			          </tbody>
			        </table>
	        <a href="/publications-test/requests-form"><button id="submit-requests">Submit Requests</button></a></div>)
	          
		}

	});

	ReactDOM.render(<RequestsTable />, document.getElementById('my-requests'));

});