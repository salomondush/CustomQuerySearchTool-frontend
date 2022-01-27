import React from 'react'
import { Table, Container, Segment } from 'semantic-ui-react'



export default function searchResults(props){
    return (
        
      <Segment>
        <h3>Search Results</h3>
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
              <Table.Cell>2</Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>4</Table.Cell>
              <Table.Cell>5</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
              <Table.Cell>6</Table.Cell>
            </Table.Row>
            
          </Table.Body>
        </Table>
      </Segment>
    )
}