







# 数据校验

## Common Practices

As a web application developer, there are several ways to verify and examine the user input to ensure its validity and security. Here are some common practices:

1. Input Validation: Implement server-side input validation to check the format, length, and type of user input. Use regular expressions or libraries to validate input against expected patterns and data types. This helps to prevent common security vulnerabilities like SQL injection, cross-site scripting (XSS), and code injection attacks.

2. Sanitization: Sanitize user input by removing or encoding any potentially malicious characters, such as HTML tags or special characters. This prevents the execution of malicious scripts and helps mitigate XSS attacks.

3. Parameterized Queries: When interacting with databases, use parameterized queries or prepared statements to prevent SQL injection attacks. This technique ensures that user input is treated as data rather than executable code.

4. Whitelist Input: Implement a whitelist approach by defining the allowed characters, formats, or values for each input field. Reject any input that does not match the expected criteria.

5. Implement CAPTCHA: Use CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) to verify that the user is a human and not a malicious automated script or bot. CAPTCHA challenges users with tasks that are difficult for machines to solve but relatively easy for humans.

6. Rate Limiting: Implement rate limiting mechanisms to prevent brute force attacks or excessive requests from a single user or IP address.

7. Input Encoding: Ensure proper input encoding and decoding to handle special characters or Unicode input correctly. Avoid using deprecated or unsafe encoding methods that can lead to security vulnerabilities like double encoding or improper decoding.

8. Regular Security Audits: Regularly perform security audits and penetration testing to identify any vulnerabilities or weaknesses in the input validation process. Stay updated with the latest security best practices and standards.

Remember, input validation and security is not a one-time task but an ongoing process. Always validate and sanitize user input on the server-side, even if there are client-side validations in place.



## Mandatory vs Optional

In a web application, some data fields may be mandatory, while others may be optional. The mandatory fields are essential for the proper functioning or completion of a certain task, while optional fields provide additional information or customization options for the user.

When designing a web form or input interface, it's important to differentiate between mandatory and optional fields and clearly communicate this to the user. Mandatory fields typically require user input to proceed, while optional fields can be left blank if the user chooses not to provide additional information.

Here are some considerations when handling mandatory and optional data:

1. Mandatory Fields:
   - Clearly indicate which fields are mandatory with asterisks (*) or other visual cues.
   - Implement server-side validation to ensure that mandatory fields are not left empty and contain valid data.
   - Prompt the user to fill in missing mandatory fields before submitting the form or proceeding.
   - Display clear error messages if mandatory fields are not completed, explaining the reason for the error and how to rectify it.

2. Optional Fields:
   - Clearly label optional fields to differentiate them from mandatory fields.
   - Allow users to skip optional fields if they do not wish to provide additional information.
   - Validate optional fields if they are filled in, ensuring they contain valid data.
   - Consider providing tooltips or help icons to explain the purpose or benefits of filling in optional fields.

By properly handling mandatory and optional data, you can improve the user experience and ensure that essential information is captured while allowing users the flexibility to provide additional details if they choose to do so.







# Troubleshooting



## 找不到main入口





## 找不到依赖包











## cli行参数问题

在使用`java -jar`命令执行可执行的JAR文件时，如果需要使用`-D`参数设置系统属性，确实需要将`-D`参数放在`-jar`选项之前。因为`-D`参数用于设置Java虚拟机（JVM）的系统属性，在执行JAR文件之前，JVM已经开始启动。因此，如果将`-D`参数放在`-jar`选项之后，JVM已经启动并配置好了系统属性，而您设置的`-D`参数将不会生效。

```shell
java -DinputPath=/Users/luoran/Downloads/input.json -jar mortgage-calculator-cli-jar-with-dependencies.jar
```

