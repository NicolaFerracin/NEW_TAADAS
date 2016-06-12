$(function() {						


	var RequestsTable = React.createClass({
		getInitialState: function() {
			return { rows: [] }
		},

		componentDidMount: function() {

			this.setState( { rows: [], quantities: [] });


			var requestedItems = [];
			// var quantities = {};
			sessionStorage.setItem("requestedItems", JSON.stringify(requestedItems));
			// sessionStorage.setItem("quantities", JSON.stringify(quantities));


			/* attach click handler to request buttons that adds row to requests table */
			 $('.request').on('click', function(e) {
			 		console.log(this);


					var newRowsArray = this.state.rows;
					var quantitiesArray = this.state.quantities;

			 		var index = this.state.rows.length;

			 		var title = e.target.attributes.pubtitle.value;

			 		var identifier = e.target.attributes.identifier.value;

			 		var inputClass = '.class_' + identifier;

			 		// var qty = $(inputClass).val();
			 		console.log('title: ', title);

			 		

			 		var RequestRow = React.createClass({
			 			getInitialState: function() {
			 				return { quantity: 1 }
			 			},
						render: function() {
							var changeHandler = function(e) {
			 					this.setState({ quantities: e.target.value || this.state.quantities + 1 });
			 				}

							return (<tr id={'id_' + this.props.identifier}><td>{title}</td><td><input id={'input' + this.props.identifier} type="number" min="1" value={this.state.quantity} onChange={changeHandler}/></td>
									<td><i class="fa fa-trash-o"></i></td>
								</tr>)
						}
					});

					

					var insertNewRow = true;

					newRowsArray.forEach(function(rowObject, index) {
						if( rowObject.props.identifier == identifier) {
							console.log('identifier already exists!')
							insertNewRow = false;
						} 
					});

					if (!insertNewRow) {
						// quantitiesArray[index] += qty;
						// this.setState({ quantities: quantitiesArray });
						// this.setState({ rows: newRowsArray });
						$('#input' + identifier).trigger('change');

						return;
					}

					// quantitiesArray[index] = qty;
					// this.setState({quantities: quantitiesArray});
					newRowsArray.push(<RequestRow identifier={identifier} title={title}/>)

					this.setState({ rows: newRowsArray });

	 		}.bind(this));


		},

		className: 'requests-table',
	
		render: function() {
			// var rows = [];

			// this.state.row.forEach(function(row) {
		 //        	rows.push(<tr><td> blah blah blah </td></tr>)
   //          });	

			return (<div><table className="orders">
						<thead>
							<tr>
								<th colSpan="3">Your Publication Orders</th>
							</tr>
			          </thead>
			          <tbody>
			            <tr>
			              <th>Title</th>
			              <th>Qty</th>
			              <th>X</th>
			            </tr>
			            { this.state.rows }
			          </tbody>
			        </table>
	        </div>)
	          
		}

	});

	ReactDOM.render(<RequestsTable />, document.getElementById('my-requests'));

});