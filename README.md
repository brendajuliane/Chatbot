<h1 align="center">
  <br>
  ChatBot
  <br>
</h1>
<p align="center"> Made with NodeJS and WPPConnect </p>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://github.com/brendajuliane/Chatbot/blob/main/chatbot.png)


## How To Use

You'll need:
  - Git
  - NodeJS
  - Google Sheets Credentials

First, clone this repository and install the required dependences:

```bash
# Clone this repository
$ git clone https://github.com/brendajuliane/MemoryGame.git

# Install dependences
$ npm i

```
After this step, you'll need credentials to use the Google Sheets API. You can get it following the steps:
1. Create a Google Cloud Platform project:
    - Go to the Google Cloud Console and create a new project.
    - Enable the Google Sheets API for your project.
2. Create Service Account Credentials:
    -  Go to the "Credentials" section in your project dashboard.
    - Create a new service account and download the credentials file.

After that, place the generated credentials into the 'sheetsCredentials.json' file, located in the 'config' folder. You'll also need to create a spreadsheet and get its ID. Then, change the information in 'sheetsController':

- const spreadsheetId = 'sheetsID';
- const sheetName = 'name';


## License

MIT

---



