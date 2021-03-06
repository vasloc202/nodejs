import mongoose from "mongoose";


import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const authSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    salt: {
        type: String
    }
}, { timestamps: true });

authSchema.methods = {

    // check mật khẩu khi login
    authenticate(password) {
        return this.password == this.encryptPassword(password);
    },
    // mã hóa mật khẩu
    encryptPassword(password) {
        if (!password) return;
        try {
            return createHmac("sha256", this.salt).update(password).digest("hex");
        } catch (error) {
            console.log(error);
        }
    }
}

authSchema.pre("save", function (next) {
    try {
        this.salt = uuidv4();
        this.password = this.encryptPassword(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
})

export default mongoose.model("user", authSchema);