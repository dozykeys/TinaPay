/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import axios from "axios";
import { base_url } from "../constants/config";

class PostGiftService {
  static async redeemGiftCard(
    user_id_fk: any,
    email: any,
    category: any,
    sub_category: any,
    image: any,
    amount: any,
    comment: any,
    send_to_wallet: any
  ): Promise<any> {
    const requestBody = {
      user_id_fk,
      email,
      category,
      sub_category,
      image,
      amount,
      comment,
      send_to_wallet,
    };

    try {
      const response = await fetch(`${base_url}/api/giftcard/redeemGiftCard`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.error) {
        // toast.error("Purchase Unsuccessful Try Again");

        throw data.error;
      }

      return data;
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      // toast.error("Purchase Unsuccessful Try Again");
      throw error;
    }
  }
}

export default PostGiftService;
