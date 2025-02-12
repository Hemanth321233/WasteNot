import { db } from "../components/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

console.log("DB Connection:", db);

export const saveFoodItem = async (itemName, startDate, expiryDate) => {
    try {
      await addDoc(collection(db, "items"), {
        name: itemName,
        startDate: startDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        createdAt: serverTimestamp(),
      });
      console.log("Item saved to Firestore");
    } catch (error) {
      console.error("Error saving item:", error);
      throw error; // Rethrow for better error handling
    }
  };
