import React from 'react'
import { Table } from 'semantic-ui-react'



export default function searchResults(props){
    return (
        <Table striped>
                <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
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
      
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    </Table.Body>
        </Table>
    )
}