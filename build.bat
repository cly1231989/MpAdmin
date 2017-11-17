del /q G:\code\html\mp\src\main\resources\static\*
xcopy .\dist\* G:\code\html\mp\src\main\resources\static\ /s /e /y

del /q "D:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps\mp\WEB-INF\classes\static\*"
xcopy .\dist\* "D:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps\mp\WEB-INF\classes\static\" /s /e /y