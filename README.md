This is an online railway reservation system project developed with [React](https://reactjs.org/), [`Next.js`](https://nextjs.org/) and deployed to the cloud through Vercel.

Click here [`smart-rails-web`](https://smart-rails-web.vercel.app/) to view the deployed version.

Admin login details
(email: admin@yahoo.com &nbsp; password: 123456)

## Getting Started

To run the project on your local machine;

First, install the package dependencies:

```bash
npm install
```

make sure the [smart-rails-server](https://github.com/Koscee/smartRails-server) is running on your local machine (at port 8000)

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## System Design

Each registered user have a role which represent their level of access to resources in the system. These roles include USER, ADMIN, and SUPER_ADMIN.

- USER - This is the default role, users with this role can search for trains available to travel on a given date, view their profile details, manage passengers,view tickets, book tickets, and cancel their bookings.

- ADMIN - This is the "basic admin" role, users with this role have more access than users with the USER role. In addition to the operations of the USER role, they can also view all stations, routes, trains, train service types, schedules, bookings, and passengers in the system.

- SUPER_ADMIN - This is the role with the highest privilege, users with this role have access to all resources in the system. They can perform all CRUD operations on every modules in the system. Their duty is to manage and maintain the entire system.

### Modules Overview

![system-modules](https://t24434348.p.clickup-attachments.com/t24434348/c18a7cd6-1648-4b61-81ca-19f4ed193df7/system%20modules.png)

### Usecase Diagram

![usecase-diagram](https://t24434348.p.clickup-attachments.com/t24434348/01dd101f-79b8-43a6-8215-d197fe6290ef/usecase%20diagram.png)

### Workflow

![system-workflow](https://t24434348.p.clickup-attachments.com/t24434348/c1659ff3-beff-4e4a-a12c-fed49120f941/system%20workflow.png)

## Pages Screenshots

### Admin Module:

- #### Dashboard
  ![admin-dashboard](https://t24434348.p.clickup-attachments.com/t24434348/5fb9eacc-74b3-4fb8-b3f0-c715c7677044/image.png)
- #### Station Management

  ![stations-list-page](https://t24434348.p.clickup-attachments.com/t24434348/83fc96de-7d2e-4965-aa18-b8ef06484ec6/image.png)

  ![update-station-page](https://t24434348.p.clickup-attachments.com/t24434348/d1c7b9ba-f586-4468-b9ec-cb139a503e9f/image.png)

- #### Train Management

  ![trains-list-page](https://t24434348.p.clickup-attachments.com/t24434348/3c99c67e-d6ae-49fa-996c-08ad745b4f8d/image.png)

  ![update-train-page](https://t24434348.p.clickup-attachments.com/t24434348/981ab690-98f8-4cab-a196-95cb90d75aa9/image.png)

- #### Schedule Management

  ![train-schedules-list-page](https://t24434348.p.clickup-attachments.com/t24434348/85759515-2101-481d-85aa-3bf0c6fb0192/schedules-list.jpeg)

- #### Booking Management

  ![bookings-list-page](https://t24434348.p.clickup-attachments.com/t24434348/f820a64b-28bb-47d1-905e-2890da60cd6e/image.png)

  ![booking-details-page](https://t24434348.p.clickup-attachments.com/t24434348/44794f54-2296-4ad2-9729-ab99f6b6b5a7/image.png)

#

### User Module:

- #### Home Page
  ![home-page](https://t24434348.p.clickup-attachments.com/t24434348/7258b492-a50e-486e-ad14-9d516dbeb490/image.png)
- #### Register
  ![register-page](https://t24434348.p.clickup-attachments.com/t24434348/8f3446e1-f17b-44a4-a56b-d7591b8b9218/image.png)
- #### Login
  ![login-page](https://t24434348.p.clickup-attachments.com/t24434348/9c3bb237-ac38-448b-85d9-fdfbf4862381/image.png)
- #### Search Train
  ![search-train-page](https://t24434348.p.clickup-attachments.com/t24434348/7b16a9d8-2b22-472f-ac06-d46591dee03e/image.png)
- #### Passenger Management
  ![passenger-management-page](https://t24434348.p.clickup-attachments.com/t24434348/0f6567c6-9f6e-4bb0-89ad-bda65998bb80/image.png)
- #### Book Ticket

  ![book-ticket-page](https://t24434348.p.clickup-attachments.com/t24434348/c5688e59-99c5-41de-a7bf-37b79a14c13c/image.png)

  ![payment-page](https://t24434348.p.clickup-attachments.com/t24434348/b5079680-6acf-4b79-9388-0d62c10d8a99/image.png)

  ![payment-success-page](https://t24434348.p.clickup-attachments.com/t24434348/426c568f-7635-4f6e-8ad0-b3665b90e1c7/image.png)

  ![ticket-display-page](https://t24434348.p.clickup-attachments.com/t24434348/0ae8da25-5574-416e-9818-6dec9932d077/image.png)

- #### View Bookings
  ![user-bookings-page](https://t24434348.p.clickup-attachments.com/t24434348/321f7bf5-6dac-4d93-ac50-180cddbf1fae/image.png)
- #### Cancel Booking
  ![cancel-booking-page](https://t24434348.p.clickup-attachments.com/t24434348/1043de64-0516-4d77-ad64-512151e072c2/image.png)
