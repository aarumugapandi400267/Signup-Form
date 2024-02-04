
const Home=async (req,res)=>{
    await res.sendFile(__dirname+'/public/index.html') 
}
export {Home}