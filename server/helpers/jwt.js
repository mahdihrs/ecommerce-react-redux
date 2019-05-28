require('dotenv').config()
const jwt = require('jsonwebtoken');

function generate(user) {
    const token = jwt.sign({ 
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    );
    return token
}

function decode(token) {
    let verifying = jwt.verify(token, process.env.JWT_SECRET);
    return verifying
}

function jwtAdmin(admin) {
    const token = jwt.sign({ 
            id: admin._id,
            full_name: admin.full_name,
            email: admin.email,
            admin: admin.admin
        },
        process.env.JWT_SECRET
    );
    return token
}

// console.log(generate({
//     _id: '5c700075cb3538591adc9aa2',
//     email : 'mahdi.haris@live.com',
//     full_name : 'Mahdi Haris',
//     admin : true
// }))

module.exports = { generate, decode, jwtAdmin }