# DUS Form Generator

A Form Generator App _(developed for DUS)_ to populate PDF/DOCX forms with some specific data from **Google Sheets** as well as from some fields of the application.

For now, there are 3 fixed PDF forms added by default:

- SRP Plan Review Request 2016.pdf
- SRP Plan Submital.docx
- SWG Submittal Packet 2016.pdf

There's option to **upload new PDF/DOCX forms** on demand. If the DOCX/PDF is configured with proper mapping, this application will generate the filled forms properly. The placeholders are given below:-

| DOCX Mapping          | PDF Mapping         | Description                                                                        |
| --------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| {currentDate}         | currentDate         | To Populate Current Date in this Format: July 20, 2023                             |
| {clientEmail}         | clientEmail         | To Populate 'Email Address' from Google Sheets                                     |
| {projectName}         | projectName         | To Populate 'Name of the Project' from Google Sheets                               |
| {projectAddress}      | projectAddress      | To Populate 'Address of the Project' from Google Sheets                            |
| {projectCityStateZip} | projectCityStateZip | To Populate 'Address of the Project City, State, & Zip Code' from Google Sheets    |
| {apn}                 | apn                 | To Populate 'APN' from Google Sheets                                               |
| {companyName}         | companyName         | To Populate 'Company Name' from Google Sheets                                      |
| {companyAddress}      | companyAddress      | To Populate 'Company Address' from Google Sheets                                   |
| {companyCityStateZip} | companyCityStateZip | To Populate 'Company Address City, State, & Zip Code' from Google Sheets           |
| {signatoryName}       | signatoryName       | To Populate 'Official Signatory’s Name' from Google Sheets                         |
| {signatoryTitle}      | signatoryTitle      | To Populate 'Signatory’s Title' from Google Sheets                                 |
| {signatoryPhone}      | signatoryPhone      | To Populate 'Signatory's Phone Number' from Google Sheets                          |
| {signatoryEmail}      | signatoryEmail      | To Populate 'Signatory's Email' from Google Sheets                                 |
| {siteLLC}             | siteLLC             | To Populate 'Site Specific LLC' from Google Sheets                                 |
| {siteLLCAddress}      | siteLLCAddress      | To Populate 'Site Specific LLC Address' from Google Sheets                         |
| {siteLLCCityStateZip} | siteLLCCityStateZip | To Populate 'Site Specific LLC Address City, State, & Zip Code' from Google Sheets |
| {job}                 | job                 | To Populate 'DUS Job #' from Input from the Application                            |
| {municipality}        | municipality        | To Populate 'Municipality' from Input from the Application                         |

For DOCX files, we just need to place these words to the required places where we want to map the values. For PDF files, we need to stamp these words to proper fields by following these steps: Open PDF with **Adobe Reader** -> Click on **More Tools** (from Right Tab) -> Click on **Prepare Form** (under **Create & Edit** Tab) -> Double click on the desired field -> Change **Name** and **Tooltip** fields to proper placeholder words mentioned above.

There's also an option to **remove existing PDF/DOCX forms**, however at least one form template should always be present.

There's an internal **File Remover Scheduler** to remove the obsolete files _(removed by users or downloaded ones)_ after every 7 days.

Proper validations, exception handlings, success/error notifications are also implemented.

## Used Technologies

- Node.js (16.14.2)
- NPM (8.5.0)
- Express
- React

## Env Variables

To run the app locally, consider the following properties to add them in .env:

```
NODE_ENV = development
HOST = localhost
PORT = <PORT>
REQUIRED_API_KEY = <AUTH_API_KEY>
GOOGLE_SPREADSHEET_CREDS = <GCP_SERVICE_CREDS_FILE_PATH>
GOOGLE_SPREADSHEET_ID = <GOOGLE_SPREADSHEET_ID>
GOOGLE_SPREADSHEET_FORM_RESPONSES_TAB = <GOOGLE_SPREADSHEET_TAB_NAME>
FORM_UPLOADS_PATH=./uploads
FORM_TRASH_PATH=./trash
FORM_DOWNLOADS_PATH=./downloads

```

## How to Run

- Install `NPM (8.5.0)` and `Node.js (16.14.2)`
- Install `pm2` using: `npm install -g pm2`
- Create **downloads** and **trash** folders under project's root directory
- Run the following commands:

```
git clone -b develop https://github.com/TahsinAnwarAkif/dus-form-generator
npm install
cd frontend
npm install --legacy-peer-deps
cd ..
```

- Generate and add a **google-sheets-creds.json** file inside _<project_dir>_ with Google Sheet enabled services
- Add a .env file inside _<project_dir>_ with the mentioned environment variables
- Sample .env file contents are given below:

```
NODE_ENV = development
HOST = localhost
PORT = 5000
REQUIRED_API_KEY = test
GOOGLE_SPREADSHEET_CREDS = google-sheets-creds.json
GOOGLE_SPREADSHEET_ID = 1HN_fIPuRYSq7SfNEkAE-a7qXIfNRVUS5ZlJb_JW96sw
GOOGLE_SPREADSHEET_FORM_RESPONSES_TAB = Form Responses 1
FORM_UPLOADS_PATH=./uploads
FORM_TRASH_PATH=./trash
FORM_DOWNLOADS_PATH=./downloads
```

- Add a .env file inside _<project_dir>/frontend_ with the mentioned environment variables
- Sample .env file contents are given below:

```
REACT_APP_REQUIRED_API_KEY = test
REACT_APP_FORM_DOWNLOADS_PATH=./downloads
```

- Run the following command to start application in background:

```
pm2 start --name dus-form-generator "npm run dev"
```

- Stop the application running in background by this command:

```
pm2 stop dus-form-generator
```

- Logs will be kept in _/home/.pm2/logs/\*.log_ files

- Logs can also be viewed by this command:

```
pm2 logs dus-form-generator
```

- Run the following command to start application in development mode in non-background mode:

```
npm run dev
```

## Documentation

> Postman API Documentation: [here](https://documenter.getpostman.com/view/2647947/2s946k5q2B)
