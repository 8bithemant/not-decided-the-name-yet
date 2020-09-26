const {check}= require('express-validator')

exports.categoryCreateValidator=[
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Must'),
    check('about')
        .isLength({min: 32})
        .not()
        .isEmpty()
        .withMessage('About Must Be 32 Chars'),
    check('cover')
        .not()
        .isEmpty()
        .withMessage('To Create A Category, Please Upload Image')
]