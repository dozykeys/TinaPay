/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import axios from "axios";
import toast from "react-hot-toast";
import { supabase } from "../constants/supabase";
import CryptoJS from "crypto-js";
import { base_url } from "../constants/config";
import axios from "axios";

class PostDataService {
  static async validatePin(
    user_id: string,
    inputed_pin: string
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("user_pin")
      .select("*")
      .eq("user_id_fk", user_id);

    if (error) {
      throw new Error("An error occured");
    }

    if (!data || data.length === 0) {
      throw new Error("Pin is not set");
    }

    const decryptedPin = await this.decryptPin(data[0].flandle_user_pin);
    if (decryptedPin === inputed_pin) {
      return true;
    } else {
      throw new Error("Pin is Incorrect");
    }
  }

  static async topUpData(
    selectedBill: any,
    phoneNumber: string,
    jwtUser: string
  ): Promise<any> {
    const phoneWithCountryCode = `+234${phoneNumber}`;

    const requestBody = {
      country: "NG",
      phone: phoneWithCountryCode,
      biller_name: selectedBill.biller_name,
      amount: Number(selectedBill.amount),
    };

    try {
      const response = await fetch(`${base_url}/api/bills/purchase`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtUser}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.error) {
        toast.error("Purchase Unsuccessful Try Again");

        setTimeout(() => {
          window.location.href = "/bills/data";
        }, 2500);
        return;
      }

      toast.success("Purchase Successful");
      console.log("Response:", data);
      setTimeout(() => {
        window.location.href = "../bills/success";
      }, 2500);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      toast.error("Purchase Unsuccessful Try Again");
      setTimeout(() => {
        window.location.href = "/bills/data";
      }, 2500);
    }
  }

  static async topUpAirtime(
    amount: string,
    phoneNumber: string,
    jwtUser: string
  ): Promise<void> {
    // Ensure the amount is less than or equal to 10 characters
    if (phoneNumber.length < 10) {
      alert("Phone Number should be a minimum of 10 characters");
      return;
    }
    const phoneWithCountryCode = `+234${phoneNumber}`;

    const requestBody = {
      country: "NG",
      phone: phoneWithCountryCode,
      amount: amount,
    };

    console.log({
      requestBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtUser}`,
      },
    });

    try {
      const response = await fetch(`${base_url}/api/bills/airtime`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtUser}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log({ data });

      if (data.error) {
        if (
          data.message.toLowerCase() ==
          "Insufficient funds in your wallet".toLowerCase()
        ) {
          toast.error("Error occurred, please try again");
        } else {
          // toast.error(data.message);
          toast.error("Purchase Unsuccessful Try Again");
        }

        setTimeout(() => {
          window.location.href = "/bills/airtime";
        }, 2500);
        return;
      }

      toast.success("Purchase Successful");
      console.log("Response:", data);

      setTimeout(() => {
        window.location.href = "/bills/success";
      }, 2500);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      toast.error("Purchase Unsuccessful Try Again");

      setTimeout(() => {
        window.location.href = "/bills/airtime";
      }, 2500);
    }
  }

  static async saveBankAccount(
    savedAccounts: any,
    user_id: string,
    selected_bank_name: string,
    beneficiary_account: string,
    beneficiary_name: string,
    first_name: string,
    last_name: string
  ): Promise<any> {
    // console.log({ selected_bank_name, savedAccounts });
    // console.log(savedAccounts);

    const bankExists = savedAccounts.some(
      (account: any) =>
        account.bank_name.toLowerCase() === selected_bank_name.toLowerCase()
    );

    // console.log(bankExists);

    if (bankExists) {
      toast.error("Bank Already Exists");
      throw new Error("Bank Already Exists");
    }

    // console.log({ selected_bank_name, beneficiary_account, beneficiary_name });

    try {
      if (!selected_bank_name || !beneficiary_account || !beneficiary_name) {
        toast.error("Please fill all input");
        return;
      } else {
        const lowerFirstName = first_name.toLowerCase();
        const lowerLastName = last_name.toLowerCase();
        const lowerBeneficiaryName = beneficiary_name.toLowerCase();

        const firstNameExists = lowerBeneficiaryName.includes(lowerFirstName);
        const lastNameExists = lowerBeneficiaryName.includes(lowerLastName);

        console.log({ firstNameExists, lastNameExists });

        if (firstNameExists || lastNameExists) {
          const { data, error } = await supabase.from("p2p").insert([
            {
              user_id_fk: user_id,
              bank_name: selected_bank_name,
              account_number: beneficiary_account,
              account_name: beneficiary_name,
            },
          ]);

          if (error) {
            throw error;
          }

          return data;
        } else {
          toast.error("Account Name Does Not Match Profile", {
            duration: 6000,
          });
          throw new Error("Account Name Does Not Match Profile");
        }
      }
    } catch (error) {
      toast.error("An error occured");
      console.error("Error saving bank account:", error);
      throw error;
    }
  }

  static async P2pRequest(
    user_balance: number,
    rate: number,
    user_id: string,
    accountBank: string,
    accountNumber: string,
    amount: number,
    _narration: string,
    beneficiaryName: string,
    firstName: string
  ): Promise<any> {
    try {
      // const rawResponse = await fetch(`${django_url}/transfer/`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Token ${user_id}`,
      //   },
      //   body: JSON.stringify({
      //     account_bank: accountBank,
      //     account_number: accountNumber,
      //     amount: amount,
      //     narration: narration,
      //     beneficiary_name: beneficiaryName,
      //   }),
      // });

      console.log("now here 1");

      console.log({ user_balance, rate });

      const cal_balance = Number(user_balance * rate) - amount;

      const new_balance = cal_balance / rate;

      console.log({ cal_balance, new_balance });

      // const data = await rawResponse.json();
      // console.log("data error is: ", data["error"]);

      await supabase
        .from("wallet")
        .update({
          amount: new_balance.toFixed(3),
        })
        .eq("user_id_fk", user_id);

      await supabase.from("transactions").insert({
        user_id_fk: user_id,
        transaction_amount: amount,
        transaction_ref: this.generateRandomString(12),
        // @ts-expect-error because the locale string does not accept argument and I need to pass one
        transaction_date: new Date().toISOString().toLocaleString("zh-TW"),
        transaction_type: "P2P",
        sender_name: beneficiaryName,
        sender_phone: null,
        transaction_origin: "Tina P2P",
        debit_credit: "Debit",
        currency: "NGN",
        transaction_status: "Pending",
        charges: 10.75,
        beneficiary_account_name: firstName,
        beneficiary_account_number: accountNumber,
        beneficiary_bank_name: accountBank,
      });

      console.log("now here 2");

      await fetch(`${base_url}/api/notifications/sendemail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "someemail@gmail.com",
          subject: `Bank Transfer P2P Request of ₦${amount} by ${beneficiaryName}`,
          content: `${beneficiaryName} is making a request of ₦${amount} to ${accountBank} with account number ${accountNumber}`,
        }),
      });

      console.log("now here 3");

      //  success
      return {
        message: "P2p request successful",
      };
    } catch (error) {
      console.error("Error transferring funds:", error);
      toast.error("Error transferring funds");
      throw error;
    }
  }

  static async CryptoRequest(
    user_balance: number,
    user_id: string,
    wallet_type: string,
    wallet_address: string,
    amount: number,
    _narration: string,
    beneficiaryName: string
  ): Promise<any> {
    try {
      // console.log("now here 1");

      // console.log({ user_balance, rate });

      const cal_balance = Number(user_balance) - amount;

      const new_balance = cal_balance;

      // console.log({ cal_balance, new_balance });

      await supabase
        .from("wallet")
        .update({
          amount: new_balance.toFixed(3),
        })
        .eq("user_id_fk", user_id);

      await supabase.from("transactions").insert({
        user_id_fk: user_id,
        transaction_amount: amount,
        transaction_ref: this.generateRandomString(12),
        // @ts-expect-error because the locale string does not accept argument and I need to pass one
        transaction_date: new Date().toISOString().toLocaleString("zh-TW"),
        transaction_type: "Crypto",
        sender_name: beneficiaryName,
        sender_phone: null,
        transaction_origin: "Tina P2P",
        debit_credit: "Debit",
        currency: "USD",
        transaction_status: "Pending",
        charges: 10.75,
        beneficiary_account_name: beneficiaryName,
        wallet_type: wallet_type,
        wallet_address: wallet_address,
      });

      console.log("now here 2");

      await fetch(`${base_url}/api/notifications/sendemail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "someemail@gmail.com",
          subject: `Crypto Transfer Request of $${amount} by ${beneficiaryName}`,
          content: `${beneficiaryName} is making a request of $${amount} to ${wallet_type} wallet with address ${wallet_address}`,
        }),
      });

      console.log("now here 3");

      //  success
      return {
        message: "Crypto request successful",
      };
    } catch (error) {
      console.error("Error transferring funds:", error);
      // toast.error("Error transferring funds");
      throw error;
    }
  }

  static async payWithTag(
    toTag: string,
    myTag: string,
    user_id: string,
    amount: number,
    phone: any
  ) {
    let userTag = toTag;
    userTag = userTag.trim();
    userTag = userTag.toLowerCase();
    let recieversID;

    // @ts-expect-error because the locale string does not accept argument and I need to pass one
    const transaction_date = new Date().toISOString().toLocaleString("zh-TW");
    const trx_ref = this.generateRandomString(12);

    const { data } = await supabase
      .from("wallet")
      .select("*")
      .eq("user_id_fk", user_id);

    // console.log({ toTagData: data });

    if (!data) {
      throw new Error("No User Found");
    }

    const amountToUpdate = parseFloat(data[0]?.amount);

    if (amountToUpdate < amount) {
      toast.error("insufficent balance");
      throw new Error("insufficent balance");
    }

    try {
      const { data } = await supabase
        .from("user_info")
        .select("*")
        .eq("tag", userTag);
      if (data == null || data.length == 0) {
        toast.error("Tag does not exist");
        throw new Error("Tag does not exist");
      } else {
        // console.log(data, myTag);
        if (myTag == data[0].tag) {
          toast.error("You cannot send to yourself");
          throw new Error("You cannot send to yourself");
        } else {
          recieversID = data[0].user_id_fk;

          await this.updateReceiverAndRecordTrx(
            recieversID,
            amount,
            myTag,
            userTag,
            phone,
            transaction_date,
            trx_ref
          ).then(async () => {
            await this.updateTagUserBalanceAndRecordTrx(
              user_id,
              amount,
              myTag,
              userTag,
              phone,
              transaction_date,
              trx_ref
            );
          });
        }

        toast.success("Transfer successful");

        setTimeout(() => {
          window.location.href = "/transfer";
        }, 2500);

        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  static async registerUser(
    user_id: string,
    first_name: string,
    last_name: string,
    userName: string,
    email: string,
    country: string,
    phone: string,
    bvn: string,
    gender: string,
    dob: string
  ): Promise<any> {
    try {
      await supabase.from("user_info").insert([
        {
          first_name: first_name,
          last_name: last_name,
          country: country,
          tag: String(userName).toLowerCase().trim(),
          email: email,
          user_id_fk: user_id,
          phone_number: phone,
          gender: gender,
          dob: dob,
          email_verified: true,
        },
      ]);
    } catch (error) {
      console.log({ userInsertError: error });
    }

    try {
      await axios.post(
        `${base_url}/users/create-account`,
        {
          firstName: first_name,
          lastName: last_name,
          email: email,
          phoneNumber: phone,
          bvn: bvn,
          userId: user_id,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log({ crytoCreateError: error });
    }

    try {
      await supabase.from("bvn_verification").insert([
        {
          user_id_fk: user_id,
          bvn: bvn,
          verified_status: "verified",
        },
      ]);
    } catch (error) {
      console.log({ bvnInsertError: error });
    }

    // add wallet
    try {
      await supabase.from("wallet").insert([
        {
          user_id_fk: user_id,
          amount: 0,
          hide_balance: false,
        },
      ]);
    } catch (error) {
      console.log({ walletInsertError: error });
    }

    // create virtual acct
    try {
      await axios.post(
        `${base_url}/users/create-account`,
        {
          firstName: first_name,
          lastName: last_name,
          email: email,
          phoneNumber: phone,
          bvn: bvn,
          userId: user_id,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log({ virtualError: error });
    }

    // generate btc address
    try {
      const rawResponse = await fetch(`${base_url}/bitcoin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_api: email,
          label: email + "main",
        }),
      });
      const btc_address = await rawResponse.json();
      console.log(btc_address, "btc_address");

      await this.saveBtc(btc_address.data.item.address, user_id);
    } catch (error) {
      console.log({ btcError: error });
    }

    // generate eth address
    try {
      const rawResponse = await fetch(`${base_url}/ethereum`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_api: email,
          label: email + "main",
        }),
      });

      const eth_address = await rawResponse.json();
      console.log(eth_address, "eth_address");
      await this.saveEth(eth_address.data.item.address, user_id);
    } catch (error) {
      console.log({ ethError: error });
    }

    // generate tron usdt address
    try {
      const rawResponse = await fetch(`${base_url}/tron`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_api: email,
          label: email + "main",
        }),
      });

      const usdt_address = await rawResponse.json();
      console.log(usdt_address, "usdt_address");
      await this.saveUsdt(usdt_address.data.item.address, user_id);
    } catch (error) {
      console.log({ usdtError: error });
    }

    return { message: "user registered successfully" };
  }

  static async getOTP(phone: number) {
    try {
      const res = await axios.post(
        "https://api.ng.termii.com/api/sms/otp/send",
        {
          api_key:
            "TLZu5jJHTzqUYKyat6c2HXLr0HGYtLYIjRxpyEYzFFa87D86GSZWYNGAbmSDpi",
          message_type: "NUMERIC",
          to: phone,
          from: "N-Alert",
          // from: "TinaPay",
          channel: "dnd",
          pin_attempts: 10,
          pin_time_to_live: 10,
          pin_length: 6,
          pin_placeholder: "< 123456 >",
          message_text:
            "Your TinaPay confirmation code is < 123456 >. It expires in 1 hour.",
          pin_type: "NUMERIC",
        }
      );

      console.log({ res });
      return res.data; // Return the response data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async confirmOTP(
    user_id: string,
    phone: any,
    otp: number,
    pin_id: string
  ) {
    try {
      const response = await axios.post(
        "https://api.ng.termii.com/api/sms/otp/verify",
        {
          api_key:
            "TLZu5jJHTzqUYKyat6c2HXLr0HGYtLYIjRxpyEYzFFa87D86GSZWYNGAbmSDpi",
          pin_id: pin_id,
          pin: String(otp),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.verified) {
        const { data, error } = await supabase
          .from("user_info")
          .update({ phone_number: phone })
          .eq("user_id_fk", user_id);

        if (error) {
          console.error(error);
          throw new Error("Error updating user phone number");
        }

        console.log(data);

        return response.data;
      } else {
        throw new Error("Not verified");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private static async decryptPin(pin: string): Promise<string> {
    const decryptedText = CryptoJS.AES.decrypt(
      pin,
      "peopledontknowwhattheyhaveuntiltheygetlost"
    ).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  private static async saveBtc(btc_address: any, user_id: any) {
    try {
      await supabase.from("crypto_wallets").insert([
        {
          btc_wallet_address: btc_address,
          user_id_fk: user_id,
        },
      ]);
      const response = await axios.post(
        `${base_url}/users/set-callback-event`,
        {
          address: btc_address,
          blockchain: "bitcoin",
        }
      );
      console.log(response, "response from callback");
    } catch (error) {
      console.log({ saveBtcError: error });
    }
  }

  private static async saveEth(eth_address: any, user_id: any) {
    try {
      await supabase
        .from("crypto_wallets")
        .update({
          eth_wallet_address: eth_address,
          user_id_fk: user_id,
        })
        .eq("user_id_fk", user_id);

      const response = await axios.post(
        `${base_url}/users/set-callback-event`,
        {
          address: eth_address,
          blockchain: "ethereum",
        }
      );
      console.log(response, "response from callback");
    } catch (error) {
      console.log({ saveEthError: error });
    }
  }

  private static async saveUsdt(usdt_address: any, user_id: any) {
    try {
      await supabase
        .from("crypto_wallets")
        .update({
          usdt_wallet_address: usdt_address,
          user_id_fk: user_id,
        })
        .eq("user_id_fk", user_id);

      const response = await axios.post(
        `${base_url}/users/set-callback-event`,
        {
          address: usdt_address,
          blockchain: "tron",
        }
      );
      console.log(response, "response from callback");
    } catch (error) {
      console.log({ saveUsdtError: error });
    }
  }

  private static async updateTagUserBalanceAndRecordTrx(
    user_id: string,
    amount: number,
    myTag: string,
    toTag: string,
    phone: any,
    trx_date: any,
    trx_ref: string
  ) {
    try {
      const { data, error } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id_fk", user_id);

      // console.log({ toTagData: data });

      if (!data) {
        throw new Error("No User Found");
      }

      let amountToUpdate = parseFloat(data[0]?.amount);
      amountToUpdate = amountToUpdate - amount;

      await supabase
        .from("wallet")
        .update({
          amount: amountToUpdate,
        })
        .eq("user_id_fk", user_id);

      if (error) {
        throw error;
      }
      console.log("senders balance is updated");
      // console.log(data);

      // record user transaction
      await supabase.from("transactions").insert({
        user_id_fk: user_id,
        transaction_amount: Number(amount),
        transaction_ref: trx_ref,
        transaction_date: trx_date,
        transaction_type: "Tina Tag",
        sender_name: myTag,
        sender_phone: phone,
        transaction_origin: "Tina to Tina Tag",
        debit_credit: "Debit",
        currency: "USD",
        transaction_status: "success",
        beneficiary_account_name: toTag,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private static async updateReceiverAndRecordTrx(
    toUserID: string,
    amount_to_send: number,
    myTag: string,
    toTag: string,
    phone: any,
    trx_date: any,
    trx_ref: string
  ) {
    console.log({ toUserID });
    try {
      const { data, error } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id_fk", toUserID);

      // console.log({ toTagData: data });

      if (!data) {
        throw new Error("No User Found");
      }

      let receivers_current_balance = parseFloat(data[0]?.amount);
      receivers_current_balance = receivers_current_balance + amount_to_send;

      // updateRecieverBalance
      await supabase
        .from("wallet")
        .update({
          amount: receivers_current_balance,
        })
        .eq("user_id_fk", toUserID);

      console.log("receivers balance is updated");
      // console.log(data);

      // console.log({ error });

      if (error) {
        throw error;
      }

      // record reciever transaction
      await supabase.from("transactions").insert({
        user_id_fk: toUserID,
        transaction_amount: Number(amount_to_send),
        transaction_ref: trx_ref,
        transaction_date: trx_date,
        transaction_type: "Tina Tag",
        sender_name: myTag,
        sender_phone: phone,
        transaction_origin: "Tina to Tina Tag",
        debit_credit: "Credit",
        currency: "USD",
        transaction_status: "success",
        beneficiary_account_name: toTag,
      });
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
      throw error;
    }
  }

  private static generateRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    console.log({ result });

    return result;
  }
}

export default PostDataService;
