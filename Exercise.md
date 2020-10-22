Summary: Implement a UI that accesses a backend API to manage bank accounts. The
accounts will support credit facilities.
The UI, should:
● Display a list of the transactions for a single account
○ Fields:
■ Timestamp
■ Action (debit/credit)
■ Description
■ Amount
■ Currency
● Support multiple bank accounts, with a selector on the transaction page for selecting the
account
● Have a simple form with validation, for transferring funds from one account to another
Notes:
● It should be implemented using React
● You can use any tools / dependencies that fit your workflow
● Please take your time, there is no time limit
● Produce a solution that you are happy to be considered ‘nearly’ production quality ○
This means that I'd like to see tests and good quality, clean code that has been
implemented
○ Technical debt is totally acceptable, as long as its reasonably explained
○ Monitoring, operations and deployment elements are not necessary
○ It's fine to provide a stub/simulator for the backend API
● You should provide a simple, runnable way to view a working example ○ I.e. a
README.md with instructions similar to the below is acceptable:
■ Run npm install in the repository
■ Run npm run start_server in one terminal
■ Then npm run start_cypress_tests in another terminal
■ Control-c once finished
○ Instructions along the lines of the below, will be an instant fail:
■ Download mysql
■ Download these 3rdparty dependencies
■ Then change these variables in an environment.ts file
■ Then point your browser at localhost:3000, goto x,y,z
Delivery: As a link to a github repository