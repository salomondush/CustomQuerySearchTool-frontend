
import 'semantic-ui-css/semantic.min.css'
import { Grid, Container, Segment, Form, Dropdown, Button } from 'semantic-ui-react'
// import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import React, { useEffect } from 'react'
import {
    TimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';


function convertDDMMYYYYtoYYYYMMDD(date){
    var dateArray = date.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
} 


export default function SearchQuery(props){

    const [ restuarantIds, setRestuarantIds ] = React.useState([]);
    const [ dateRange, setDateRange ] = React.useState("");
    const [ timeRange, setTimeRange ] = React.useState({
        start: 0,
        end: 0
    });
    const [ metric, setMetric ] = React.useState("");
    const [ measure, setMeasure ] = React.useState("");
    const [ numericValue, setNumericValue ] = React.useState(0);
    const [ metricDefinitions, setMetricDefinitions ] = React.useState([]);

    const [ metricCriteria, setMetricCriteria ] = React.useState(["salomon"]);

    const restaurantIdOptions = [
        { key: '1', text: '1', value: '1' },
        { key: '2', text: '2', value: '2' },
        { key: '3', text: '3', value: '3' },
        { key: '4', text: '4', value: '4' },
        { key: '5', text: '5', value: '5' },
        { key: '6', text: '6', value: '6' },
        { key: '7', text: '7', value: '7' },
        { key: '8', text: '8', value: '8' },

    ]
   

    async function getMetricDefinitions(url = ""){

        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",  
        })

        return await response.json();
    }

    useEffect(() => {
        getMetricDefinitions("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
        .then(data => {
            setMetricDefinitions(data);
            console.log(metricDefinitions);
        }).catch(err => {
            console.log("Error: ", err);
        });
    }, []);


    async function handleSubmit(){
        var dateRanges = dateRange.split(" - ");

        const query = {
            "restuarantIds": restuarantIds,
            "fromDate": dateRanges[0] && (new Date(convertDDMMYYYYtoYYYYMMDD(dateRanges[0]))).toISOString(),
            "toDate": dateRanges[0] && (new Date(convertDDMMYYYYtoYYYYMMDD(dateRanges[0]))).toISOString(),
            "fromHour": timeRange.start,
            "toHour": timeRange.end,
            "metricCriteria": [
                {
                    "metricCode": metric,
                    "compareType": measure,
                    "value": numericValue
                }
            ]
        }

        const response = await fetch("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", {
            method: "POST",
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json'
            },
            cache: "no-cache",  
        })

        const data = await response.json();
        console.log(data);
    }
    

    return (
        <div className="SearchQuery">
            <Grid className="Grid">
                <Grid.Row>
                    <Grid.Column>
                        <Container>
                            <Segment>
                                <Form onSubmit={handleSubmit}>
                                <div class="ui grid">
                                   <div class="two column row">
                                        <div class="column">
                                            <Form.Field>
                                                <label>Restaurant Id</label>
                                                <Dropdown
                                                    options={restaurantIdOptions}
                                                    multiple
                                                    selection
                                                    placeholder='Select Restuarant Id'
                                                    value={restuarantIds}
                                                    onChange={(e, { value }) => setRestuarantIds(value)}
                                                >
                                                </Dropdown>
                                            </Form.Field>
                                        </div>
                                        {/* <Form.Field onClick={()=>setOpen(!open)}>
                                            <label>Date Range</label>
                                            <div class="ui fluid icon input">
                                                <input type="text" placeholder="Select Date Range" value={`${dateRange.startDate} to ${dateRange.endDate}`}/>
                                                { open? <i class="sort up icon"></i>: <i class="sort down icon"></i>}
                                            </div>
                                        </Form.Field>
                                        
                                        <Form.Field>
                                            <DateRangePicker
                                                open={open}
                                                onChange={ range => setDateRange(range) }
                                            />
                                        </Form.Field> */}
                                        <div class="column">
                                            <Form.Field>  
                                                <label>Date Range</label>
                                                <DatesRangeInput
                                                    name="datesRange"
                                                    placeholder="From - To"
                                                    value={dateRange}
                                                    iconPosition="left"
                                                    onChange={(e, { value }) => setDateRange(value)}
                                                />
                                            </Form.Field>
                                        </div>
                                    </div>
                                </div>
                                    <Form.Field>
                                        <label>Time Range</label>
                                        <div class="ui grid">
                                            <div class="two column row">
                                                <div class="column">
                                                    <TimeInput
                                                        name="startTime"
                                                        placeholder="Start"
                                                        value={timeRange.start}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: parseInt(value.split(":")[0]), end: timeRange.end})}
                                                    />
                                                </div>
                                                <div class="column">
                                                    <TimeInput
                                                        name="endTime"
                                                        placeholder="End"
                                                        value={timeRange.end}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: timeRange.start, end: parseInt(value.split(":")[0])})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Metric Selector</label>
                                        <div class="ui grid">
                                            <div class="three column row">
                                                <div class="column">
                                                    <Dropdown
                                                        options={metricDefinitions.map((m, index) => {
                                                            return {
                                                                key: index,
                                                                text: m.alias,
                                                                value: m.metricCode
                                                            }
                                                        })}
                                                        selection
                                                        placeholder='Select Metric'
                                                        value={metric}
                                                        onChange={(e, { value }) => setMetric(value)}
                                                    />
                                                </div>
                                                <div class="column">
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
                                                        value={measure}
                                                        onChange={(e, { value }) => setMeasure(value)}
                                                    />
                                                </div>
                                                <div class="column">
                                                    <div class="ui input">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Numeric Value" 
                                                            value={numericValue} 
                                                            onChange={(e) => setNumericValue(parseInt(e.target.value) || 0)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <div>
                                            
                                        {metricCriteria.map( c=> {
                                            return <p> {c} </p>
                                        })}
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button type="button" onClick={(event, data) =>  {
                                            setMetricCriteria([...metricCriteria, "new thing"])
                                        }}>Add Criterai</Button>
                                    </Form.Field>
                                    <div class="ui centered grid">
                                        <Button type="submit" positive>Submit</Button>
                                    </div>

                                </Form>
                            </Segment>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}