//***MUST HAVE .TEST.JS IN FILE EXTENSION OR JEST WILL NOT PICK IT UP */
// test file grant access to global variables provided by jest (eg., test)
const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('should add two numbers', () => {
    const result = add(3, 4);
    // assertion - testing if function behaves as expected
    expect(result).toBe(7)
    //toBe is a method jest provides - check if result is equal to the argument

});
// 2 required arguments, name and function

test('should say hello to passed name', () => {
    const greeting = generateGreeting('Delvv');
    expect(greeting).toBe(`Hello Delvv!`)
});

test('should say hello to no name', () => {
    const greeting = generateGreeting();
    expect(greeting).toBe('Hello Anonymous!')
})