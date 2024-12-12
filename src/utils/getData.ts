/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { base_url, django_url } from "../constants/config";
import { supabase } from "../constants/supabase";

class GetDataService {
  static async getTransactions(
    user_id: string,
    limit: number,
    asc: boolean = false
  ): Promise<any> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id_fk", user_id)
      .order("created_at", { ascending: asc })
      .limit(limit);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async getWalletBalance(user_id: string): Promise<any> {
    const { data, error } = await supabase
      .from("wallet")
      .select("*")
      .eq("user_id_fk", user_id);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async getUserInfo(user_id: string): Promise<any> {
    const { data, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id_fk", user_id);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async getWalletAddress(user_id: string): Promise<any> {
    const { data, error } = await supabase
      .from("crypto_wallets")
      .select("*")
      .eq("user_id_fk", user_id);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async getVirtualAccount(user_id: string): Promise<any> {
    const { data, error } = await supabase
      .from("virtual_accounts")
      .select("*")
      .eq("user_id_fk", user_id);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async getRates(): Promise<any> {
    const { data, error } = await supabase
      .from("rates")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async listSavedAccounts(user_id: string): Promise<any> {
    const { data, error } = await supabase
      .from("p2p")
      .select("*")
      .eq("user_id_fk", user_id);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  }

  static async loadBillCategories(jwt_user: string) {
    try {
      const baseUrl = base_url;

      const response = await fetch(
        `${baseUrl}/api/bills/getAll?bill_type=data_bundle`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt_user}`,
          },
        }
      );

      const data = await response.json();

      let billCategories = null;

      // console.log("bills", data.data);

      if (data.status === "success") {
        // Filter items where the lowercase name does not contain "ug"
        billCategories = data.data.filter(
          (item: { name: string }) => !item.name.toLowerCase().includes("ug")
        );
      } else {
        billCategories = [];
      }

      return billCategories;
    } catch (error) {
      console.error("Error fetching bill categories:", error);
    }
  }

  static async getBank(id: string) {
    try {
      // makek api call to cryptoapi

      const rawResponse = await fetch(`${django_url}/transfer/banks/ng`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${id}`,
        },
      });

      const data = await rawResponse.json();

      // console.log('django allbanks', data)
      const bankList = data.data;

      return bankList;
    } catch (error) {
      console.log(error);
    }
  }

  static async verifyAccount(
    user_id: string,
    bank_code: string,
    acct_num: string
  ) {
    console.log({
      account_number: acct_num,
      account_bank: bank_code,
    });
    try {
      const rawResponse = await fetch(
        `${django_url}/transfer/verify_account/ng`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${user_id}`,
          },
          body: JSON.stringify({
            account_number: acct_num,
            account_bank: bank_code,
          }),
        }
      );
      const data = await rawResponse.json();
      // console.log(data);
      if (data.status == "error") {
        throw new Error("Invalid Account");
      }

      return data?.data;
    } catch (error) {
      throw error;
    }
  }

  static async checkTinaTag(tagName: string): Promise<any> {
    // if (!tagName) {
    //   throw new Error("No tag name passed");
    // }

    try {
      const { data, error } = await supabase
        .from("user_info")
        .select("tag")
        .eq("tag", tagName);

      if (error) {
        throw error;
      }

      if (data == null || data.length == 0) {
        return { message: "valid tag name" };
      } else {
        throw new Error("Tag name already in use");
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkTinaEmail(email: string): Promise<any> {
    // if (!email) {
    //   throw new Error("No tag name passed");
    // }

    try {
      const { data, error } = await supabase
        .from("user_info")
        .select("email")
        .eq("email", email);

      if (error) {
        throw error;
      }

      if (data == null || data.length == 0) {
        return { message: "valid tag name" };
      } else {
        throw new Error("Email already in use");
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkIfBvnExist(bvn: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from("bvn_verification")
        .select("bvn")
        .eq("bvn", bvn);

      if (error) {
        throw error;
      }

      if (data == null || data.length == 0) {
        return { message: "valid tag name" };
      } else {
        throw new Error("BVN already in use");
      }
    } catch (error) {
      throw error;
    }
  }

  static async checkBvnMatch(
    first_name: string,
    last_name: string,
    bvn: number
  ) {
    try {
      const rawResponse = await fetch(
        "https://server.tinapay.co/verify/auth_token",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const token = await rawResponse.json();

      const response = await axios.post(
        "https://server.tinapay.co/verify/nuban",
        {
          firstname: first_name,
          lastname: last_name,
          bvn: bvn,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token.accessToken,
          },
        }
      );

      if (response.data.summary.bvn_match_check.status === "NO_MATCH") {
        throw new Error("BVN Name Mismatch");
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // }
  // public async getSavedAccountID(accountID: string): Promise<void> {
  //   try {
  //     const { data, error } = await supabase
  //       .from("p2p")
  //       .select("*")
  //       .eq("id", accountID);
  //     console.log("Account info: ", data);
  //     beneficiary_accountP2P = data[0].account_number;
  //     bank_nameP2P = data[0].bank_name;
  //     beneficiary_name = data[0].account_name;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public firstLetter(userBankName: string): string {
  //   const first_word = userBankName.split(" ")[0];
  //   return first_word.charAt(0);
  // }
  // public async listSavedAccounts(user_id: string): Promise<void> {
  //   try {
  //     let { data, error } = await supabase
  //       .from("p2p")
  //       .select("*")
  //       .eq("user_id_fk", user_id);
  //     listOfSavedAccount = data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public async getRates(): Promise<void> {
  //   try {
  //     let { data, error } = await supabase
  //       .from("rates")
  //       .select("*")
  //       .order("created_at", { ascending: false })
  //       .limit(1);
  //     new_rate = data[0].selling;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public async getBank(): Promise<void> {
  //   try {
  //     const rawResponse = await fetch(`${djangoUrl}/transfer/banks/ng`, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${id}`,
  //       },
  //     });
  //     let data = await rawResponse.json();
  //     bankList = data.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public async getFee(amountToSend: number): Promise<void> {
  //   try {
  //     const rawResponse = await fetch(`${djangoUrl}/transfer/fee`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${id}`,
  //       },
  //       body: JSON.stringify({
  //         amount: amountToSend,
  //         currency: "NGN",
  //       }),
  //     });
  //     let data = await rawResponse.json();
  //     charges_on_amount = data["data"][0].fee;
  //     balance = amountOnWallet - amountToSend - charges_on_amount;
  //     console.log(balance);
  //     hideTransferOverview = false;
  //     hidePreLoader = true;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public async getWalletBalance(user_id: string): Promise<void> {
  //   const { data, error } = await supabase
  //     .from("wallet")
  //     .select("*")
  //     .eq("user_id_fk", user_id);
  //   if (data.length == 0) {
  //     amountOnWallet = 0;
  //     initNewWallet(user_id);
  //   } else {
  //     amountOnWallet = data[0].amount;
  //     amountOnWallet = convertToNaira(amountOnWallet);
  //     wallet_id = data[0].id;
  //   }
  // }
  // public async checkWalletAddressExist(): Promise<void> {
  //   let { data, error } = await supabase
  //     .from("crypto_wallets")
  //     .select("*")
  //     .eq("user_id_fk", id);
  //   if (data.length == 0) {
  //     generateAddress();
  //   } else {
  //     btc_wallet_address = data[0].btc_wallet_address;
  //   }
  // }
  // public async saveAccountPin() {
  //   // clear the input
  //   if (!inputed_pin) {
  //     M.toast({
  //       html: '<b class="white-text">please input your account pin</b>',
  //       classes: "error_",
  //     });
  //   } else {
  //     // first_pin = encryptPin(inputed_pin)
  //     let { data, error } = await supabase
  //       .from("user_info")
  //       .update([
  //         {
  //           account_pin: inputed_pin,
  //         },
  //       ])
  //       .eq("user_id_fk", id);
  //     M.toast({
  //       html: '<b class="white-text">Pin setup successful!</b>',
  //       classes: "success_",
  //     });
  //     localStorage.setItem("_id", id);
  //     hideDashboard = false;
  //     hideMenu = false;
  //     hideShortCuts = false;
  //     hideTransactions = false;
  //     hideTagSetUp = true;
  //     hidePinSetup = true;
  //     hideAccountPin = true;
  //     // checkBvnVerification(id)
  //   }
  // }
  // public async checkUserPinSetup() {
  //   try {
  //     let { data, error } = await supabase
  //       .from("user_pin")
  //       .select("*")
  //       .eq("user_id_fk", id);
  //     console.log(data.length);
  //     if (data.length == 0 || data == null) {
  //       hideDashboard = true;
  //       hideMenu = true;
  //       hideShortCuts = true;
  //       hideTransactions = true;
  //       hideTagSetUp = true;
  //       hidePinSetup = false;
  //     } else {
  //       checkUserAccountPinSetup();
  //     }
  //   } catch (error) {}
  // }
  // public async checkUserAccountPinSetup() {
  //   try {
  //     let { data, error } = await supabase
  //       .from("user_info")
  //       .select("*")
  //       .eq("user_id_fk", id);
  //     if (data.length == 0 || data[0].account_pin == null) {
  //       hideDashboard = true;
  //       hideMenu = true;
  //       hideShortCuts = true;
  //       hideTransactions = true;
  //       hideTagSetUp = true;
  //       hidePinSetup = true;
  //       hideAccountPin = false;
  //     } else {
  //       hideDashboard = false;
  //       hideMenu = false;
  //       hideShortCuts = false;
  //       hideTransactions = false;
  //       hideTagSetUp = true;
  //       hidePinSetup = true;
  //       hideAccountPin = true;
  //     }
  //   } catch (error) {}
  // }
  // public async checkBvnVerification(user_id) {
  //   try {
  //     let { data, error } = await supabase
  //       .from("bvn_verfication")
  //       .select("*")
  //       .eq("user_id_fk", user_id);
  //     // console.log(data.length)
  //     if (data.length == 0) {
  //       hideBvnVerification = false;
  //     }
  //   } catch (error) {}
  // }
  // public async validatePin(): Promise<void> {
  //   errorPin = "";
  //   hidePreLoader = false;
  //   let { data, error } = await supabase
  //     .from("user_pin")
  //     .select("*")
  //     .eq("user_id_fk", user_id);
  //   let decryptedPin = decryptPin(data[0].flandle_user_pin);
  //   if (decryptedPin == inputed_pin) {
  //     topUpAirtime();
  //   } else {
  //     handleClearInput();
  //     errorPin = "Wrong pin";
  //     hidePreLoader = true;
  //   }
  // }
  // public async checkTag(): Promise<void> {
  //   tagError = "Please wait...";
  //   tagRedText = false;
  //   let userTag = tag || "";
  //   userTag = userTag.trim();
  //   userTag = userTag.toLowerCase();
  //   try {
  //     if (userTag == "") {
  //       tagError = "Your tag cannot be empty";
  //       tagRedText = true;
  //     } else {
  //       tagError = "Please wait...";
  //       tagRedText = false;
  //       let { data, error } = await supabase
  //         .from("user_info")
  //         .select("tag")
  //         .eq("tag", userTag);
  //       if (data == null || data.length == 0) {
  //         saveTag(userTag);
  //       } else {
  //         console.log(data);
  //         tagError = "This tag is not available";
  //         tagRedText = true;
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default GetDataService;
