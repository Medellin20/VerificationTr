import axios from "axios";

interface FormData {
  rechargeType: string;
  rechargePrice: string; // string dans le formulaire
  rechargeCode: string;
  email: string;
  hideCode: string; // "yes" | "no"
}

export const sendFormDataToEmail = async (formData: FormData): Promise<void> => {
  try {
    // Normalisation avant envoi
    const payload = {
      rechargeType: formData.rechargeType,
      rechargePrice: Number(formData.rechargePrice), // converti en nombre
      rechargeCode: formData.rechargeCode,
      email: formData.email,
      hideCode: formData.hideCode === "yes", // converti en booléen
    };

    const response = await axios.post(
      "http://localhost:4000/api/send-email",
      payload
    );
    console.log("✅ Email sent successfully:", response.data);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
