const {check}= require('express-validator')

exports.userSignupValidator=[
    check('firstName')
        .not()
        .isEmpty()
        .withMessage("First Name Cannot Be Empty"),

    check('lastName')
        .not()
        .isEmpty()
        .withMessage("Last Name Cannot Be Empty"),

    check('email')
        .isEmail()
        .withMessage('Must Be A Valid Email Address'),

    check('password')
        .isLength({min: 6})
        .withMessage('Password Must Be Of 6 Characters!')
        .matches(/\d/)
        .withMessage('Password Must Contain A Number')
]
