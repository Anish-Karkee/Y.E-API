// backend/models/User.js

import { Schema, model } from 'mongoose'
import { genSalt, hash, compare } from 'bcryptjs'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries unless you specifically ask for it
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    bikeModel: {
      type: String,
      trim: true,
    },

    licenseNumber: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: '', // stores the image path e.g. /uploads/profile-123.jpg
    },

    role: {
      type: String,
      enum: ['member', 'admin'], // only these two values are allowed
      default: 'member',         // every new signup becomes a member by default
    },

    isApproved: {
      type: Boolean,
      default: false, // admin must approve new members before they are active
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
)

// ─────────────────────────────────────────────────────────
// MIDDLEWARE: Hash password before saving to database
// This runs automatically every time you call user.save()
// ─────────────────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  // Only hash if password was changed or is new
  // Without this check, the password would be re-hashed on every profile update
  if (!this.isModified('password')) return next()

  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
  next()
})

// ─────────────────────────────────────────────────────────
// METHOD: Compare entered password with hashed password
// Used in authController.js login function
// ─────────────────────────────────────────────────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
}

export default model('User', userSchema)