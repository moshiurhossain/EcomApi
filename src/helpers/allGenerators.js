
// otp generator-----------------
function generateOTP() {
  // Generate a random 5-digit number
  const otp = Math.floor(10000 + Math.random() * 90000);
  return otp;
}
//  otp expire time
function otpExpiryTime(){
   const future = new Date(Date.now() + 5 * 60 *1000)  ; // timestamp in miliseconds
   return future
}
// slug generator
 const generateSlug = (title = "") => {
  if (!title) return "";

  return title
    .toString()
    .normalize("NFKD")               // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")     // Replace non-alphanumeric with hyphen
    .replace(/-+/g, "-")             // Collapse multiple hyphens
    .replace(/^-+|-+$/g, "");        // Trim hyphens
};

//  sku generator 
const generateSKU =(title='')=>{
  const prefix =title
  .toString()
  .trim()
  .toLocaleUpperCase()
  .replace(/[^A-Z]/g,"")
  .slice(0,3) || "SKU";

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${randomNumber}`
}

module.exports ={generateOTP,otpExpiryTime,generateSlug,generateSKU}
