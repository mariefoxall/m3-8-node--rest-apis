# Cafe API Architecture Doc

## Details

There's a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He _knows_ that big data is the way to go. He is planning on tracking _everything_ in his cafe.

He needs a RESTful API to serve all of the data that he'll have and gather more! And he's asked a couple of future developers to architect this API for him. He wants to track _everything_ from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

Write out each endpoint, its method, and brief description of what it should do.

| endpoint | method | Description            |
| -------- | ------ | ---------------------- |
| `/test`  | `GET`  | It is a test endpoint. |

_This activity is more about the discussion in how to best organize data endpoints. There will not be any coding._

## Your Answer

| endpoint         | method   | Description                                                            |
| ---------------- | -------- | ---------------------------------------------------------------------- |
| `/stock/`        | `GET`    | list of in-stock items - all                                           |
| `/stock/:id`     | `GET`    | list of in-stock items of type id                                      |
| `/stock/:id`     | `PUT`    | update stock of item when customer makes purchase, or restock comes in |
| `/stock/:id`     | `POST`   | add new item to the roster                                             |
| `/stock/:id`     | `DELETE` | particular item is discontinued                                        |
| `/seating/`      | `GET`    | list of cafe seating - all - includes status (occupied or vacant)      |
| `/seating/:type` | `GET`    | list of cafe seating of specific type (outdoor/indoor/bar)             |
| `/seating/:type` | `PUT`    | update status of seating when customers are seated or table is cleared |
| `/seating/:type` | `POST`   | add new seating - ie in summer when terrasse is expanded               |
| `/seating/:type` | `DELETE` | remove seating - ie terrasse in winter                                 |
| `/customers`     | `GET`    | list of all customers                                                  |
| `/customers`     | `PUT`    | update customer details - contact info, rewards status                 |
| `/customers`     | `POST`   | add new customer                                                       |
| `/customers`     | `DELETE` | remove customer                                                        |
| `/sales`         | `GET`    | list of all sales to date, or for the year                             |
| `/sales`         | `PUT`    | modify a sale (ie in case of refund)                                   |
| `/sales`         | `POST`   | make a new sale, add to the list                                       |
| `/purchases`     | `GET`    | list of all purchases to date or for the year                          |
| `/purchases`     | `PUT`    | modify purchase order in case of error                                 |
| `/purchases`     | `POST`   | create a new purchase order                                            |
| `/purchases`     | `DELETE` | remove an order if reduced need for supplies                           |
| `/payroll`       | `GET`    | list of all employees on payroll                                       |
| `/payroll/:id`   | `GET`    | list of details for particular employee                                |
| `/payroll/:id`   | `PUT`    | update employee's hours worked, changes to hourly wage or benefits     |
| `/payroll/:id`   | `POST`   | add a new hire                                                         |
