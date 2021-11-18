/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
// Insert API Credentials
const myAccountID = 1606862;
const graphQLKey = 'NRAK-JT2K33ZJ9QPB2LFIPJ222D0MPFG';
const myInsertKey = '4358371303b443fa593950545136442e7e7008c4';
const touchpoints = [
  [
    {
      stage_index: 1,
      touchpoint_index: 1,
      type: 'PRC',
      timeout: 10,
      query: "SELECT count(*) as session FROM Public_APICall WHERE awsRegion='queue'",
      min_count: 10,
      measure_time: '15 minutes ago'
    },
    {
      stage_index: 1,
      touchpoint_index: 2,
      type: 'APP',
      timeout: 10,
      query: "SELECT filter(apdex(duration, t:0.028), WHERE 1=1) as apdex, filter( max(duration), WHERE 1=1) as response,filter(percentage(count(*), WHERE error is true), WHERE 1=1) as error from Transaction",
      min_apdex: 0.4,
      max_response_time: 0.5,
      max_error_percentage: 5,
      measure_time: '5 minutes ago'
    }
  ],
  [
    {
      stage_index: 1,
      touchpoint_index: 3,
      type: 'FRT',
      timeout: 10,
      query: "SELECT filter(apdex(duration, t:1), WHERE 1=1) as apdex, filter( max(duration), WHERE 1=1) as response,filter(percentage(count(*), WHERE error is true), WHERE 1=1) as error from PageView",
      min_apdex: 0.6,
      max_response_time: 1.2,
      max_error_percentage: 5,
      measure_time: '5 minutes ago'
    },
    {
      stage_index: 1,
      touchpoint_index: 4,
      type: 'SYN',
      timeout: 10,
      query: "SELECT filter(percentage(count(result),WHERE result='SUCCESS'),WHERE 1=1) as success, max(duration) as duration, max(longRunningTasksAvgTime) as request from SyntheticCheck,SyntheticRequest WHERE monitorName='Register Account'",
      max_avg_response_time: 0.7,
      max_total_check_time: 1.25,
      min_success_percentage: 98,
      measure_time: '3 hours ago'
    }
  ]
];

const graphQLdata = [];

touchpoints.forEach( tp_group => {
  let data = `{ actor { `;
  tp_group.forEach( tp =>{
    data += `measure_${tp.stage_index}_${tp.touchpoint_index}: account(id: ${myAccountID}) { nrql(query: "${tp.query} SINCE ${tp.measure_time}", timeout:${tp.timeout}) {results}} `;
  });
  data +=`}}`;
  const gql = { query: data , variables: ''};
  graphQLdata.push(gql);
});

graphQLdata.forEach( gql =>{
  const raw = JSON.stringify(gql);
  const graphqlpack = {
    headers: {
        "Content-Type": "application/json",
        "API-Key": graphQLKey
    },
    url: 'https://api.newrelic.com/graphql',
    body: raw
  };
  console.log(raw);
  $http.post(graphqlpack, callback);
});


const responses = [];
let totalResponses = 0;
function callback(err, response, body) {
  const results = JSON.parse(body);
  responses.push(results);
  totalResponses++;
  console.log('Responses:',totalResponses);
  if (totalResponses === graphQLdata.length){
    ProcessData();
  }
}

function ProcessData() {
  console.log('Processing Responses...');
  const events = [];
  let event = null;
  let c = null;
  let stage_index = 0;
  let touchpoint_index = 0;
  responses.forEach( response =>{
    for (const [key, value] of Object.entries(response.data.actor)) {
      c = key.split("_");
      if (value.nrql && value.nrql.results && value.nrql.results != null) {
        stage_index = parseInt(c[1]);
        touchpoint_index = parseInt(c[2]);
        event = MakeEvent(value.nrql.results[0],stage_index,touchpoint_index);
        console.log(event);
        events.push(event);
      }
    }
  });
  const raw = JSON.stringify(events);
  const options = {
        url: "https://insights-collector.newrelic.com/v1/accounts/" + myAccountID + "/events",
        body: raw,
        headers: {
            'X-Insert-Key': myInsertKey,
            'Content-Type': 'application/json'
        }
    };
    $http.post(options, function (error, response, body) {
        console.log('Ingestionresponse code: ',response.statusCode);
        const info = JSON.parse(body);
        console.log(info);
    });
}

function MakeEvent(results,stage_index,touchpoint_index) {
  console.log('MakeEvent:',results,stage_index,touchpoint_index);
    const tp = GetTouchpoint(stage_index,touchpoint_index);
    let error = true;
    switch (tp.type) {
      case 'PRC':
        if (Object.prototype.hasOwnProperty.call(results,'session')){
          error =  results.session < tp.min_count;
        }
        break;
      case 'PCC':
        if (Object.prototype.hasOwnProperty.call(results,'count')){
          error = results.count < tp.min_count;
        }
        break;
      case 'APP':
      case 'FRT':
        if (Object.prototype.hasOwnProperty.call(results,'apdex') &&
          Object.prototype.hasOwnProperty.call(results,'score') &&
          Object.prototype.hasOwnProperty.call(results,'response') &&
          Object.prototype.hasOwnProperty.call(results,'error')
        ) {
          error = results.error > tp.max_error_percentage || results.score < tp.min_apdex || results.response > tp.max_response_time;
        }
        break;
      case 'SYN':
        if (Object.prototype.hasOwnProperty.call(results,'success') &&
        Object.prototype.hasOwnProperty.call(results,'duration') &&
        Object.prototype.hasOwnProperty.call(results,'request')
        ) {
          error = results.success < tp.min_success_percentage || results.request > tp.max_avg_response_time || results.duration > tp.max_total_check_time;
        }
        break;
    }
    return {
      eventType: 'PathpointHistoricErrors',
      stage_index: stage_index,
      touchpoint_index: touchpoint_index,
      error: error
    };
}

function GetTouchpoint(stage_index,touchpoint_index){
  let touchpoint = null;
  touchpoints.some( tp =>{
    let found = false;
    if (tp.stage_index === stage_index && tp.touchpoint_index === touchpoint_index) {
      console.log('Encontre_el_TP:',stage_index,touchpoint_index)
      touchpoint = tp;
      found = true;
    }
    return found;
  });
  return touchpoint;
}

