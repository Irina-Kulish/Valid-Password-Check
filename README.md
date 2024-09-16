# Password Validator App

This is a simple React application that allows users to upload a file with password policies and check the number of valid passwords according to the given rules.

## Features

- **File Upload**: Users can upload a file containing password policies and passwords.
- **Validation**: The app validates passwords based on the policies provided in the uploaded file.
- **Error Handling**: If no file is uploaded, the user will see an error message.
- **Real-Time Feedback**: After validation, the number of valid passwords is displayed.

## How It Works:

Upload File: The user uploads a file that contains password policies and passwords in the format: letter min-max: password. For example:
```
a 1-3: abcde
z 2-5: zzxxz
```



Validation: After the file is uploaded, the app checks if the passwords comply with the specified policy (whether the required letter appears within the allowed number of times).
Result: The number of valid passwords is displayed.