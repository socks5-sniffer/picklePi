import { DictionaryEntry } from '../types';

export const dictionary: DictionaryEntry[] = [
  // Python Terms
  {
    term: 'Library',
    category: 'Python',
    definition: 'A collection of pre-written code that provides reusable functions and classes. You import a library to use its functionality instead of writing everything from scratch.',
    example: 'gpiozero is a library for controlling Raspberry Pi GPIO pins.'
  },
  {
    term: 'Import',
    category: 'Python',
    definition: 'The keyword used to load a library or module into your Python script so you can use its functions.',
    example: 'from gpiozero import LED'
  },
  {
    term: 'Exception',
    category: 'Python',
    definition: 'An error that occurs during program execution. You can "catch" exceptions using try/except blocks to handle errors gracefully.',
    example: 'KeyboardInterrupt is raised when you press Ctrl+C'
  },
  {
    term: 'Function',
    category: 'Python',
    definition: 'A reusable block of code that performs a specific task. You define it once and can call it many times.',
    example: 'def blink_led(): led.blink()'
  },
  {
    term: 'Class',
    category: 'Python',
    definition: 'A template for creating objects. It defines properties and methods that the object will have.',
    example: 'LED is a class; led = LED(17) creates an LED object'
  },
  {
    term: 'Object',
    category: 'Python',
    definition: 'An instance of a class. A specific thing created from a blueprint.',
    example: 'status_led = LED(17) creates an LED object'
  },
  {
    term: 'Method',
    category: 'Python',
    definition: 'A function that belongs to an object or class. You call it using dot notation.',
    example: 'led.blink() is a method of the LED class'
  },
  {
    term: 'Callback',
    category: 'Python',
    definition: 'A function that gets called automatically when a specific event happens.',
    example: 'button.when_pressed = turn_on_led registers a callback'
  },
  {
    term: 'Loop',
    category: 'Python',
    definition: 'A block of code that repeats. Common types are "for" loops (fixed times) and "while" loops (while a condition is true).',
    example: 'for i in range(10): print(i) prints 0 through 9'
  },
  {
    term: 'Variable',
    category: 'Python',
    definition: 'A named container that stores a value. You can change what is stored in it.',
    example: 'led_on = True stores a boolean value'
  },
  {
    term: 'Boolean',
    category: 'Python',
    definition: 'A data type that can only be True or False.',
    example: 'button.is_pressed returns a boolean'
  },
  {
    term: 'String',
    category: 'Python',
    definition: 'Text data enclosed in quotes. Used for storing and manipulating text.',
    example: '"Hello, Pi!" is a string'
  },
  {
    term: 'F-string',
    category: 'Python',
    definition: 'A formatted string that lets you insert variable values directly into text using {variable_name}.',
    example: 'f"The count is {counter}" inserts the counter value'
  },
  {
    term: 'List',
    category: 'Python',
    definition: 'An ordered collection of items. You can access items by index (position).',
    example: '[\'C4\', \'D4\', \'E4\'] is a list of musical notes'
  },
  {
    term: 'Dictionary',
    category: 'Python',
    definition: 'A collection of key-value pairs. You access values using their keys instead of positions.',
    example: '{\'name\': \'LED\', \'pin\': 17} is a dictionary'
  },
  {
    term: 'Integer',
    category: 'Python',
    definition: 'A whole number with no decimal point. Can be positive, negative, or zero.',
    example: 'pin_number = 17 stores the integer 17'
  },
  {
    term: 'Float',
    category: 'Python',
    definition: 'A number with a decimal point. Used when you need fractional values.',
    example: 'temperature = 23.5 stores a floating-point number'
  },
  {
    term: 'Tuple',
    category: 'Python',
    definition: 'An ordered collection like a list, but immutable — its contents cannot be changed after creation. Written with parentheses.',
    example: 'pin_pair = (17, 27) is a tuple of two GPIO pin numbers'
  },
  {
    term: 'Set',
    category: 'Python',
    definition: 'An unordered collection that only stores unique items. Duplicates are automatically removed.',
    example: 'active_pins = {17, 27, 22} is a set of pin numbers'
  },
  {
    term: 'None',
    category: 'Python',
    definition: 'A special value representing "nothing" or "no value". It is Python\'s way of saying something is empty or undefined.',
    example: 'result = None before you have assigned a real value'
  },
  {
    term: 'Type',
    category: 'Python',
    definition: 'The kind of data a value is — such as int, float, str, bool, or list. Use type() to check it.',
    example: 'type(17) returns <class \'int\'>'
  },
  {
    term: 'Type Conversion',
    category: 'Python',
    definition: 'Changing a value from one type to another using int(), float(), str(), or bool().',
    example: 'int("17") converts the string "17" to the integer 17'
  },
  {
    term: 'Conditional',
    category: 'Python',
    definition: 'A statement that runs different code based on whether a condition is True or False. Uses if, elif, and else.',
    example: 'if button.is_pressed: led.on() else: led.off()'
  },
  {
    term: 'elif',
    category: 'Python',
    definition: 'Short for "else if". Checks a second condition when the first if condition is False.',
    example: 'elif temp > 30: print("Hot!") checks a second possibility'
  },
  {
    term: 'Break',
    category: 'Python',
    definition: 'A keyword that immediately exits the current loop, even if the loop condition is still True.',
    example: 'if button.is_pressed: break exits a while True loop'
  },
  {
    term: 'Continue',
    category: 'Python',
    definition: 'A keyword that skips the rest of the current loop iteration and jumps to the next one.',
    example: 'continue skips printing even numbers in a loop'
  },
  {
    term: 'Pass',
    category: 'Python',
    definition: 'A placeholder keyword that does nothing. Used when a block of code is required by syntax but you have nothing to put there yet.',
    example: 'def my_function(): pass is a valid empty function'
  },
  {
    term: 'Return',
    category: 'Python',
    definition: 'A keyword inside a function that sends a value back to wherever the function was called.',
    example: 'def double(x): return x * 2 sends back the doubled value'
  },
  {
    term: 'Parameter',
    category: 'Python',
    definition: 'A variable listed in a function definition that receives a value when the function is called.',
    example: 'def blink(pin, times): — pin and times are parameters'
  },
  {
    term: 'Argument',
    category: 'Python',
    definition: 'The actual value passed into a function when you call it. It fills in the parameter.',
    example: 'blink(17, 3) passes 17 and 3 as arguments'
  },
  {
    term: 'Default Parameter',
    category: 'Python',
    definition: 'A parameter with a preset value used when no argument is provided for it.',
    example: 'def blink(pin, times=5) uses 5 blinks if none specified'
  },
  {
    term: 'Keyword Argument',
    category: 'Python',
    definition: 'Passing an argument by name instead of position, making function calls clearer.',
    example: 'LED(pin=17, active_high=True) uses keyword arguments'
  },
  {
    term: 'Lambda',
    category: 'Python',
    definition: 'A small anonymous function defined in a single line using the lambda keyword.',
    example: 'double = lambda x: x * 2 creates a one-line function'
  },
  {
    term: 'List Comprehension',
    category: 'Python',
    definition: 'A concise way to build a list by applying an expression to each item in an iterable, all in one line.',
    example: 'squares = [x**2 for x in range(5)] gives [0, 1, 4, 9, 16]'
  },
  {
    term: 'Generator',
    category: 'Python',
    definition: 'A function that yields values one at a time instead of returning them all at once. Memory-efficient for large sequences.',
    example: 'def count_up(n): yield from range(n) yields values lazily'
  },
  {
    term: 'Decorator',
    category: 'Python',
    definition: 'A function that wraps another function to add behaviour without modifying its code. Written with @ above the function.',
    example: '@property wraps a method so it behaves like an attribute'
  },
  {
    term: 'Module',
    category: 'Python',
    definition: 'A single Python file that contains functions, classes, and variables you can import.',
    example: 'time is a module; import time lets you use time.sleep()'
  },
  {
    term: 'Package',
    category: 'Python',
    definition: 'A folder containing multiple Python modules grouped together. Usually installed with pip.',
    example: 'gpiozero is a package containing many modules for the Pi'
  },
  {
    term: 'Scope',
    category: 'Python',
    definition: 'The region of code where a variable is accessible. Variables defined inside a function are local; those outside are global.',
    example: 'A variable inside def run() cannot be used outside that function'
  },
  {
    term: 'Global Variable',
    category: 'Python',
    definition: 'A variable defined at the top level of a script, accessible from anywhere in that file.',
    example: 'LED_PIN = 17 at the top of a file is a global variable'
  },
  {
    term: 'Local Variable',
    category: 'Python',
    definition: 'A variable defined inside a function. It only exists while that function is running.',
    example: 'counter inside a function disappears when the function returns'
  },
  {
    term: 'Indentation',
    category: 'Python',
    definition: 'The spaces or tabs at the start of a line that show Python what code belongs to which block. Python requires consistent indentation.',
    example: 'Code inside an if statement must be indented by 4 spaces'
  },
  {
    term: 'Comment',
    category: 'Python',
    definition: 'A note in code that Python ignores. Written with # at the start. Used to explain what code does.',
    example: '# Turn on the LED when motion is detected'
  },
  {
    term: 'Docstring',
    category: 'Python',
    definition: 'A string written right after a function or class definition that documents what it does. Written with triple quotes.',
    example: '"""Blinks an LED a given number of times.""" documents a function'
  },
  {
    term: 'Try/Except',
    category: 'Python',
    definition: 'A block that tries to run code and catches errors if they occur, preventing crashes.',
    example: 'try: led.on() except GPIOPinInUse: print("Pin busy")'
  },
  {
    term: 'Finally',
    category: 'Python',
    definition: 'A block after try/except that always runs, whether or not an error occurred. Good for cleanup.',
    example: 'finally: led.close() ensures the LED is released'
  },
  {
    term: 'Raise',
    category: 'Python',
    definition: 'A keyword that deliberately triggers an exception. Used to signal that something went wrong.',
    example: 'raise ValueError("Pin must be between 1 and 40")'
  },
  {
    term: 'Context Manager',
    category: 'Python',
    definition: 'An object used with the with statement that automatically handles setup and teardown (like opening and closing a file).',
    example: 'with open("log.txt") as f: automatically closes the file after use'
  },
  {
    term: 'with Statement',
    category: 'Python',
    definition: 'Opens a context manager, runs the indented block, then automatically cleans up when the block ends.',
    example: 'with open("data.txt", "r") as f: data = f.read()'
  },
  {
    term: 'File I/O',
    category: 'Python',
    definition: 'Reading from and writing to files. Use open() with mode "r" to read and "w" to write.',
    example: 'f = open("sensor_log.txt", "w") opens a file for writing'
  },
  {
    term: 'print()',
    category: 'Python',
    definition: 'A built-in function that displays output to the console or terminal.',
    example: 'print("Temperature:", temp) shows the temperature value'
  },
  {
    term: 'input()',
    category: 'Python',
    definition: 'A built-in function that pauses the program and waits for the user to type something. Returns a string.',
    example: 'name = input("Enter your name: ") reads user input'
  },
  {
    term: 'range()',
    category: 'Python',
    definition: 'A built-in function that generates a sequence of numbers. Commonly used in for loops.',
    example: 'range(5) produces 0, 1, 2, 3, 4'
  },
  {
    term: 'len()',
    category: 'Python',
    definition: 'A built-in function that returns the number of items in a list, string, or other collection.',
    example: 'len([\'C4\', \'D4\', \'E4\']) returns 3'
  },
  {
    term: 'isinstance()',
    category: 'Python',
    definition: 'A built-in function that checks whether an object is an instance of a given class or type.',
    example: 'isinstance(17, int) returns True'
  },
  {
    term: 'enumerate()',
    category: 'Python',
    definition: 'A built-in function that adds a counter to an iterable, giving you both the index and the value.',
    example: 'for i, pin in enumerate([17, 27, 22]) gives i=0, pin=17 etc.'
  },
  {
    term: 'zip()',
    category: 'Python',
    definition: 'A built-in function that pairs up items from two or more lists into tuples.',
    example: 'zip([\'red\', \'green\'], [17, 27]) pairs colours with pin numbers'
  },
  {
    term: 'sorted()',
    category: 'Python',
    definition: 'A built-in function that returns a new sorted list from any iterable, without changing the original.',
    example: 'sorted([3, 1, 2]) returns [1, 2, 3]'
  },
  {
    term: 'map()',
    category: 'Python',
    definition: 'A built-in function that applies a function to every item in an iterable and returns the results.',
    example: 'list(map(str, [17, 27])) converts each pin number to a string'
  },
  {
    term: 'filter()',
    category: 'Python',
    definition: 'A built-in function that keeps only items from an iterable where a given function returns True.',
    example: 'list(filter(lambda x: x > 10, pins)) keeps only high pin numbers'
  },
  {
    term: 'Index',
    category: 'Python',
    definition: 'The position of an item in a list or string. Python starts counting at 0, not 1.',
    example: 'notes[0] gets the first note; notes[-1] gets the last'
  },
  {
    term: 'Slicing',
    category: 'Python',
    definition: 'Extracting a portion of a list or string using [start:stop] notation.',
    example: 'notes[1:4] gets items at index 1, 2, and 3'
  },
  {
    term: 'Concatenation',
    category: 'Python',
    definition: 'Joining two strings or lists together using the + operator.',
    example: '"Hello, " + "Pi!" produces "Hello, Pi!"'
  },
  {
    term: 'Operator',
    category: 'Python',
    definition: 'A symbol that performs an operation on values, such as +, -, *, /, ==, and, or, not.',
    example: '+ adds numbers; == checks if two values are equal'
  },
  {
    term: 'Comparison Operator',
    category: 'Python',
    definition: 'Operators that compare two values and return True or False: ==, !=, <, >, <=, >=.',
    example: 'temp > 30 returns True if temperature exceeds 30'
  },
  {
    term: 'Logical Operator',
    category: 'Python',
    definition: 'Operators that combine boolean expressions: and, or, not.',
    example: 'if hot and humid: turn_on_fan()'
  },
  {
    term: 'Assignment Operator',
    category: 'Python',
    definition: 'Operators that assign or update a value. = assigns; +=, -=, *= update in place.',
    example: 'count += 1 is the same as count = count + 1'
  },
  {
    term: 'Ternary Expression',
    category: 'Python',
    definition: 'A one-line conditional that evaluates to one of two values based on a condition.',
    example: 'state = "on" if led.is_lit else "off"'
  },
  {
    term: 'Unpacking',
    category: 'Python',
    definition: 'Assigning multiple variables at once from a list or tuple.',
    example: 'r, g, b = (255, 0, 0) assigns each colour channel separately'
  },
  {
    term: 'Mutable',
    category: 'Python',
    definition: 'A value that can be changed after it is created. Lists and dictionaries are mutable.',
    example: 'my_list.append(22) modifies the list in place'
  },
  {
    term: 'Immutable',
    category: 'Python',
    definition: 'A value that cannot be changed after it is created. Strings, integers, and tuples are immutable.',
    example: 'You cannot change individual characters of a string'
  },
  {
    term: 'Recursion',
    category: 'Python',
    definition: 'When a function calls itself. Each call works on a smaller version of the problem until a base case is reached.',
    example: 'def countdown(n): if n > 0: countdown(n-1)'
  },
  {
    term: 'Inheritance',
    category: 'Python',
    definition: 'When a class takes on the properties and methods of another class. The child class can override or extend them.',
    example: 'class SmartLED(LED) inherits everything from the LED class'
  },
  {
    term: '__init__',
    category: 'Python',
    definition: 'A special method called automatically when an object is created. Used to set up the object\'s initial state.',
    example: 'def __init__(self, pin): self.pin = pin runs on object creation'
  },
  {
    term: 'Dunder Method',
    category: 'Python',
    definition: 'Special methods with double underscores (e.g. __init__, __str__) that Python calls in specific situations.',
    example: '__str__ defines how an object looks when printed'
  },
  {
    term: 'self',
    category: 'Python',
    definition: 'A reference to the current object inside a class method. Always the first parameter of instance methods.',
    example: 'self.pin = pin stores the pin number on this specific object'
  },
  {
    term: 'Iterator',
    category: 'Python',
    definition: 'An object that produces values one at a time when iterated over with next().',
    example: 'A for loop uses an iterator internally to go through a list'
  },
  {
    term: 'Iterable',
    category: 'Python',
    definition: 'Any object that can be looped over — such as a list, tuple, string, or range.',
    example: 'for pin in [17, 27, 22]: loops over an iterable list'
  },
  {
    term: 'yield',
    category: 'Python',
    definition: 'A keyword inside a function that pauses execution and sends a value out, turning the function into a generator.',
    example: 'def gen_pins(): yield 17; yield 27 produces one pin at a time'
  },
  {
    term: 'Thread',
    category: 'Python',
    definition: 'A way to run multiple pieces of code at the same time within one program. Useful for handling events while the main loop runs.',
    example: 'gpiozero uses threads to detect button presses in the background'
  },
  {
    term: 'sleep()',
    category: 'Python',
    definition: 'A function from the time module that pauses the program for a given number of seconds.',
    example: 'time.sleep(0.5) pauses for half a second'
  },
  {
    term: 'pip',
    category: 'Python',
    definition: 'Python\'s package installer. Used to download and install third-party libraries from the internet.',
    example: 'pip install gpiozero installs the gpiozero library'
  },
  {
    term: 'Virtual Environment',
    category: 'Python',
    definition: 'An isolated Python environment that has its own set of installed packages. Prevents conflicts between projects.',
    example: 'python -m venv myenv creates a new virtual environment'
  },
  {
    term: 'if __name__ == "__main__"',
    category: 'Python',
    definition: 'A guard that runs code only when the script is executed directly, not when it is imported as a module.',
    example: 'Protects your startup code when your file is used by another file'
  },
  {
    term: 'Syntax Error',
    category: 'Python',
    definition: 'An error caused by code that does not follow Python\'s grammar rules. Prevents the program from running at all.',
    example: 'Forgetting a colon after if button.is_pressed causes a SyntaxError'
  },
  {
    term: 'Runtime Error',
    category: 'Python',
    definition: 'An error that occurs while the program is running, even though the syntax was correct.',
    example: 'Dividing by zero raises a ZeroDivisionError at runtime'
  },
  {
    term: 'Logic Error',
    category: 'Python',
    definition: 'A bug where the program runs without crashing but produces the wrong result due to incorrect logic.',
    example: 'Using pin 18 when you mean pin 17 is a logic error'
  },
  {
    term: 'Debugging',
    category: 'Python',
    definition: 'The process of finding and fixing errors in code. Common approaches include print statements, reading error messages, and using a debugger.',
    example: 'print(led.is_lit) helps debug whether an LED is on or off'
  },
  {
    term: 'REPL',
    category: 'Python',
    definition: 'Read-Eval-Print Loop. An interactive Python shell where you type commands and see results immediately.',
    example: 'Typing python in the terminal opens the Python REPL'
  },
  {
    term: 'Interpreter',
    category: 'Python',
    definition: 'The program that reads and executes Python code line by line. Unlike compiled languages, Python runs directly from source.',
    example: 'python my_script.py tells the interpreter to run your file'
  },
  {
    term: 'Script',
    category: 'Python',
    definition: 'A Python file (.py) that is run directly to perform a task, as opposed to being imported as a module.',
    example: 'blink_led.py is a script you run on the Raspberry Pi'
  },
  {
    term: 'JSON',
    category: 'Python',
    definition: 'JavaScript Object Notation. A text format for storing and exchanging data. Python\'s json module converts between JSON and dictionaries.',
    example: 'json.dumps({"pin": 17}) converts a dict to a JSON string'
  },
  {
    term: 'String Methods',
    category: 'Python',
    definition: 'Built-in functions available on string objects: .upper(), .lower(), .strip(), .split(), .replace(), .startswith(), etc.',
    example: '"  hello  ".strip() returns "hello" without whitespace'
  },
  {
    term: 'List Methods',
    category: 'Python',
    definition: 'Built-in functions available on list objects: .append(), .remove(), .pop(), .sort(), .reverse(), .index(), .count().',
    example: 'pins.append(22) adds 22 to the end of the list'
  },
  {
    term: 'Namespace',
    category: 'Python',
    definition: 'A container that maps names (variables, functions) to objects. Prevents name collisions between different parts of a program.',
    example: 'time.sleep() uses the time namespace to find sleep()'
  },
  {
    term: 'Bytes',
    category: 'Python',
    definition: 'A sequence of raw byte values (0–255). Used for binary data such as files, images, and network communication.',
    example: 'b"hello" is a bytes literal; useful when reading binary files'
  },
  {
    term: 'Regular Expression',
    category: 'Python',
    definition: 'A pattern used to search, match, or manipulate strings. Available through the re module.',
    example: 're.findall(r"\\d+", "pin 17") extracts numbers from text'
  },
  {
    term: 'assert',
    category: 'Python',
    definition: 'A statement that checks a condition and raises an AssertionError if it is False. Useful during development and testing.',
    example: 'assert 0 <= pin <= 40, "Invalid GPIO pin number"'
  },
  {
    term: 'async / await',
    category: 'Python',
    definition: 'Keywords for writing asynchronous code that can pause and resume without blocking the whole program.',
    example: 'async def read_sensor(): data = await sensor.read()'
  },

  // Raspberry Pi Terms
  {
    term: 'GPIO',
    category: 'Raspberry Pi',
    definition: 'General Purpose Input/Output. Physical pins on the Raspberry Pi that you can use to connect electronics.',
    example: 'GPIO 17 is where we connect the LED'
  },
  {
    term: 'Pin',
    category: 'Raspberry Pi',
    definition: 'A physical connection point on the Raspberry Pi board. Each pin has a number and serves a specific purpose.',
    example: 'Physical Pin 11 corresponds to GPIO 17'
  },
  {
    term: 'BCM Numbering',
    category: 'Raspberry Pi',
    definition: 'A numbering system for GPIO pins based on the Broadcom chip. GPIO 17 is used instead of physical pin numbers.',
    example: 'gpiozero uses BCM numbering by default'
  },
  {
    term: 'Physical Pin',
    category: 'Raspberry Pi',
    definition: 'The actual position of a pin on the Raspberry Pi header, counting from 1.',
    example: 'Physical Pin 1 is 3.3V, Pin 2 is 5V'
  },
  {
    term: 'GND',
    category: 'Raspberry Pi',
    definition: 'Ground pin. The reference point for 0 volts. Completes the circuit so electricity can flow.',
    example: 'Always connect the negative side of components to GND'
  },
  {
    term: '3.3V',
    category: 'Raspberry Pi',
    definition: 'The standard voltage output by Raspberry Pi GPIO pins. Anything connected to logic pins receives 3.3 volts when HIGH.',
    example: 'Do not connect 5V devices directly to GPIO pins'
  },
  {
    term: '5V',
    category: 'Raspberry Pi',
    definition: 'A higher voltage available on the Raspberry Pi for powering components that need more power, like buzzers.',
    example: 'PIR sensors often use 5V power'
  },
  {
    term: 'I2C',
    category: 'Raspberry Pi',
    definition: 'A communication protocol that uses two wires (SDA and SCL) to talk to multiple devices. Allows complex data transfer.',
    example: 'LCD displays often use I2C'
  },
  {
    term: 'SPI',
    category: 'Raspberry Pi',
    definition: 'Another communication protocol, faster than I2C. Uses four wires (MOSI, MISO, CLK, CS).',
    example: 'Some sensors and memory cards use SPI'
  },
  {
    term: 'UART',
    category: 'Raspberry Pi',
    definition: 'Serial communication protocol. Uses two wires (TX and RX) for slower, simpler communication.',
    example: 'Often used for debugging and simple device communication'
  },
  {
    term: 'Pull-up Resistor',
    category: 'Raspberry Pi',
    definition: 'A resistor that keeps a pin at a HIGH voltage (3.3V) until a button pulls it LOW.',
    example: 'Buttons often use pull-up resistors'
  },
  {
    term: 'Pull-down Resistor',
    category: 'Raspberry Pi',
    definition: 'A resistor that keeps a pin at a LOW voltage (0V) until something pulls it HIGH.',
    example: 'Pull-down resistors can be enabled in gpiozero'
  },
  {
    term: 'Raspberry Pi',
    category: 'Raspberry Pi',
    definition: 'A small, low-cost single-board computer developed in the UK. It runs Linux and has GPIO pins for connecting electronics.',
    example: 'The Raspberry Pi 4 has 4 USB ports, HDMI, Wi-Fi, and 40 GPIO pins'
  },
  {
    term: 'Raspberry Pi OS',
    category: 'Raspberry Pi',
    definition: 'The official operating system for the Raspberry Pi, based on Linux (Debian). Previously called Raspbian.',
    example: 'Raspberry Pi OS comes pre-installed with Python and many libraries'
  },
  {
    term: 'microSD Card',
    category: 'Raspberry Pi',
    definition: 'The storage card used by the Raspberry Pi as its hard drive. It holds the operating system and your files.',
    example: 'A 16GB or 32GB microSD card is recommended for Raspberry Pi OS'
  },
  {
    term: 'SoC',
    category: 'Raspberry Pi',
    definition: 'System on a Chip. A single chip that contains the CPU, GPU, and other components. The brain of the Raspberry Pi.',
    example: 'The Raspberry Pi 4 uses a Broadcom BCM2711 SoC'
  },
  {
    term: '40-Pin Header',
    category: 'Raspberry Pi',
    definition: 'The two rows of 20 pins on the Raspberry Pi board that provide access to GPIO, power, and ground connections.',
    example: 'The 40-pin header includes GPIO, 3.3V, 5V, and GND pins'
  },
  {
    term: 'HAT',
    category: 'Raspberry Pi',
    definition: 'Hardware Attached on Top. An add-on board that plugs into the 40-pin header and follows the official specification.',
    example: 'A Sense HAT adds sensors, a joystick, and an LED matrix'
  },
  {
    term: 'GPIO Input',
    category: 'Raspberry Pi',
    definition: 'A GPIO pin configured to read a voltage level from an external component (like a button or sensor).',
    example: 'Button(17) sets GPIO 17 as an input to detect presses'
  },
  {
    term: 'GPIO Output',
    category: 'Raspberry Pi',
    definition: 'A GPIO pin configured to send a voltage to an external component (like an LED or relay).',
    example: 'LED(17) sets GPIO 17 as an output that drives an LED'
  },
  {
    term: 'gpiozero',
    category: 'Raspberry Pi',
    definition: 'A beginner-friendly Python library for controlling GPIO pins. Provides easy classes like LED, Button, and MotionSensor.',
    example: 'from gpiozero import LED, Button makes GPIO simple to use'
  },
  {
    term: 'SSH',
    category: 'Raspberry Pi',
    definition: 'Secure Shell. A protocol that lets you remotely control a Raspberry Pi from another computer over a network.',
    example: 'ssh pi@192.168.1.10 connects to the Pi from your laptop'
  },
  {
    term: 'Headless Setup',
    category: 'Raspberry Pi',
    definition: 'Running the Raspberry Pi without a monitor, keyboard, or mouse. Accessed remotely via SSH.',
    example: 'A headless Pi in a project box is controlled entirely over Wi-Fi'
  },
  {
    term: 'Terminal',
    category: 'Raspberry Pi',
    definition: 'A text-based interface for giving commands to the Raspberry Pi. Used to run Python scripts and configure the system.',
    example: 'python3 blink.py in the terminal runs your script'
  },
  {
    term: 'raspi-config',
    category: 'Raspberry Pi',
    definition: 'A built-in configuration tool for the Raspberry Pi. Used to enable interfaces like I2C, SPI, camera, and SSH.',
    example: 'sudo raspi-config to enable the I2C interface'
  },
  {
    term: 'sudo',
    category: 'Raspberry Pi',
    definition: 'A Linux command meaning "superuser do". Runs a command with administrator privileges needed for system-level tasks.',
    example: 'sudo python3 gpio_script.py grants the script full system access'
  },
  {
    term: 'pinout',
    category: 'Raspberry Pi',
    definition: 'A terminal command and website (pinout.xyz) that shows a diagram of all the Raspberry Pi GPIO pin numbers and functions.',
    example: 'Type pinout in the terminal to see a GPIO pin map'
  },
  {
    term: 'IP Address',
    category: 'Raspberry Pi',
    definition: 'A unique number assigned to the Raspberry Pi on a network. Used to connect to it via SSH.',
    example: 'hostname -I in the terminal shows the Pi\'s IP address'
  },
  {
    term: 'BOARD Numbering',
    category: 'Raspberry Pi',
    definition: 'A GPIO numbering system that uses physical pin positions (1–40) on the header instead of BCM numbers.',
    example: 'In RPi.GPIO you can choose BOARD or BCM numbering'
  },
  {
    term: 'CSI Port',
    category: 'Raspberry Pi',
    definition: 'Camera Serial Interface. A dedicated port on the Raspberry Pi for connecting the official Pi Camera module.',
    example: 'Plug the ribbon cable from the camera into the CSI port'
  },
  {
    term: 'PWM Pin',
    category: 'Raspberry Pi',
    definition: 'A GPIO pin that supports hardware PWM, allowing precise timing without using the CPU. GPIO 12, 13, 18, and 19 support hardware PWM on most Pi models.',
    example: 'Use GPIO 18 for hardware PWM to control LED brightness smoothly'
  },
  {
    term: 'Shutdown Command',
    category: 'Raspberry Pi',
    definition: 'A terminal command used to safely power off the Raspberry Pi. Always shut down properly to avoid corrupting the microSD card.',
    example: 'sudo shutdown -h now immediately powers off the Pi'
  },
  {
    term: 'boot',
    category: 'Raspberry Pi',
    definition: 'The process of starting up the Raspberry Pi. The Pi reads the microSD card and loads the operating system.',
    example: 'After plugging in power, the Pi boots in about 30 seconds'
  },

  // Electronics Terms
  {
    term: 'Voltage',
    category: 'Electronics',
    definition: 'The electrical potential difference. Measured in Volts (V). It is the "push" that makes electricity flow.',
    example: 'The Raspberry Pi outputs 3.3V on GPIO pins'
  },
  {
    term: 'Current',
    category: 'Electronics',
    definition: 'The flow of electricity. Measured in Amperes (A). Too much current can burn out components.',
    example: 'LEDs need current-limiting resistors to prevent burning out'
  },
  {
    term: 'Resistance',
    category: 'Electronics',
    definition: 'Opposition to current flow. Measured in Ohms (Ω). Resistors limit current.',
    example: 'A 220Ω resistor limits LED current to a safe level'
  },
  {
    term: 'Resistor',
    category: 'Electronics',
    definition: 'A component that reduces current flow. Used to protect sensitive components like LEDs.',
    example: 'Always use a 220Ω-330Ω resistor with an LED'
  },
  {
    term: 'LED',
    category: 'Electronics',
    definition: 'Light Emitting Diode. A component that lights up when current flows through it in the correct direction.',
    example: 'Long leg (anode) connects to positive, short leg (cathode) connects to ground'
  },
  {
    term: 'Cathode',
    category: 'Electronics',
    definition: 'The negative leg of an LED (shorter leg). This connects to ground (GND).',
    example: 'The short leg of an LED is the cathode'
  },
  {
    term: 'Anode',
    category: 'Electronics',
    definition: 'The positive leg of an LED (longer leg). This connects to the power source through a resistor.',
    example: 'The long leg of an LED is the anode'
  },
  {
    term: 'Breadboard',
    category: 'Electronics',
    definition: 'A grid-based board with holes for connecting components without soldering. Makes it easy to build temporary circuits.',
    example: 'Breadboards have vertical columns that conduct electricity together'
  },
  {
    term: 'Jumper Wire',
    category: 'Electronics',
    definition: 'A flexible wire with metal connectors on both ends. Used to connect components on a breadboard.',
    example: 'Red wires often carry power, black wires carry ground'
  },
  {
    term: 'Circuit',
    category: 'Electronics',
    definition: 'A complete path for electricity to flow from the power source, through components, and back to ground.',
    example: '3.3V → resistor → LED → GND forms a complete circuit'
  },
  {
    term: 'Short Circuit',
    category: 'Electronics',
    definition: 'A dangerous condition where electricity flows directly from power to ground without going through components. Can damage equipment.',
    example: 'Connecting 3.3V directly to GND without a resistor is a short circuit'
  },
  {
    term: 'HIGH',
    category: 'Electronics',
    definition: 'Electrical logic state meaning the pin is outputting voltage (3.3V on the Pi). Also called "1" or "True".',
    example: 'led.on() sets the GPIO pin HIGH'
  },
  {
    term: 'LOW',
    category: 'Electronics',
    definition: 'Electrical logic state meaning the pin is at ground voltage (0V). Also called "0" or "False".',
    example: 'led.off() sets the GPIO pin LOW'
  },
  {
    term: 'PWM',
    category: 'Electronics',
    definition: 'Pulse Width Modulation. Rapidly turning power on and off to simulate lower voltage. Used to control brightness or speed.',
    example: 'PWM at 50% duty cycle makes an LED appear half as bright'
  },
  {
    term: 'Duty Cycle',
    category: 'Electronics',
    definition: 'The percentage of time a signal is HIGH versus OFF. 50% duty cycle means on for half, off for half.',
    example: 'A 75% duty cycle makes an LED 75% as bright as full power'
  },
  {
    term: 'Frequency',
    category: 'Electronics',
    definition: 'How many times something happens per second. Measured in Hz. For PWM, higher frequency makes smoother fading.',
    example: 'A buzzer at 440Hz produces the musical note A4'
  },
  {
    term: 'Buzzer',
    category: 'Electronics',
    definition: 'A component that produces sound. Passive buzzers need a changing voltage to make sound; active buzzers just need power.',
    example: 'A passive buzzer can play melodies; an active one makes a fixed beep'
  },
  {
    term: 'Button',
    category: 'Electronics',
    definition: 'A mechanical switch that connects or disconnects a circuit when pressed.',
    example: 'Pressing a button completes the circuit and allows current to flow'
  },
  {
    term: 'Sensor',
    category: 'Electronics',
    definition: 'A device that detects physical phenomena (light, heat, motion, etc.) and sends an electrical signal to the Pi.',
    example: 'A PIR sensor detects body heat and sends a HIGH signal'
  },
  {
    term: 'PIR Sensor',
    category: 'Electronics',
    definition: 'Passive Infrared Sensor. Detects motion by sensing changes in infrared radiation (heat).',
    example: 'Position PIR sensors away from heat sources for accuracy'
  },
  {
    term: 'Capacitor',
    category: 'Electronics',
    definition: 'A component that stores electrical charge and releases it quickly. Used for filtering, smoothing power, and timing.',
    example: 'A 100µF capacitor smooths out voltage spikes from a motor'
  },
  {
    term: 'Electrolytic Capacitor',
    category: 'Electronics',
    definition: 'A polarised capacitor with a positive and negative leg. Commonly used for larger capacitance values. Must be inserted the correct way.',
    example: 'The longer leg (positive) connects to the higher voltage side'
  },
  {
    term: 'Ceramic Capacitor',
    category: 'Electronics',
    definition: 'A small, non-polarised capacitor (no positive/negative) used for decoupling and filtering high-frequency noise.',
    example: 'A 100nF ceramic capacitor is placed close to an IC to reduce noise'
  },
  {
    term: 'Decoupling Capacitor',
    category: 'Electronics',
    definition: 'A capacitor placed close to a component\'s power pin to filter out noise and stabilise the voltage supply.',
    example: 'Place a 100nF capacitor between VCC and GND near a sensor IC'
  },
  {
    term: 'Transistor',
    category: 'Electronics',
    definition: 'A three-legged component that acts as an electronic switch or amplifier. Lets a small signal control a larger current.',
    example: 'An NPN transistor lets a GPIO pin switch on a motor that needs more current than the Pi can supply'
  },
  {
    term: 'NPN Transistor',
    category: 'Electronics',
    definition: 'A type of transistor where a small current into the base allows a larger current to flow from collector to emitter.',
    example: 'A BC547 NPN transistor can be used to switch a relay or buzzer from a GPIO pin'
  },
  {
    term: 'MOSFET',
    category: 'Electronics',
    definition: 'Metal-Oxide-Semiconductor Field-Effect Transistor. An efficient electronic switch controlled by voltage instead of current. Great for motors and LEDs.',
    example: 'An N-channel MOSFET like the 2N7000 can switch high-current loads from a GPIO pin'
  },
  {
    term: 'Diode',
    category: 'Electronics',
    definition: 'A component that only allows current to flow in one direction. Used to protect circuits from reverse polarity and voltage spikes.',
    example: 'A 1N4001 diode prevents reverse current from damaging the Pi'
  },
  {
    term: 'Zener Diode',
    category: 'Electronics',
    definition: 'A special diode that allows current to flow backwards when the voltage reaches a set level. Used to regulate voltage.',
    example: 'A 3.3V Zener diode can clamp a voltage to 3.3V to protect a GPIO pin'
  },
  {
    term: 'Flyback Diode',
    category: 'Electronics',
    definition: 'A diode placed across a motor or relay coil to absorb the voltage spike that occurs when it is switched off, protecting the circuit.',
    example: 'Always add a flyback diode across a relay coil connected to the Pi'
  },
  {
    term: 'Relay',
    category: 'Electronics',
    definition: 'An electrically controlled switch. A small GPIO signal can operate a relay to switch much higher voltages or currents on or off.',
    example: 'A relay lets a Pi control a mains-voltage lamp safely'
  },
  {
    term: 'Potentiometer',
    category: 'Electronics',
    definition: 'A variable resistor with a rotating or sliding knob. Produces an adjustable voltage between 0V and the supply voltage.',
    example: 'Turning a potentiometer knob sends a different voltage to an ADC'
  },
  {
    term: 'LDR',
    category: 'Electronics',
    definition: 'Light-Dependent Resistor (Photoresistor). Its resistance decreases as light intensity increases. Used to sense ambient light.',
    example: 'Pair an LDR with a resistor to create a light sensor voltage divider'
  },
  {
    term: 'Thermistor',
    category: 'Electronics',
    definition: 'A resistor whose resistance changes significantly with temperature. Used to measure temperature.',
    example: 'An NTC thermistor\'s resistance drops as temperature rises'
  },
  {
    term: 'Voltage Divider',
    category: 'Electronics',
    definition: 'Two resistors in series that produce an output voltage between 0V and the supply, proportional to the resistor values.',
    example: 'Two equal resistors from 3.3V to GND give 1.65V at the midpoint'
  },
  {
    term: 'ADC',
    category: 'Electronics',
    definition: 'Analog-to-Digital Converter. Converts a continuous analog voltage into a digital number a microcontroller can read. The Raspberry Pi has no built-in ADC.',
    example: 'An MCP3008 ADC chip lets the Pi read a potentiometer or LDR'
  },
  {
    term: 'DAC',
    category: 'Electronics',
    definition: 'Digital-to-Analog Converter. Converts a digital number into an analog voltage. Used to produce audio or variable voltages.',
    example: 'A DAC can convert Pi audio data into a smooth analog signal'
  },
  {
    term: 'DC Motor',
    category: 'Electronics',
    definition: 'A motor that spins continuously when DC power is applied. Spin direction depends on polarity; speed can be controlled with PWM.',
    example: 'Swap the two power wires on a DC motor to reverse its direction'
  },
  {
    term: 'Servo Motor',
    category: 'Electronics',
    definition: 'A motor that rotates to a specific angle based on a PWM signal. Commonly used for robotics and precise positioning.',
    example: 'A servo rotating to 90° is set by a 1.5ms pulse every 20ms'
  },
  {
    term: 'Stepper Motor',
    category: 'Electronics',
    definition: 'A motor that moves in precise fixed steps. Each pulse moves the shaft by an exact angle, enabling accurate positioning without feedback.',
    example: 'A 28BYJ-48 stepper moves 512 steps for a full 360° rotation'
  },
  {
    term: 'Motor Driver',
    category: 'Electronics',
    definition: 'An IC that allows a microcontroller to control motors safely by providing higher current than GPIO pins can deliver.',
    example: 'An L298N motor driver IC controls two DC motors from the Pi'
  },
  {
    term: 'RGB LED',
    category: 'Electronics',
    definition: 'An LED with three colour channels — Red, Green, and Blue — that can be mixed to produce any colour.',
    example: 'Setting R=255, G=0, B=0 via PWM makes the RGB LED fully red'
  },
  {
    term: 'LCD Display',
    category: 'Electronics',
    definition: 'Liquid Crystal Display. A screen that shows text and characters. Commonly connected to the Pi via I2C.',
    example: 'A 16×2 LCD displays two rows of 16 characters each'
  },
  {
    term: 'OLED Display',
    category: 'Electronics',
    definition: 'Organic LED display. Very thin screens that produce their own light, offering high contrast and low power use.',
    example: 'A 128×64 OLED connected via I2C can show sensor readings'
  },
  {
    term: '7-Segment Display',
    category: 'Electronics',
    definition: 'A display with seven LED segments arranged to show digits 0–9 and some letters.',
    example: 'Each segment is an individual LED; driving the right combination shows a number'
  },
  {
    term: 'Ohm\'s Law',
    category: 'Electronics',
    definition: 'The fundamental relationship between voltage, current, and resistance: V = I × R. Use it to calculate resistor values.',
    example: 'To limit current to 10mA at 3.3V: R = V/I = 3.3/0.01 = 330Ω'
  },
  {
    term: 'Power',
    category: 'Electronics',
    definition: 'The rate of energy consumption. Measured in Watts (W). Calculate it with P = V × I.',
    example: 'An LED at 3.3V and 10mA uses P = 3.3 × 0.01 = 0.033W (33mW)'
  },
  {
    term: 'Series Circuit',
    category: 'Electronics',
    definition: 'A circuit where components are connected end-to-end in a single path. The same current flows through all of them.',
    example: 'A resistor and LED in series share the same current path'
  },
  {
    term: 'Parallel Circuit',
    category: 'Electronics',
    definition: 'A circuit where components are connected across the same two points. Each gets the full supply voltage independently.',
    example: 'Multiple LEDs in parallel each get the full 3.3V but share the total current'
  },
  {
    term: 'Logic Level',
    category: 'Electronics',
    definition: 'The voltage range that represents a HIGH (1) or LOW (0) in a digital circuit. The Pi uses 3.3V logic.',
    example: 'A 5V Arduino and 3.3V Pi need a logic-level converter to communicate safely'
  },
  {
    term: 'Logic Level Converter',
    category: 'Electronics',
    definition: 'A small circuit or IC that safely translates signals between devices operating at different voltages (e.g. 3.3V and 5V).',
    example: 'Use a level converter between a 5V Arduino sensor and the Pi\'s 3.3V GPIO'
  },
  {
    term: 'Active High',
    category: 'Electronics',
    definition: 'A component or control signal that activates when the pin is HIGH (voltage). Most LEDs are active high.',
    example: 'An active-high LED turns on when the GPIO pin is set HIGH'
  },
  {
    term: 'Active Low',
    category: 'Electronics',
    definition: 'A component or control signal that activates when the pin is LOW (0V). Some relays and displays are active low.',
    example: 'An active-low relay turns ON when the GPIO pin is set LOW'
  },
  {
    term: 'Debounce',
    category: 'Electronics',
    definition: 'Filtering out the rapid on-off noise ("bouncing") that occurs when a mechanical button is pressed. Done in software or with a capacitor.',
    example: 'gpiozero handles debounce automatically for Button objects'
  },
  {
    term: 'Multimeter',
    category: 'Electronics',
    definition: 'A test instrument that measures voltage, current, and resistance. Essential for diagnosing circuit problems.',
    example: 'Use a multimeter set to DC volts to check if a GPIO pin is HIGH or LOW'
  },
  {
    term: 'Continuity Test',
    category: 'Electronics',
    definition: 'A multimeter mode that beeps when two points are electrically connected. Used to check wires and connections.',
    example: 'Use continuity mode to verify a jumper wire is not broken'
  },
  {
    term: 'Schematic',
    category: 'Electronics',
    definition: 'A diagram using standard symbols to show how electronic components are connected in a circuit.',
    example: 'Reading the schematic shows which resistor value to use with the LED'
  },
  {
    term: 'PCB',
    category: 'Electronics',
    definition: 'Printed Circuit Board. A board with copper tracks that permanently connects components without needing wires.',
    example: 'The Raspberry Pi itself is a PCB with all its components soldered on'
  },
  {
    term: 'Soldering',
    category: 'Electronics',
    definition: 'Joining electronic components to a PCB by melting solder (a metal alloy) to create a permanent electrical connection.',
    example: 'Solder a pin header to a custom board to attach it to the Pi'
  },
  {
    term: 'Heat Sink',
    category: 'Electronics',
    definition: 'A metal block attached to a component (like the Pi\'s CPU) to absorb and dissipate heat, preventing overheating.',
    example: 'Stick a heat sink on the Raspberry Pi 4\'s SoC chip to keep it cool under load'
  },
  {
    term: 'Ohmmeter',
    category: 'Electronics',
    definition: 'A tool (or multimeter mode) that measures resistance in Ohms. Useful for identifying resistor values and checking components.',
    example: 'Use an ohmmeter to confirm a resistor is the correct value before using it'
  },
  {
    term: 'Inductor',
    category: 'Electronics',
    definition: 'A coil of wire that stores energy in a magnetic field. Resists changes in current. Used in filters and power supplies.',
    example: 'Power supply regulators use inductors to smooth output current'
  },
  {
    term: 'Ground',
    category: 'Electronics',
    definition: 'The common reference point (0V) for all measurements and current return paths in a circuit. All GND pins must be connected together.',
    example: 'Connect the Pi\'s GND to the Arduino\'s GND when using both together'
  },
  {
    term: 'Power Rail',
    category: 'Electronics',
    definition: 'The long horizontal rows on a breadboard connected together, used to distribute power (VCC) and ground (GND) across the board.',
    example: 'Connect 3.3V to the red power rail so all components on that row get power'
  },
  {
    term: 'Integrated Circuit (IC)',
    category: 'Electronics',
    definition: 'A small chip containing many transistors, resistors, and other components. Performs complex functions in a tiny package.',
    example: 'The MCP3008 is an IC containing an 8-channel ADC'
  },
  {
    term: 'Oscilloscope',
    category: 'Electronics',
    definition: 'A test instrument that shows how a voltage signal changes over time on a screen. Used for diagnosing timing and signal issues.',
    example: 'An oscilloscope can visualise a PWM waveform and measure its frequency'
  },
  {
    term: 'TTL',
    category: 'Electronics',
    definition: 'Transistor-Transistor Logic. A family of digital circuits where HIGH is typically 5V. Distinct from the Pi\'s 3.3V logic.',
    example: 'A TTL serial module needs a level converter before connecting to the Pi'
  },
  {
    term: 'Signal',
    category: 'Electronics',
    definition: 'A voltage that carries information. Can be digital (HIGH/LOW) or analog (continuously varying).',
    example: 'A DHT22 temperature sensor sends a digital signal with encoded data'
  },
  {
    term: 'Sinusoidal',
    category: 'Electronics',
    definition: 'A smooth, wave-like pattern that follows the shape of a sine function. Sinusoidal waves are the most basic form of oscillation, characterized by their smooth, continuous rise and fall. Used to describe AC power, audio signals, and many natural phenomena.',
    example: 'A pure musical tone is a sinusoidal wave; mains electricity is a 50Hz or 60Hz sinusoidal AC voltage'
  },
  {
    term: 'Pythonic',
    category: 'Python',
    definition: 'Code that follows Python\'s design philosophy and idioms — clean, readable, and elegant. Pythonic code uses built-in features like list comprehensions, context managers, and duck typing rather than porting patterns from other languages.',
    example: 'Using "for item in items:" is Pythonic; using "for i in range(len(items)):" is not'
  },

  // ============================================
  // BEGINNER FUNDAMENTALS
  // (Great starting points for young learners!)
  // ============================================

  {
    term: 'Electricity',
    category: 'Beginner',
    definition: 'The flow of tiny particles called electrons through wires. It powers everything from lights to your Raspberry Pi! Think of it like water flowing through a pipe.',
    example: 'Plugging in your Raspberry Pi lets electricity flow and turns it on'
  },
  {
    term: 'Code',
    category: 'Beginner',
    definition: 'Instructions written in a special language that tells a computer what to do. It is like a recipe that the computer follows step by step.',
    example: 'led.on() is code that tells the Raspberry Pi to turn on an LED'
  },
  {
    term: 'Program',
    category: 'Beginner',
    definition: 'A complete set of code instructions saved in a file that does a specific job. Also called a "script" in Python.',
    example: 'Your blink_led.py file is a program that makes an LED blink'
  },
  {
    term: 'Bug',
    category: 'Beginner',
    definition: 'A mistake in your code that makes it do something wrong or not work at all. Finding and fixing bugs is called "debugging".',
    example: 'If your LED does not blink, there might be a bug in your code — maybe a typo!'
  },
  {
    term: 'Run',
    category: 'Beginner',
    definition: 'To start your program and let the computer follow your instructions. When you run code, you see it come to life!',
    example: 'Type "python3 blink.py" in the terminal to run your blinking LED program'
  },
  {
    term: 'Wire',
    category: 'Beginner',
    definition: 'A thin piece of metal covered in plastic that carries electricity from one place to another. Different colored wires help you keep track of connections.',
    example: 'Red wires usually connect to power, and black wires connect to ground'
  },
  {
    term: 'Module',
    category: 'Beginner',
    definition: 'A small electronic part that is ready to use — like a sensor or LED — often already mounted on a little board with pins you can plug into your breadboard.',
    example: 'The RGB LED module from your kit has the resistors already built in!'
  },
  {
    term: 'Kit',
    category: 'Beginner',
    definition: 'A collection of electronic parts bundled together for learning. Your Inland 37-in-1 Sensor Kit has buttons, LEDs, sensors, and more!',
    example: 'The Inland kit includes an RGB LED, button, buzzer, and many sensors'
  },
  {
    term: 'Digital',
    category: 'Beginner',
    definition: 'Something that can only be ON or OFF, with nothing in between. Like a light switch — it is either up or down, never halfway.',
    example: 'A digital pin reads HIGH (on) or LOW (off) — that is it!'
  },
  {
    term: 'Analog',
    category: 'Beginner',
    definition: 'Something that can have many values in between, not just ON or OFF. Like a dimmer switch that lets you choose any brightness level.',
    example: 'A potentiometer knob gives an analog signal — any position between 0 and full'
  },
  {
    term: 'Binary',
    category: 'Beginner',
    definition: 'A way of counting using only two digits: 0 and 1. Computers think in binary! Each 0 or 1 is called a "bit".',
    example: 'The number 5 in binary is 101 (one 4, zero 2s, and one 1)'
  },
  {
    term: 'Bit',
    category: 'Beginner',
    definition: 'The smallest piece of information a computer can store — just a single 0 or 1. Eight bits together make a "byte".',
    example: 'A single bit can represent ON (1) or OFF (0)'
  },
  {
    term: 'Byte',
    category: 'Beginner',
    definition: 'Eight bits grouped together. A byte can store a number from 0 to 255, or one letter of text.',
    example: 'The letter "A" is stored as the byte 01000001 in the computer'
  },
  {
    term: 'USB',
    category: 'Beginner',
    definition: 'Universal Serial Bus. A common connector for plugging in keyboards, mice, and other devices. Your Raspberry Pi has USB ports!',
    example: 'Plug your keyboard into one of the USB ports on the Raspberry Pi'
  },
  {
    term: 'Power Supply',
    category: 'Beginner',
    definition: 'A device that provides electricity to your Raspberry Pi or other electronics. It usually plugs into the wall and converts the power to a safe level.',
    example: 'The Raspberry Pi needs a 5V USB power supply to run'
  },
  {
    term: 'Polarity',
    category: 'Beginner',
    definition: 'The direction electricity flows — positive (+) to negative (−). Some parts, like LEDs, only work when connected the right way around.',
    example: 'If your LED does not light up, try flipping it — you may have the polarity backwards'
  },
  {
    term: 'Prototype',
    category: 'Beginner',
    definition: 'A first version of your project that you build to test your ideas. Breadboards are perfect for prototyping because you can easily change things!',
    example: 'Build a prototype on your breadboard before soldering a permanent version'
  },
  {
    term: 'Microcontroller',
    category: 'Beginner',
    definition: 'A tiny computer on a single chip. It can run simple programs to control LEDs, read sensors, and more. The Raspberry Pi is more powerful — it is a full computer!',
    example: 'Arduino boards use a microcontroller; Raspberry Pi uses a full processor'
  },
  {
    term: 'Output',
    category: 'Beginner',
    definition: 'Something that your code makes happen in the real world — like turning on an LED or playing a sound on a buzzer.',
    example: 'An LED is an output device — your code sends signals OUT to control it'
  },
  {
    term: 'Input',
    category: 'Beginner',
    definition: 'Information that comes INTO your code from the real world — like a button press or a temperature reading from a sensor.',
    example: 'A button is an input device — it sends signals IN to your program'
  },
  {
    term: 'Delay',
    category: 'Beginner',
    definition: 'A pause in your program where it waits before doing the next thing. Used to control timing, like how long an LED stays on.',
    example: 'time.sleep(1) creates a 1-second delay before the next line runs'
  },
  {
    term: 'Blink',
    category: 'Beginner',
    definition: 'Turning something on and off over and over again. The "Hello World" of electronics is making an LED blink!',
    example: 'led.blink() makes the LED turn on, wait, turn off, wait, and repeat'
  },
  {
    term: 'Connect',
    category: 'Beginner',
    definition: 'To join wires or components together so electricity can flow between them. A complete path is called a circuit.',
    example: 'Connect the LED\'s long leg to GPIO 17 and the short leg to ground'
  },
  {
    term: 'WiFi',
    category: 'Beginner',
    definition: 'Wireless internet connection. Your Raspberry Pi can connect to WiFi so you can download code and control it remotely!',
    example: 'Connect your Pi to WiFi to install new libraries with pip'
  },

  // ============================================
  // USER-REQUESTED TERMS
  // (SMD RGB LED, I2C, Security, and Level 10)
  // ============================================

  {
    term: 'Sourcing',
    category: 'Electronics',
    definition: 'When a pin provides power (usually 3.3V) to a component. The current flows OUT of the pin, through the component, and to ground. Also called "sourcing current".',
    example: 'A common-cathode RGB LED needs sourcing — the GPIO pin provides 3.3V to light each color'
  },
  {
    term: 'Sinking',
    category: 'Electronics',
    definition: 'When a pin provides a path to ground (0V) for current to flow INTO it. The component is powered from elsewhere, and the GPIO pin "sinks" the current to complete the circuit.',
    example: 'A common-anode RGB LED needs sinking — each GPIO pin pulls its color channel to ground to turn it on'
  },
  {
    term: 'Common Anode',
    category: 'Electronics',
    definition: 'An RGB LED where all three color channels share one positive (+) leg connected to power. You turn on each color by sinking its individual pin to ground. "Active LOW" — LOW = on, HIGH = off.',
    example: 'With a common-anode RGB LED, connect the shared anode to 3.3V and set GPIO LOW to light a color'
  },
  {
    term: 'Common Cathode',
    category: 'Electronics',
    definition: 'An RGB LED where all three color channels share one negative (−) leg connected to ground. You turn on each color by sourcing voltage to its individual pin. "Active HIGH" — HIGH = on, LOW = off.',
    example: 'With a common-cathode RGB LED, connect the shared cathode to GND and set GPIO HIGH to light a color'
  },
  {
    term: 'Hysteresis',
    category: 'Electronics',
    definition: 'Using different thresholds for turning something ON versus OFF to prevent "chatter" — rapid flickering when a value hovers near one threshold. The gap between thresholds creates stability.',
    example: 'A thermostat with hysteresis turns the heater ON at 18°C but OFF at 21°C, so it does not flip back and forth constantly'
  },
  {
    term: 'I2C Address',
    category: 'Raspberry Pi',
    definition: 'A unique number (like a phone number!) that identifies each device on the I2C bus. The Raspberry Pi uses the address to talk to a specific sensor when multiple devices share the same two wires.',
    example: 'The ADXL345 accelerometer has I2C address 0x53 — run "i2cdetect -y 1" to see all connected addresses'
  },
  {
    term: 'Least Privilege',
    category: 'Beginner',
    definition: 'A security rule that says a program should only have access to the things it absolutely needs — no more. This limits damage if something goes wrong or is hacked.',
    example: 'A blink script only needs GPIO 17 — it should not have permission to delete files or access the internet'
  },

  // ============================================
  // MORE BEGINNER ELECTRONICS TERMS
  // ============================================

  {
    term: 'SMD',
    category: 'Electronics',
    definition: 'Surface-Mount Device. Tiny electronic parts soldered flat onto a circuit board instead of pushed through holes. They are smaller but harder to solder by hand.',
    example: 'The tiny RGB LED on your module is an SMD component'
  },
  {
    term: 'Through-Hole',
    category: 'Electronics',
    definition: 'Electronic parts with long wire legs that poke through holes in a circuit board. Easier for beginners to use with breadboards and solder.',
    example: 'Regular LEDs with two legs are through-hole components'
  },
  {
    term: 'Pinout',
    category: 'Electronics',
    definition: 'A diagram or list showing what each pin on a chip or connector does. Very helpful for wiring things correctly!',
    example: 'Check the pinout of your RGB LED to know which leg is Red, Green, Blue, and Ground'
  },
  {
    term: 'Datasheet',
    category: 'Electronics',
    definition: 'An official document from the manufacturer that explains everything about a component — voltage, current, pinout, and how to use it.',
    example: 'The DS18B20 datasheet tells you it measures from −55°C to +125°C'
  },
  {
    term: 'mA (Milliamp)',
    category: 'Electronics',
    definition: 'One-thousandth of an Amp. A small unit of electrical current. Most LEDs use about 10–20 mA.',
    example: 'A typical LED draws 15 mA — the Raspberry Pi GPIO can safely provide up to 16 mA per pin'
  },
  {
    term: 'VCC',
    category: 'Electronics',
    definition: 'The positive power supply pin on a component. Short for "Voltage at Common Collector". Connect this to your power rail (3.3V or 5V).',
    example: 'Connect the sensor\'s VCC pin to the 3.3V rail on your breadboard'
  },
  {
    term: 'On-Board',
    category: 'Electronics',
    definition: 'A component or feature that is already built into a board (like a resistor soldered onto an LED module) so you do not need to add it separately.',
    example: 'Your RGB LED module has on-board resistors — you do not need extra ones'
  },
  {
    term: 'Header',
    category: 'Electronics',
    definition: 'A row of pins or sockets used to connect wires or modules. The Raspberry Pi\'s 40-pin header is where you plug in your GPIO wires.',
    example: 'Push jumper wires onto the GPIO header pins to connect your circuits'
  },
  {
    term: 'Floating Pin',
    category: 'Electronics',
    definition: 'A GPIO pin that is not connected to anything — it "floats" and can randomly read HIGH or LOW due to electrical noise. Use pull-up or pull-down resistors to fix this!',
    example: 'An unconnected button pin might randomly trigger — adding a pull-up resistor stops the floating'
  },
  {
    term: 'Noise',
    category: 'Electronics',
    definition: 'Random, unwanted electrical signals that can interfere with your readings. Caused by motors, radio waves, or long wires acting like antennas.',
    example: 'Add a capacitor near your sensor to filter out electrical noise'
  },
  {
    term: 'Interrupt',
    category: 'Raspberry Pi',
    definition: 'A signal that makes the CPU stop what it is doing and handle an important event immediately (like a button press), then go back to its original task.',
    example: 'gpiozero uses interrupts so button presses are detected instantly without constantly checking'
  },
  {
    term: 'Polling',
    category: 'Raspberry Pi',
    definition: 'Repeatedly checking something over and over in a loop. Works but wastes CPU time. Interrupts and callbacks are usually better!',
    example: 'while True: if button.is_pressed: ... is polling — it checks constantly'
  },
  {
    term: '1-Wire',
    category: 'Raspberry Pi',
    definition: 'A communication protocol that uses just one data wire (plus ground) to talk to sensors. The DS18B20 temperature sensor uses 1-Wire.',
    example: 'Enable 1-Wire in raspi-config before using a DS18B20 thermometer'
  },
  {
    term: 'Accelerometer',
    category: 'Electronics',
    definition: 'A sensor that measures acceleration (speeding up, slowing down) and tilt. It can tell which way is "down" by sensing Earth\'s gravity!',
    example: 'The ADXL345 accelerometer in Level 6 detects when you tilt or shake the board'
  },
  {
    term: 'g-force',
    category: 'Electronics',
    definition: 'A unit of acceleration equal to Earth\'s gravity (9.8 m/s²). Sitting still, you feel 1g pulling you down. Jumping off a diving board feels like 0g!',
    example: 'The accelerometer reads about 1.0g on the Z-axis when lying flat'
  },
  {
    term: 'Axis',
    category: 'Electronics',
    definition: 'A direction in 3D space. X is left/right, Y is forward/backward, Z is up/down. Accelerometers measure all three axes.',
    example: 'Tilting the sensor left makes the X-axis reading change'
  },
  {
    term: 'State',
    category: 'Python',
    definition: 'The current condition or situation of your program at any moment. Tracking state helps your code remember what mode it is in.',
    example: 'An alarm system might have states: ARMED, DISARMED, or TRIGGERED'
  },
  {
    term: 'State Machine',
    category: 'Python',
    definition: 'A way of organizing code where your program can be in one of several "states" and transitions between them based on events. Makes complex logic much clearer!',
    example: 'A traffic light is a state machine: GREEN → YELLOW → RED → GREEN ...'
  },
  {
    term: 'Threshold',
    category: 'Python',
    definition: 'A boundary value that triggers an action when crossed. Like a finish line — once you pass it, something happens!',
    example: 'if temperature > 30: sets 30°C as the threshold for turning on a fan'
  },
  {
    term: 'Calibration',
    category: 'Electronics',
    definition: 'Adjusting a sensor so its readings match reality. Some sensors need time to "warm up" and calibrate to their environment.',
    example: 'PIR motion sensors need 10–60 seconds to calibrate when first powered on'
  },
  {
    term: 'Fail-Safe',
    category: 'Security',
    definition: 'Designing a system so that if something goes wrong (like power loss), it goes to a safe state automatically — not a dangerous one.',
    example: 'A relay wired as Normally-Open is fail-safe: if the Pi crashes, the relay opens and the heater turns OFF'
  },
  {
    term: 'Normally Open (NO)',
    category: 'Electronics',
    definition: 'A relay or switch contact that is disconnected (open) when not activated. Power flows only when you energize the relay. Safer for most applications.',
    example: 'Wire the heater to the Normally Open terminal so it turns OFF if the relay loses power'
  },
  {
    term: 'Normally Closed (NC)',
    category: 'Electronics',
    definition: 'A relay or switch contact that is connected (closed) when not activated. Power flows by default and stops when you energize the relay.',
    example: 'A Normally Closed circuit would keep a light ON until you press a button to break the connection'
  },
  {
    term: 'CRC',
    category: 'Electronics',
    definition: 'Cyclic Redundancy Check. A math trick that detects if data got corrupted during transmission. If the CRC fails, the reading is bad and should be discarded.',
    example: 'The DS18B20 sensor file shows "YES" only if the CRC check passes'
  },
  {
    term: 'Log',
    category: 'Python',
    definition: 'A file or list where your program writes down what happens and when. Useful for debugging and keeping track of events over time.',
    example: 'The Smart Guardian logs every time the relay turns on or off'
  },
];
