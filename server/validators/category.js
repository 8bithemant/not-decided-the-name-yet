const {check}= require('express-validator')

exports.categoryCreateValidator=[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Must'),
    check('cover')
        .not()
        .isEmpty()
        .withMessage('To Create A Category, Please Upload Image')
]