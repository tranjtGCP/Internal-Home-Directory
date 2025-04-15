# Test Plan
The database uses PyTest to run automated testing on the database IO functions. These tests are designed to stress the various functions that access the database and attempt every input that could be provided. It is important to test for eronious inputs so that errors can be handled appropriately at runtime. PyTest is also used to generate a large (~6,700 item) test dataset that can be used for performance testing and responsiveness. 

# Tests Output
Testing Ouput:
![image](https://github.com/user-attachments/assets/caa2d43a-a743-4953-bffe-c29711e7d23c)

Sample Database:
![image](https://github.com/user-attachments/assets/8e61b6c0-8cfd-4408-a503-91b563096b8c)
