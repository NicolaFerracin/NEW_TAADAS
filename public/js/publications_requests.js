$(function() {										
	var RequestsTable = React.createClass({
		getInitialState: function() {
			return {rows: []}
		},

		componentDidMount: function() {

			var requestedItems = [];
			var quantities = {};
			sessionStorage.setItem("requestedItems", JSON.stringify(requestedItems));
			sessionStorage.setItem("quantities", JSON.stringify(quantities));

			var that = this;

			/* attach click handler to request buttons that adds row to requests table and saves requested item to sessionStorage */
			 $('.request').on('click', function(e) {

			 		var title = e.target.attributes.pubtitle.value;

			 		var identifier = e.target.attributes.identifier.value;

			 		var inputClass = '.class_' + identifier;

			 		var qty = $(inputClass).val();
			 		console.log('title: ', title);

					var RequestRow = React.createClass({
						render: function() {
							return (<tr id={'id_' + this.props.identifier}><td>{title}</td><td className="qty">{qty}</td></tr>)
						}
					});

					

					if ( document.getElementById('id_' + identifier) ) {
						var selector = '#id_' + identifier + ' > td.qty'
						var oldqty = Number($(selector).text());	
						var newqty = Number(qty) + oldqty;
						$(selector).text(newqty);

						var quantities = JSON.parse(sessionStorage.getItem('quantities'));
						quantities[identifier] = newqty;
						sessionStorage.setItem('quantities', JSON.stringify(quantities));

						return;
					}

					var requestedItem = {
						identifier: identifier,
						title: title
					};

					var items = JSON.parse(sessionStorage.getItem('requestedItems'));
					items.push(requestedItem);
					sessionStorage.setItem('requestedItems', JSON.stringify(items) );

					var quantities = JSON.parse(sessionStorage.getItem('quantities'));
					quantities[identifier] = qty;
					sessionStorage.setItem('quantities', JSON.stringify(quantities));

					var rows = that.state.rows;
					rows.push(<RequestRow title={e.target.title} identifier={identifier} key={identifier}/>);
					that.setState({ rows: rows });
	 		});

		},

		className: 'requests-table',
	
		render: function() {
			return (<div><table>
						<thead>
			          </thead>
			          <tbody>
			            <tr>
			              <th>Title</th>
			              <th>Qty</th>
			            </tr>
			            { this.state.rows }
			          </tbody>
			        </table>
	        </div>)
	          
		}

	});

	ReactDOM.render(<RequestsTable />, document.getElementById('my-requests'));

});