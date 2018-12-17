# typeSafeJestSpy
Helps you write faster spies by automatically inferring the real implementation's type signature

# Why would you use this?

  * Have you ever made a spy for entirely the wrong function?
  * Have you ever returned bad data from a spy by accident?
    * i.e. you knew that the method you were replacing was supposed to return a string... but you accidentally returned a number?

# How do you use this?
  * Please see the unit tests in the test folder for usage examples

# Aciddental mistakes with spies are a thing of the past!

Simply send your Jest spy into a function of this library and then the following Jest spy functions will require you to return the correct type:
  * `mockImplementation`
  * `mockImplementationOnce`
  * `mockResolvedValue`
  * `mockResolvedValueOnce`

# Caveats
Please see the version of Jest in my package.json to see what this micro-library thinks is the way that Jest behaves. If your version of Jest is wildly different, then

  * you might get irregular behavior.
  * you might find that Jest has introduced a typesafe version itself, in which case this library would no longer be required