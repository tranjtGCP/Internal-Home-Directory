# Test Plan
The database uses PyTest to run automated testing on the database IO functions. These tests are designed to stress the various functions that access the database and attempt every input that could be provided. It is important to test for eronious inputs so that errors can be handled appropriately at runtime. PyTest is also used to generate a large (~6,700 item) test dataset that can be used for performance testing and responsiveness. 

# Tests Output
