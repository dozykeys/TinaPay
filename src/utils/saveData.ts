// import { supabase } from "../constants/supabase";

// class SaveDataService {
//   private baseUrl: string;
//   private jwt_user: string;

//   constructor(baseUrl: string, jwt_user: string) {
//     baseUrl = baseUrl;
//     jwt_user = jwt_user;
//   }

//   public async resetPassword(): Promise<void> {
//     hidePreLoader = false;
//     new_password = new_password.trim();
//     confirm_password = confirm_password.trim();

//     if (new_password === "") {
//       M.toast({ html: '<b class="red-text">Please enter a password</b>' });
//       hidePreLoader = true;
//     } else {
//       let { data, error } = await supabase
//         .from("user_pin")
//         .select("flandle_user_pin")
//         .eq("user_id_fk", id);

//       if (data.length === 0) {
//         console.log("Pin not matching");
//       } else {
//         if (new_password !== confirm_password) {
//           M.toast({
//             html: '<b class="red-text">Password does not match</b>',
//           });
//           hidePreLoader = true;
//         } else {
//           try {
//             const { data, error } = await supabase.auth.updateUser({
//               password: new_password,
//             });
//             console.log(data);
//             hidePasswordForm = true;
//             hidePreLoader = true;
//             M.toast({
//               html: '<b class="yellow-text">Password has been updated</b>',
//             });
//             hideSettingMenu = false;
//           } catch (error) {
//             console.error(error);
//           }
//         }
//       }
//     }
//   }

//   public async updateUserInfo(): Promise<void> {
//     try {
//       first_name = first_name.trim();
//       last_name = last_name.trim();
//       hidePreLoader = false;

//       if (first_name === "" || last_name === "") {
//         hidePreLoader = true;
//         M.toast({ html: '<b class="red-text">All fields are required</b>' });
//       } else {
//         let isTagError = checkTag();
//         console.log("Tag error is true", isTagError);
//         if (isTagError) {
//           console.log("Tag error is true inside if", isTagError);
//         } else {
//           let { data, error } = await supabase
//             .from("user_info")
//             .update({
//               user_id_fk: id,
//               first_name: first_name,
//               last_name: last_name,
//               country: country,
//             })
//             .eq("user_id_fk", id);

//           console.log(data);
//           console.log("Updated");
//           hideUserInfoForm = true;
//           hidePreLoader = true;
//           getUserInfo(id);
//           hideSettingMenu = false;
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async recordTransaction(
//     user_id: string,
//     ref: string,
//     transaction_status: string
//   ): Promise<void> {
//     const first_name = beneficiary_name.split(" ")[0];
//     let { data, error } = await supabase.from("transactions").insert({
//       user_id_fk: user_id,
//       transaction_amount: amountToSend,
//       transaction_ref: ref,
//       transaction_date: transaction_date,
//       transaction_type: "Fiat",
//       sender_name: sen_name,
//       sender_phone: phone_number,
//       transaction_origin: "Tina Bank Transfer",
//       debit_credit: "Debit",
//       currency: "NGN",
//       transaction_status: transaction_status,
//       charges: charges_on_amount,
//       beneficiary_account_name: first_name,
//       beneficiary_account_number: beneficiary_account,
//       beneficiary_bank_name: selected_bank,
//     });

//     console.log("Data after update", data);
//   }

//   public async recordTransactionP2P(
//     user_id: string,
//     ref: string,
//     transaction_status: string
//   ): Promise<void> {
//     const first_name = beneficiary_name.split(" ")[0];
//     let { data, error } = await supabase.from("transactions").insert({
//       user_id_fk: user_id,
//       transaction_amount: amountToSend,
//       transaction_ref: ref,
//       transaction_date: transaction_date,
//       transaction_type: "P2P",
//       sender_name: sen_name,
//       sender_phone: phone_number,
//       transaction_origin: "Tina P2P",
//       debit_credit: "Debit",
//       currency: "NGN",
//       transaction_status: transaction_status,
//       charges: charges_on_amount,
//       beneficiary_account_name: first_name,
//       beneficiary_account_number: beneficiary_account,
//       beneficiary_bank_name: bank_nameP2P,
//     });

//     console.log("Data after update", data);

//     // Send P2P email
//     console.log({ user_id });

//     await fetch("https://crypto.tinapay.co/api/notifications/sendemail", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         to: "someemail@gmail.com",
//         subject: `Bank Transfer P2P Request of ₦${amountToSend} by ${sen_name}`,
//         content: `${sen_name} is making a request of ₦${amountToSend} to ${bank_nameP2P} with account number ${sen_name}`,
//       }),
//     });
//   }

//   public async updateBalance(): Promise<void> {
//     hidePreLoader = false;
//     balance = convertToUSDT(balance);

//     try {
//       let { data, error } = await supabase
//         .from("wallet")
//         .update({
//           amount: balance,
//         })
//         .eq("user_id_fk", id);
//       hideSent = false;
//       hideTransferOverview = true;
//       hideAreYouSure = true;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async savePin(): Promise<void> {
//     if (first_pin === "" && inputed_pin) {
//       first_pin = inputed_pin;
//       console.log(first_pin);
//       pin_button_status = "Confirm";
//       handleClearInput();
//     } else if (first_pin && inputed_pin) {
//       if (first_pin !== inputed_pin) {
//         M.toast({
//           html: '<b class="white-text">Pin does not match</b>',
//           classes: "error_",
//         });
//         pin_button_status = "Next";
//         first_pin = "";
//         inputed_pin = "";
//         handleClearInput();
//       } else {
//         first_pin = encryptPin(first_pin);
//         let { data, error } = await supabase.from("user_pin").insert([
//           {
//             user_id_fk: id,
//             flandle_user_pin: first_pin,
//           },
//         ]);
//         M.toast({
//           html: '<b class="white-text">Pin setup successful!</b>',
//           classes: "success_",
//         });
//         hideTagSetUp = true;
//         hidePinSetup = true;
//         hideAccountPin = false;
//       }
//     } else {
//       M.toast({
//         html: '<b class="white-text">Error setting transaction pin</b>',
//         classes: "error_",
//       });
//     }
//   }

//   public async saveAccountPin(): Promise<void> {
//     if (!inputed_pin) {
//       M.toast({
//         html: '<b class="white-text">Please input your account pin</b>',
//         classes: "error_",
//       });
//     } else {
//       let { data, error } = await supabase
//         .from("user_info")
//         .update([
//           {
//             account_pin: inputed_pin,
//           },
//         ])
//         .eq("user_id_fk", id);
//       M.toast({
//         html: '<b class="white-text">Pin setup successful!</b>',
//         classes: "success_",
//       });
//       localStorage.setItem("_id", id);
//       hideDashboard = false;
//       hideMenu = false;
//       hideShortCuts = false;
//       hideTransactions = false;
//       hideTagSetUp = true;
//       hidePinSetup = true;
//       hideAccountPin = true;
//     }
//   }

//   public async saveTag(tag: string): Promise<void> {
//     try {
//       let { data, error } = await supabase
//         .from("user_info")
//         .update({
//           tag: tag,
//         })
//         .eq("user_id_fk", id);
//       checkUserPinSetup(id);

//       M.toast({ html: '<b class="yellow-text">Tag saved</b>' });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   public async saveBtc(btc_address: string): Promise<void> {
//     try {
//       let { data, error } = await supabase.from("crypto_wallets").insert([
//         {
//           btc_wallet_address: btc_address,
//           user_id_fk: id,
//         },
//       ]);
//       console.log(data);
//       checkWalletAddressExist();
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// export default TinaPayService;
