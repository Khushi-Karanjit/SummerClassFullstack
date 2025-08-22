import jwt from 'jsonwebtoken';

export function checkTocken(req,  res , next){
    const tocken = req.headers.authorization?.split(' ')[1];
    console.log(tocken);
    
    if(!tocken) return res.status(403).send('Tocken not found');

    try {
        const data = jwt.verify(tocken, process.env.JWT_SECRET);
        req.user = data;
        next();

        
    } catch (e) {
        res.status(401).json(e);
    }

}