import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons
import Table from 'react-bootstrap/Table'

export default class RenderPersonalStats extends Component
{
	render()
	{
		const personal = this.props.personal

		return(

			<div>
			    <h2>Personal Stats</h2>

			     <Table borderd hover>
			      <thead>
			        <tr>
			          <th>Name</th>
			          <th>Category</th>
			          <th>Score</th>
			          <th>Percentage</th>
			        </tr>
			      </thead>

      			  <tbody>
      				 {personal.map(person,index)}
    			  </tbody>

			    </Table>
			</div>

		)
	}
}
