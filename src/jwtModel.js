const jwt = require('jsonwebtoken');

const jwtModel = {
    sign: (email) => jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    ),

    test: (req, res, next) => {
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json(
                    {
                        errors: [
                            {
                                status: 401,
                                title: "Unauthorized",
                                message: "Unauthorized"
                            }
                        ]
                    }
                );
            } else {
                next();
            }
        });
    }
};

module.exports = jwtModel;
