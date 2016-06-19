$(function() {						





	var OrdersApp = React.createClass({
		componentWillMount: function() {

			/* append order request buttons to all publications that have physical copies available for order */

			var that = this;
			$('.order').on('click', function(e) {

					var title = e.target.attributes.pubtitle.value;
					var identifier = e.target.attributes.identifier.value;
					var orders = that.state.orders;
					var newOrder = true;

					orders.forEach(function(order, index) {
						if (order.title == title) {
							console.log('title already in order table, increase order by 1');
							orders[index].qty++;
							newOrder = false;
							return
						} 
					});

					if ( newOrder ) {
						orders.push({ title: title, qty: 1, identifier: identifier });
					}

					that.setState({ orders: orders })
					sessionStorage.setItem("orderedItems", JSON.stringify(orders));

			});

			

		},
		getInitialState: function() {
			var orders = JSON.parse(sessionStorage.getItem("orderedItems")) || [];
			return {
				orders: orders 
			}
		},

		render: function() {

			var handleDelete = function(index) {
				var orders = this.state.orders;
				orders.splice(index, 1);
				this.setState({ orders: orders });
				sessionStorage.setItem("orderedItems", JSON.stringify(orders));
			};

			var handleChange = function(e, index) {
				var orders = this.state.orders;
				orders[index].qty = e.target.value;
				this.setState({ orders: orders });
				sessionStorage.setItem("orderedItems", JSON.stringify(orders));
			};

			return <OrdersTable orders={this.state.orders} handleDelete={handleDelete.bind(this)} handleChange={handleChange.bind(this)}/>
		}

	});

	var OrderRow = React.createClass({

		render: function() {
			var title = this.props.title;

			if ( title.length > 50 ) {
				title = title.slice(0, 50) + ' (...)';
			}

			var qty = this.props.qty;
			var index = this.props.index;
			var that = this;

			var handleClick = function() {
				that.props.handleDelete(index);
			};

			var handleChange = function(e) {
				that.props.handleChange(e, index);
			};

			return (<tr>
						<td>{title}</td>
						<td>
							<input type="number" min="1" max="100" value={qty} onChange={handleChange}/>
						</td>
						<td onClick={handleClick}>
						<i className="fa fa-trash-o"></i></td>
					</tr>)
		}

	});


	var OrdersTable = React.createClass({

		render: function() {

			var orders = this.props.orders;
			var that = this;
			var style = this.props.orders.length > 0 ? { "visibility": "visible" } : { "visibility": "hidden" };
			var handleSubmit = this.props.handleSubmit;

			return (<div>
						<table className="orders">
						<thead>
							<tr>
								<th colSpan="3">Your Publication Orders</th>
							</tr>
							<tr>
								<th>Title</th>
								<th>Qty</th>
								<th>X</th>
							</tr>
						</thead>
						<tbody>
						{ 
							orders.map(function(order, index) {
								return ( <OrderRow key={index} title={order.title} qty={order.qty} index={index} handleDelete={that.props.handleDelete} handleChange={that.props.handleChange}/> )
							})
						}
						</tbody>
						</table>
						<a href="requests-form" class="form-link">
							<button id="submit-order" style={style} onClick={handleSubmit} className="btn btn-success">Submit Order</button>
						</a>
					</div>)

		}
	});

	ReactDOM.render(<OrdersApp/>, document.getElementById('my-requests'));

});