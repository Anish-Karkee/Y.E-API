import jwt from 'jsonbtoken';
import User from '../models/User'  // i have to make user in the models and than import here.

const protect = async (req, res, next ) => {
    let token
    if (
        req.header.authorization &&
        req.header.authorization.startsWith('Bearer')
    ) {
        token = req.header.authorization.split('')[1]
    }

    if(!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.User = await User.findById(decoded.id).select('-password')

        if(!req.User) {
            return res.status(401).json({ success: false, message: 'User not found' })
        }

        next()
    } catch(error) {
        return res.status(401).json({ success: false, message: 'Token is invalid or expired' })
    }
}

// --ADMIN ONLY--------

const adminOnly = (req, res, next) => {
    if(req.User && req.User.role === 'admin' ) {
        next()
    } else {
        res.status(403).json({ success: false, message: 'Access denied: Admins only' })
    }
}


module.exports = { protect, adminOnly }