import React from 'react'
import { Table, Container, Segment } from 'semantic-ui-react'



export default function SearchResults(props){

    console.log(props)

    return (
      <div>
        <link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
        <Segment>
          <h3>Search Results</h3>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>RestaurantID</Table.HeaderCell>
                <Table.HeaderCell>BusDt</Table.HeaderCell>
                <Table.HeaderCell>orderNumber</Table.HeaderCell>
                <Table.HeaderCell>TransactionTotalAmount</Table.HeaderCell>
                <Table.HeaderCell>TransactionNetAmount</Table.HeaderCell>
                <Table.HeaderCell>ItemSoldQty</Table.HeaderCell>
                <Table.HeaderCell>BeverageQty</Table.HeaderCell>
                <Table.HeaderCell>DiscountAmount</Table.HeaderCell>
                <Table.HeaderCell>ItemDeletedAmount</Table.HeaderCell>
                <Table.HeaderCell>DiscountRatio</Table.HeaderCell>
                <Table.HeaderCell>RefundAmount</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.results.map(row => (
                <Table.Row>
                  <Table.Cell>{row.restaurantId}</Table.Cell>
                  <Table.Cell>{row.busDt}</Table.Cell>
                  <Table.Cell>{row.orderNumber}</Table.Cell>
                  <Table.Cell>{row.totalAmount}</Table.Cell>
                  <Table.Cell>{row.netAmount}</Table.Cell>
                  <Table.Cell>{row.itemSoldQty}</Table.Cell>
                  <Table.Cell>{row.beverageQty}</Table.Cell>
                  <Table.Cell>{row.discountRatio}</Table.Cell>
                  <Table.Cell>{row.itemDeletedAmount}</Table.Cell>
                  <Table.Cell>{row.discountRatio}</Table.Cell>
                  <Table.Cell>{row.refundAmount}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
}