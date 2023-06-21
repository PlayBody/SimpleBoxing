
const disableIps:string[] = [];

export const ipFilter = (req:any, res:any, next:any) => {
  const clientIP = req.ip;
  if (disableIps.includes(clientIP)) {
    res.status(403).send('Access denied');
  } else {
    next();
  }
};