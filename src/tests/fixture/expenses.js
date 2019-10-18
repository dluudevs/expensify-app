// **Fixture is just dummy data used for testing
import moment from 'moment'

export default [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 195,
    createdAt: 0
},
{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
    // moment(0) - creates moment at Unix time (Jan 1, 1970)
    //valueOf converts the object into a number (in ms)
},
{
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]