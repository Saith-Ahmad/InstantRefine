"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "../utils";
import { connectToDatabase } from "../database/dbConfig";
import User from "../models/user.model";
import mongoose from "mongoose";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}


// export async function getUserById(userId: string) {
//   try {
//     console.log("UserId:", userId);

//     await connectToDatabase();
//     console.log("Connected to database");

//     // Access native MongoDB client via Mongoose
//     const db = mongoose.connection.db;
//     if(!db) throw new Error("do not find db");
//     const collections = await db.listCollections().toArray();
//     console.log("Collections in DB:", collections);
    
//     // Query the "users" collection
    
//     // Query for a specific user
//     const user = await db.collection("users").findOne({ clerkId: userId });
//     console.log("User Found:", user);

//     // Fetch all users directly from the "users" collection
//     const allUsers = await db.collection("users").find({}).toArray();
//     console.log("All users from DB:", allUsers);

//     // Fetch specific user by `clerkId` field
//     // const user = await db.collection("users").findOne({ clerkId: userId });
//     // console.log("User found:", user);

//     if (!user) throw new Error("User not found");

//     return user; // No need to JSON stringify/parse here
//   } catch (error:any) {
//     console.log("Error in getUserById:", error.message);
//   }
// }


// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/dashboard");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}