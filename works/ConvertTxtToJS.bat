ECHO OFF

ECHO.>works.js

ECHO const Works = [>>works.js

@ECHO 
for /f "delims=|" %%f in ('dir /b "./works"') do (
	echo %%f
	echo ^{^file: `%%f^`^,text: ^`^\t>>"./works.js"

	FOR /F "USEBACKQ tokens=*" %%i IN ("./works/%%f") DO @ECHO %%i>>works.js
	echo ^`^}^,>>"./works.js"
)

echo ]>>works.js

"./works.js"
ECHO OFF

ECHO.>works.js

ECHO const Works = [>>works.js

@ECHO 
for /f "delims=|" %%f in ('dir /b "./works"') do (
	echo %%f
	echo ^{^file: `%%f^`^,text: ^`^\t>>"./works.js"

	FOR /F "USEBACKQ tokens=*" %%i IN ("./works/%%f") DO @ECHO %%i>>works.js
	echo ^`^}^,>>"./works.js"
)

echo ]>>works.js

"./works.js"