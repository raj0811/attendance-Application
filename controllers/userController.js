const User = require('../modules/userSchema')

const registerUser=async(req,res)=>{
    try{
        const {
            name,
            instituteName,
            email,
            password,
            number,
            address,
            image
        }=req.body

        const existingUser = await User.findOne({ $or: [{ email }, { number }] });
        if (existingUser) {
          return res.status(400).json({ error: 'Email or number is already taken.' });
        }

        const imageFile = req.file;
        let imageUrl = process.env.DEFAULT_LOGO
        if(imageFile){
          const result = await cloudinary.uploader.upload(imageFile.path);
          console.log(result.secure_url);
          imageUrl = result.secure_url
          fs.unlinkSync(imageFile.path);
        }

        const user = new User({
          name,
          hotelName,
          email,
          password, // Password is plain text here
          number,
          address,
          gst,
          image: imageUrl, // Use the secure URL from Cloudinary
        });

    }catch(error){
        res.send(error)
    }
}