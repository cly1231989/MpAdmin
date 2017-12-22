del /q ..\mp\src\main\resources\static\*
xcopy .\dist\*  ..\mp\src\main\resources\static\ /s /e /y

rem del /q "D:\Program Files\Apache Software Foundation\Tomcat 8.5\webapps\mp\WEB-INF\classes\static\*"
rem xcopy .\dist\* "D:\Program Files\Apache Software Foundation\Tomcat 8.5\webapps\mp\WEB-INF\classes\static\" /s /e /y