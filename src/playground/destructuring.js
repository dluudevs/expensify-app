// ***OBJECT DESTRUCTURING***
const person = {
    name: 'Delvv',
    age: 29,
    location: {
        city: 'Toronto',
        temp: 14
    }
};

//by using equal for the variable, it defaults to this value if person.name does not exist 
const { name: firstName = 'default', age }  = person;
// matches by property name
console.log(`${firstName} is ${age}`)

const { temp: temperature, city } = person.location;
if(city && temperature){
    console.log(`Its ${temperature} in ${city}`);
}

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published'} = book.publisher
console.log(publisherName); //Penguin, default = Self-Published


// ***ARRAY DESTRUCTURING***
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147']
const [, city, state = 'New York' ] = address;
//matches by position in the array
//empty variable name, skips that item (notice the comma) - you can also drop the last item using the same method
// no renaming necessary, can still set default value using same syntax as object
console.log(`You are in ${state}`)

const item = ['Coffee(cold)', '$2.00', '$2.75', '$3.00'];
const [ menuItem, , mSize] = item;

//grab first and third items using array destructuring
console.log(`${menuItem} costs ${mSize}`);