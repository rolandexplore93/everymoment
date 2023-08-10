import JWT, { decode } from 'jsonwebtoken';
import createError from 'http-errors';

export const isAuthorize = async (req, res, next) => {
    try {
        let decodedData;
        const retrieveAuthorizationToken = req.headers.authorization;
        if (!retrieveAuthorizationToken) return next(createError.Unauthorized());
        const token = retrieveAuthorizationToken.split(" ")[1];
        const isCustomToken = token.length < 500;
        if (token && isCustomToken){
            decodedData = JWT.verify(token, process.env.SECRETJWT);
            req.userId = decodedData?.id
        } else {
            decodedData = decode(token)
            // console.log(decodedData)
            req.userId = decodedData?.sub //Sub is a google id that differentiate every single user
        }

        next();
    } catch (error) {
        return next(error)
    }
}