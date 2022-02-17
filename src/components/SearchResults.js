import React, {useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Container, Segment, Form, Dropdown, Button, Input } from 'semantic-ui-react'
import SortableTbl from "react-sort-search-table";


export default function SearchResults(props){

    const [ filterResults, setFilterResults ] = React.useState([]);
    const [ filterMetric, setFilterMetric ] = React.useState('');
    const [ filterValue, setFilterValue ] = React.useState('');
    const [ filterOperator, setFilterOperator ] = React.useState('');

    console.log(filterMetric, filterOperator, filterValue);

    function handleFilter(){
        // filter results
        if(filterMetric && filterValue && filterOperator){
            // eslint-disable-next-line array-callback-return
            var results = props.results.filter((item) => {
                if(filterOperator === 'Equal'){
                    return item[filterMetric] === filterValue;
                }
                else if(filterOperator === 'GreaterThan'){
                    return item[filterMetric] > filterValue;
                }
                else if(filterOperator === 'LessThan'){
                    return item[filterMetric] < filterValue;
                }
                else if(filterOperator === 'GreaterThanOrEqual'){
                    return item[filterMetric] >= filterValue;
                }
                else if(filterOperator === 'LessThanOrEqual'){
                    return item[filterMetric] <= filterValue;
                }
            });

            props.setFilters(true)
            setFilterResults(results);
        }
    }

    let col = [
      "restaurantId",
      "busDt",
      "orderTime",
      "orderNumber",
      "itemSoldQty",
      "beverageQty",
      "discountAmount",
      "itemDeletedAmount",
      "discountRatio",
      "refundAmount",
      "netAmount",
      "totalAmount",
    ];
    let tHead = [
      "RestaurantId",
      "BusDt",
      "OrderTime",
      "OrderNumber",
      "ItemSoldQty",
      "BeverageQty",
      "DiscountAmount",
      "ItemDeletedAmount",
      "DiscountRatio",
      "RefundAmount",
      "NetAmount",
      "TotalAmount",
    ];
 
  

    return (
      <div>
        <div className='filtering'>
        <div class="ui floating labeled icon dropdown button">
          <i class="filter icon"></i>
          <span class="text">Filter Tags</span>
          <Form onSubmit={handleFilter}>
            <div></div>
            <Dropdown
                options={[
                    { key: 'restaurantId', text: 'RestaurantId', value: 'restaurantId' },
                    { key: 'orderNumber', text: 'OrderNumber', value: 'orderNumber' },
                    { key: 'itemSoldQty', text: 'ItemSoldQty', value: 'itemSoldQty' },
                    { key: 'beverageQty', text: 'BeverageQty', value: 'beverageQty' },
                    { key: 'discountAmount', text: 'DiscountAmount', value: 'discountAmount' },
                    { key: 'itemDeletedAmount', text: 'ItemDeletedAmount', value: 'itemDeletedAmount' },
                    { key: 'discountRatio', text: 'DiscountRatio', value: 'discountRatio' },
                    { key: 'refundAmount', text: 'RefundAmount', value: 'refundAmount' },
                    { key: 'netAmount', text: 'NetAmount', value: 'netAmount' },
                    { key: 'totalAmount', text: 'TotalAmount', value: 'totalAmount' },

                ]}
                selection
                placeholder='Select a measure'
                defaultValue={filterMetric}
                onChange={(e, data) => setFilterMetric(data.value)}
            />
            <Dropdown
                options={[
                    { key: 'Equal', text: 'Equal', value: 'Equal' },
                    { key: 'GreaterThan', text: 'GreaterThan', value: 'GreaterThan' },
                    { key: 'LessThan', text: 'LessThan', value: 'LessThan' },
                    { key: 'GreaterThanOrEqual', text: 'GreaterThanOrEqual', value: 'GreaterThanOrEqual' },
                    { key: 'LessThanOrEqual', text: 'LessThanOrEqual', value: 'LessThanOrEqual' },
                ]}
                selection
                placeholder='Select a measure'
                defaultValue={filterOperator}
                onChange={(e, data) => setFilterOperator(data.value)}
            />
            <Input
              type="number" 
              placeholder="Numeric Value" 
              defaultValue={filterValue}
              onChange={(e, data) => setFilterValue(data.value)}
            />
            <Button type="submit" color="green" class="button"><i class="filter icon"></i></Button>
          </Form>
          </div>
       </div>
        <div className="searchResult">
          <Grid className="Grid">
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <SortableTbl
                    tblData={props.filters && filterResults.length>0? filterResults: props.results}
                    tHead={tHead}
                    dKey={col}
                    search={false}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
}