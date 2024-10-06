# PDF Password Remover

This is a web-based tool for removing passwords from encrypted PDF files. It consists of two components: a frontend built with Angular and a backend built with Flask.

## Live Application
https://angular-pdf-pr-master.onrender.com/ you can test the application by visiting to this link.  

## Features

- Remove passwords from encrypted PDF files.
- User-friendly web interface.
- Secure and efficient PDF password removal.

## Frontend (password-remover-for-pdf)

The frontend is built using Angular.

### Installation

1. Clone the repository:
2. Install dependencies:
3. Start the development server:
4. Access the application at `http://localhost:4200` in your web browser.

### Usage
1. Visit the application in your web browser.
2. Upload an encrypted PDF file.
3. Click the "Remove Password" button.
4. Enter the password of the pdf.
5. Download the PDF file without the password.

## Backend (pdf-password_remover_backend)

The backend is built using Flask.  https://github.com/otaku0304/PDF_Password_Remover_Flask

### Installation

1. Clone the repository:
2. Install dependencies:
3. Start the Flask server:
4. Access the flask application at http://127.0.0.1:5000 in your web browser.
   
### API Endpoints

#### `/remove_password` - POST request to remove the password from a PDF file.

This endpoint allows you to remove the password from an encrypted PDF file. To use this endpoint, follow these steps:

- **HTTP Method:** POST

- **Request Headers:** None required.

- **Request Body:** The request body should be of type `multipart/form-data` and should include the following fields:

  - `password` (string): The password required to decrypt the PDF file.
  - `pdfFile` (file): The encrypted PDF file you want to remove the password from.

  To send the request using tools like `curl` or Postman, ensure that you select the `multipart/form-data` option and include the `password` and `pdffile` keys accordingly.

## Contact

If you have any questions or suggestions, please feel free to [contact me](https://linktr.ee/MR_ASK_Chay).


