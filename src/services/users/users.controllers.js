
export const postJoin = (req, res) => {
    
    console.log(`body: ${JSON.stringify(req.body)}`)
    return res.json("success");
};