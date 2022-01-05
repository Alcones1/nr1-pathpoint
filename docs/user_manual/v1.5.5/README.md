![cambiar](screenshots/logo-pathpoint.png)           
           
                   


New Relic Pathpoint is an enterprise platform tracker that models system health in relation to actual user-impacting the different business stages, and on this documentation you will learn the different concepts of a Pathpoint, as well as how to interact with the Pathpoint configuration, like for example how to tweak the different Touchpoints of a Pathpoint, to better visualize the data you are most interested in tracking.


 ### <a id="Index"></a>Index ###
 

 * [Pathpoint Concepts](#Pathpoint_Concepts)

     *   [Stages](#Stages) 

   *   [Steps](#Steps)

   *   [Touchpoints](#Touchpoints)

* [Pathpoint Configuration](#Pathpoint_Configuration)

   *  [JSON Configuration File](#JSON_Configuration_File)

     

      *[Setting up KPI queries](#Setting_up_KPI_queries)


      *[Setting up Stages & Steps](#Setting_up_Stages_Steps)

   

      * [Touchpoint Types](#Touchpoint_Types)     

         *  [PRC (Used to count people)](#PRC)  

         * [PCC (Process Count)](#PCC)  

         * [APP (Application Health)](#APP)

         * [FRT (Front End Health)](#FRT)

         * [SYN (Synthetic Check)](#SYN)

      *    [Setting up Touchpoints](#Setting_up_Touchpoints)

         	

    *  [App Touchpoint Tuning](#In_App_Tuning) 


         *[Test a Touchpoint](#Test_a_Touchpoint)  

       *[Tune Touchpoint Thresholds](#Tune_Touchpoint_Thresholds)

       *[Disable a Touchpoint](#Disable_a_Touchpoint) 

   *  [Configure Logging](#Configure_Logging)


   *  [Configure Background Jobs](#Configure_Background_Jobs)


       * [Flame Filter Script](#Flame_Filter_Script)


      * [Drop Filter Script](#Drop_Filter_Script)

* [Using Special Filters](#Using_Special_Filters)

   *  [Canary Filter](#Canary_Filter)

   *  [Flame Filter](#Flame_Filter)

   *  [Drop Filter](#Drop_Filter)



### <a id="Pathpoint_Concepts"></a>Pathpoint Concepts ###

Business Journey Observability, is the Customer, Product and Services Paths, including all Internal Processes & External Dependencies, needed to meet a customer’s expectation and or service agreement. Pathpoing is Business Journey Observability.

Pathpoint will work in nearly any New Relic account. And each Pathpoint is divided into; Stages, Steps and Touchpoints.

To get started setting up Pathpoint you'll need some telemetry in the account that you would like to measure. This could be -for instance- any of the following telemetry types: Metrics, Events, Logs and Traces. 

A common starting place for Pathpoint is APM Events and Logs, but this is up to you. The other thing you'll need to know is how this telemetry maps onto the business process you want to model as stages and steps. That may require some internal disucssions with your stakeholders to understand how things really fit in.

When you are ready to make some edits you can simply download the current version of the JSON config that was writen for you, or edit it (if you wish to do so) and re-upload it. Alternatively you can also manually "right click" over each one of the touchpoints you would like to work on, to manually adjust its configuration.



Return to top of [Index](#Index)

### <a id="Stages"></a>Stages ###

Stages are the principal parts of the Journey. They are defined as either a Person or a Process Stage and are design to show the complete health, congestion, count and Infrastructure state of a Pathpoint. 


The different stages of a Pathpoint, will allow you to see the business processes at a high level, and notice how for each commercial stage, different services and methods are presented at the system level. Based on business information, PathPoint previews latency indicators. 

And the information related to a particular stage, including the errors for each one of them, can be viewed on REAL TIME at a high level. 

On the following graphic, you can see that this particular Pathpoint has five stages in process.

![Image](screenshots/stagesb.png)

And on each particular stage we can see first-hand if any of its associated touchpoints are critical, and if this is the case, then the stage will turn yellow. If it stays green, it means that everything is working normally. And if instead the stage turns the color red, it means that all its touchpoints have anomalies, that need to be resolved.


![Image](screenshots/stages4.png)

Please note that under a single Stage you should only count either persons (PRC Touchpoint) or processes (PCC Touchpoint), on the graphic above you can see the symbols for the two types of Stages;  

    A Processes  
    B People

### <a id="Steps"></a>Steps ###

Steps represent the various actions/events occurring throughout the stage. They can be placed in the traditional sequential manner of step 1,2,3.., But also in a parallel form to represent optional and simultaneous actions and activities. 

These are "sub-stages" of a main stage and represent a certain degree of granularity in your services.


- Structure Steps


![image](screenshots/steps3.png)


Where:

Line: Positions the row in which the task is located within the stage.

![image](screenshots/Examples_Line_Step8.png)


* Values: Indicate the parameters for each step. Currently the parameters 1) "Web", "App","Login"  and "Signup" are being considered. 3) Search, Menu, Gift Card, and Rewards aren't being considered.
* Title: Corresponds to the name with which the step is identified.


![image](screenshots/Examples_Title_Step4.png)

* ID: Corresponds to the code that identifies the step in its order within the row that is located. For the example, in line 1 the "Web" step is assigned the order # 1, the "Mobile Web" step has the order # 2 assigned and the "App" step is assigned the order # 3 in its configuration.

![image](screenshots/Examples_ID_Step1.png)




### <a id="Touchpoints"></a>Touchpoints ###

Touchpoints are the more granular entities of the PathPoint model. TouchPoints do behave more like a specific browser application or APM (Application Monitor). The health status of a Touchpoint will be linked to the error rate and latency.

Touchpoints do also hold individual Health, Status, Performance, Count and even Business knowledge of a specific data object, environment, app, device, API or service. Additionally every Touchpoint can be tuned and modified to fit a specific journey’s goal.

And every Step of a Pathpoint is connected to one or more Touchpoints and Every Stage Status is based on the culmination of its respective Touchpoints. The Touchpoint is the pulse of each Pathpoint.

The different types of touchpoints are; PRC, PCC, APC, FRT, and SYN.

* PRC are used to count people
* PCC are used to count processes
* APC are used to see the health of an application
* FRT FRONT END HEALTH????
* SYN are used to assess the health of a Syntethic monitor

Where:

* Title: Corresponds to the name that identifies the touchpoint.


![image](screenshots/TP1.png)

On this example the Touchpoint name is "Chat Throughput (PCC), which is the type of Touchpoint designed to count processes.

* Status "On" or "Off": This option allows you to enable or disable a touchpoint for display mode. To access this view, right click on the particular touchpoint and click on the option "ON/OFF". 

![image](screenshots/Example_status_on_off_TP_1.png)

* Dashboard_url: Corresponds to the link that directs to the Touchpoint dashboard. ASK HOW TO GET THIS LINK

* Related_steps: Indicates the step to which a Touchpoint is associated with a Touchpoint. 

![image](screenshots/Examples_related_steps_TP.png)

For the example, the "Agents (PRC)" Touchpoint is linked to the "Call Pop" Step.

* Queries: Allow you to determine all the parameters that of a particular Touchpoint should consider. 

![image](screenshots/Examples_queries_TP_1.png)
To access this view, you just have to right click on the touchpoint and then click on  "Queries"  

![image](screenshots/touchpoint5.png)

     1 Type: Identify the right type of query. For this example, it is a PRC person count. (please review section "Different Touchpoint Types Explained")
     2 AccountID: Determines the account with which the query is identified.
     3 Query: Displays the actual query that determines the Touchpoint. THE QUERY'S ARE FIRST WRITEN ON THE JSON FILE.
     4 Query_timeout: Determines the maximum time of activity in which the query will be executed.
     5 Min_count: The query will present a minimum of X number of records.
     6 Measure_time: Determines the time from when I want the query to collect information to perform the measurement.

And these are two examples of Touchpoints;

Example 1

![image](screenshots/Example_Touchpoint1.png)

Example 2

![image](screenshots/Example_Touchpoint2.png)





Note, there is a recomendation that when you name a Touchpoint, its name, state the type of Touchpount it is, like for example; VTEX Do API, name it like this; VTEX Do API(PCC), which tells the person looking at the Touchpoint, at a later time, that this is a PCC Touchpoint, intended to count processes.


### <a id="Pathpoint_Configuration"></a>Pathpoint Configuration ###

Pathpoint is configured using a JSON configuration file, which is writen to the needs of your particular business. Once the configuration file is loaded, you can also manually tweek the Touchpoints, for instance to see the data that you are most concern at the moment.

### <a id="JSON_Configuration_File"></a>JSON Configuration File ###

JSON for its acronym (JavaScript Object Notation) is a data structure, whose basic function is to allow for the exchange of information. Through this structure it will be possible to identify each of the elements and components that will facilitate the implementation of Pathpoint, knowing the function of its attributes, queries and data output. To program new stages, path and Pathpoints, you upload a New JSON Configuration file.

![image](screenshots/jsonfile.png)

Uploading a New JSON Config File

Pathpoint offers the possibility to load the configuration file using the following steps;

![imagecambiar](screenshots/Menu_pathpoint.png)

 1 To begin click on the menu at the top left

![image](screenshots/Option_configuration.png)

2 Select the option "JSON Configuration"

![image](screenshots/Option_update.png)

 
3 Now, select "Update"


![image](screenshots/file_location.png)




4 Next, locate the file you want to update on this dialog window that opens up and click on "open"

![image](screenshots/front_pathpoint.png)


5 Finally the Pathpoint is displayed with the latest update loaded.

How to download the Currently Active Config File.

Similarly, Pathpoint offers you the possibility of downloading the current configuration file, if for instance you wish to make changes to it, which can be done using the following steps;

![image](screenshots/Menu_pathpoint1.png)

1 Click on the menu on the top left (once you are on the New Relic Pathpoint  window)

![image](screenshots/Option_configuration2.png)

2 Select the option "JSON Configuration"

![image](screenshots/pathpoint_jason_vx.png)

3 Now, select the file available to download. On this example"Pathpoint_json_vX"

![image](screenshots/downloaded_file.png)

4 Finally the file is downloaded so that you can work on it.

### <a id="Setting_up_KPI_queries"></a>Setting up KPI queries ###

KPI by its acronym (Key Performance Indicator), are normally known as key indicators, which allow you to see the performance of a process. 

In the case of Pathpoint, KPIs fulfill a fundamental function, which is the measurement of specific indicators within a particular process.

- Structure KPI

![image](screenshots/kpi.png)

Where:

Type: Defines the type of measurement to be performed, which can be:
-- "100" returns the current measurement value.
-- "101" returns the current value and compares it with the value of "X" previous days

Name: Corresponds to the long name of the KPI.

ShortName: Corresponds to the short name of the KPI.

![image](screenshots/KPI2.png)

### <a id="Setting_up_Stages_Steps"></a>Setting up Stages & Steps ###

* Measure: The data that allow the measurement to be made is displayed.

* accountID: Corresponds to the number that identifies the measurement performed.

* Query: Corresponds to the query that is used to perform the measurement.

* Link: Corresponds to the link that directs to the KPI dashboard.

![image](screenshots/linkKPI.png)

* Value_type: It can be an integer value "INT" (example: 100) or a decimal value "FLOAT" (example: 100,2).

![image](screenshots/value_type_KPI.png)

* Prefix: It is used in the case in which you want to Identify the KPI by placing a symbol or letter at the beginning of the name. Example: USD 12000

* Suffix: It is used in the case where you want to Identify the KPI by adding a symbol or letter at the end of the name. Example: 5%.

![image](screenshots/prefix_suffix_KPI.png)

* Example KPI

![image](screenshots/Example_KPI.png)

* KPI Pathpoint Image

![image](screenshots/KPI5.png)

![image](screenshots/KPI6.png)




Return to top of [Index](#Index)

### <a id="Touchpoint_Types"></a>Touchpoint Types ### 

As you saw before, New Relic Pathpoint offers different types of Touchpoints, which are adapted according to the needs of each business, and they are; 
* PRC (Person Count)  
* PCC (Process Count)  
* APP (Application Health)  
* FRT (Front End Health)  
* SYN (Synthetic Check)

Now, you will see some examples of each type of touchpoint;

This is an example of a PRC touchpoint;


### <a id="PRC"></a>PRC (Person Count) ### 

![image](screenshots/Example_TP_PRC1.png)


![image](screenshots/Example_TP_PRC2.png)


● Data:

○ User Sessions

● Tunning:

○ Session Count (Min)

● Link: PRC Touchpoint Flashboards

○ Current Sessions

○ Past Sessions

○ Previous Week Comparison


Return to top of [Index](#Index)

This is an example of a PCC touchpoint;


### <a id="PCC"></a>PCC (Process Count) ### 

![image](screenshots/Example_TP_PCC1.png)

![image](screenshots/Example_TP_PCC2.png)

● Data:  
   ○ Transactions

● Tunning:  
   ○ Transactions Count (Min)

● Link: PCC Touchpoint Flashboard  
○ Current Transactions  
○ Past Transactions  
○ Previous Week Comparison

Return to top of [Index](#Index)


This is an example of a APP touchpoint;

### <a id="APP"></a>APP (Application Health) ### 
  
● Data:  
○ Transactions

● Tunning:  
○ APDEX Response (Min)  
○ % Error (Max)  
○ Response Time (Max) 

● Link: APM Transaction Dashboard  
○ APDEX  
○ Throughput  
○ Breakdown  
○ Traces

![image](screenshots/Example_TP_APP1.png)

![image](screenshots/Example_TP_APP2.png)

Return to top of [Index](#Index)

This is an example of a FRT touchpoint;

### <a id="FRT"></a>FRT (Front End Health)  ### 

 
● Data:  
○ Transactions

● Tunning:  
○ APDEX Response (Min)  
○ % Error (Max)  
○ Response Time (Max)  

● Link: Page View Transaction Dashboard  
○ APDEX  
○ Throughput  
○ Breakdown  
○ Traces

![image](screenshots/Example_TP_FRT1.png)

![image](screenshots/Example_TP_FRT2.png)

Return to top of [Index](#Index)

This is an example of a SYN touchpoint;

### <a id="SYN"></a>SYN (Synthetic Check)   ### 

● Data:  
○ Synthetic Monitor Data

● Tunning:  
○ Avg Request Time (Max)  
○ Total Check Time (Max)  
○ % Success Rate (Min)  

● Link: Synthetic Monitor Results Dashboard  
○ Long Running Tasks  
○ Bytes Transferred  
○ Requests  
○ Total Time  
○ Requests Waterfall  

![image](screenshots/Example_TP_SYN1.png)

![image](screenshots/Example_TP_SYN2.png)

Return to top of [Index](#Index)


### <a id="Setting_up_Touchpoints"></a>Setting up Touchpoints ###




Return to top of [Index](#Index)
### <a id="In_App_Tuning"></a>App Touchpoint Tuning ###

This type of Touchpoint has 3 values;

* APDEX Responce (Min)  
* Response time (Max)  
* % Error (Max)






Return to top of [Index](#Index)
### <a id="Test_a_Touchpoint"></a>Test a Touchpoint ###

This is a function that allows you to test the vaility or health of a particular Touchpoint.

![image](screenshots/touch.png)

To beging the process of testing a Touchpoint, right click on it, and then select Queries. On this example I clicked on the Customer credit API (which is a PCC type of Touchpoint), to test this particular Touchpoint..

![image](screenshots/test_touchpoint.png)

Now, on Dialog window that opens up, click on "Test", to test the Touchpoint, now notice on the right the result of the test, on this example, it says; "Succesfully validated", meaning the Touchpoint is correct.

But lets say that you change some part of the given query, for instance to test another aspect of the Touchpoint, now you must test the Touchpoint again.


![image](screenshots/touch_test1.png)

Now, on this screen capture notice how I changed the Query, in front of count(*), I added three 000, and then I clicked on "Test", to test the Touchpoint, you can see the result, on the right; "incorrect validation". So now the query, that was rigth before, is incorrect now. If you test a Touchpoint, and the validation fails, find out why, and fix it.


![image](screenshots/test_pathpoint1.png)


If you chose to change the given Query, test your changes by clicking on "Test", to make sure the Touchpoint is "healthy", if it is, then save them by clicking on "Save/Update" (if not find out what is the issue with the query and fix it), on the right of the same dialog box window, now the Touchpoint window will close, saving the changes you made to the Touchpoint. 


QUERY'S

SYNTHETIC MONITOR QUERY

SELECT filter(percentage(count(result),WHERE result='SUCCESS'),WHERE 1=1) as success, max(duration) as duration, max(longRunningTasksAvgTime) as request from SyntheticCheck,SyntheticRequest WHERE monitorName='BDB Live person'

PCC QUERY

SELECT count(*) from Transaction WHERE appName='QS' AND name='WebTransaction/Action/login'

PRC QUERY

SELECT count(*) as session FROM Public_APICall WHERE awsRegion='us-east-1'

MASTER DATA API QUERY  (FRT)

SELECT filter(apdex(duration, t:1), WHERE 1=1) as apdex, filter( max(duration), WHERE 1=1) as response,filter(percentage(count(*), WHERE error is true), WHERE 1=1) as error from PageView WHERE appName='QS'

Workload (WLD)

SELECT latest(statusValue) as statusValue FROM WorkloadStatus WHERE entity.name='Demotron V2 - Acme Dev'








 




Return to top of [Index](#Index)
### <a id="Tune_Touchpoint_Thresholds"></a>Tune Touchpoint Thresholds ###


LOGIN PEOPLE PRC


Return to top of [Index](#Index)
### <a id="Disable_a_Touchpoint"></a>Disable a Touchpoint ###

You can manually work with a particular Touchpoint, by disabling it, and later on you can also turn it back on.


![image](screenshots/touch.png)

To disable a Touchpoint, right click on it. On this example I clicked on the Customer credit API (which is a PCC type of Touchpoint).

![image](screenshots/touch1.png)

 

Now, on the pop-up window, click on the "On" symbol, to disable the Touchpoint. Later on you can right click on the same Touchpoint, then on the "Off" symbol, to enable it again.


Return to top of [Index](#Index)
### <a id="Configure_Logging"></a>Configure Logging###

![image](screenshots/LOGIN.png)

LOOKING FOR THE SIGN UP WITH MIN AND MAX

Return to top of [Index](#Index)
### <a id="Configure_Background_Jobs"></a>Configure Background Jobs ###


Return to top of [Index](#Index)
### <a id="Flame_Filter_Script"></a>Flame Filter Script ###




Return to top of [Index](#Index)
### <a id="Drop_Filter_Script"></a>Drop Filter Script ###

Drop Touchpoint (DRP)

SELECT latest(statusValue) as statusValue FROM WorkloadStatus WHERE entity.name='ACME Banking'




Return to top of [Index](#Index)
### <a id="Using_Special_Filters"></a>Using Special Filters ###


Return to top of [Index](#Index)
### <a id="Canary_Filter"></a>Canary Filter ###

The Canary filter, when activated, reset all the the different Steps, so that you can manually activate the Steps, which will help you troubleshoot a particular process.

![image](screenshots/canary2.png)


To activate it, just click on the Canary Symbol, which now changes it color, to yellowish. On the Pop Up window that opens up, click on "Continue" to activate this filter.

![image](screenshots/canary3.png)

Now you see that the steps that were previously active, don't show any activity. Please notice that if you are running the Pathpoint background job the signals for non-visible touchpoints will still be available with the Flame view.


Return to top of [Index](#Index)
### <a id="Flame_Filter"></a>Flame Filter ###

The Flame filter will highlight the most problematic “Steps and Touchpoints” with a configurable time window and percentile threshold. The filter will show the worst and percentile of touchpoints. 

![image](screenshots/flame2.png)

To activate it, just click on the Flame Symbol, which now changes it color, to a reddish flame. On the Pop Up window that opens up, click on "Continue" to activate this filter.

![image](screenshots/flame3.png)

This is very useful in situations where things look okay now but may have had a pattern of errors or latency in the recent past. Please not that to use this filter, you will need to install a background script that is downloadable from the Pathpoint Setup Menu.

Return to top of [Index](#Index)

### <a id="Drop_Filter"></a>Drop Filter ###

Function: 

 
Highlights Steps with Most Drops (Session Breaks or Abandonment) 

Displays a Total Drop count per Stage
Calculates the order or transaction loss by the drops


Tunning: 
Avg Order or Transaction Value
Incident %
Time Period

Return to top of [Index](#Index)


This is a test