const jwt = require('jsonwebtoken');

const jwtModel = {
    sign: (email) => jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    ),

    test: (req, res, next) => {
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.JWT_SECRET, (err, _) => {
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
    },
    getEmail: (token) => {
        return jwt.decode(token).email;
    }
};

module.exports = jwtModel;
