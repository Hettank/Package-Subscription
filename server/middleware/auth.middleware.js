import jwt from "jsonwebtoken"

const protectRoute = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ message: "No authorization token" })
    }

    try {
        const decoded = jwt.verify(token, "thisismysecret")

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" })
    }
}

export default protectRoute