import { db } from "../firebase.config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

export const saveCartToFirestore = async (uid, cartItems) => {
  try {
    const cartRef = doc(db, "carts", uid);
    await setDoc(cartRef, cartItems);
    console.log("Giỏ hàng đã được lưu vào trong Firestore");
  } catch (error) {
    console.log("Lỗi khi lưu vào Firestore:", error);
  }
};

export const updateCartInFirestore = async (uid, cartItems) => {
  try {
    const cartRef = doc(db, "carts", uid);
    await updateDoc(cartRef, { items: cartItems });
    console.log("Giỏ hàng đã được cập nhật trong Firestore.");
  } catch (error) {
    console.error("Lỗi khi cập nhật giỏ hàng trong Firestore:", error);
  }
};
