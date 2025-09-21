import axios from "axios";

interface FormData {
  rechargeType: string;
  rechargePrice: string;
  rechargeCode: string;
  email: string;
  hideCode: string;
}

export const sendFormDataToEmail = async (formData: FormData): Promise<void> => {
  try {
    const response = await axios.post(
      // Mets ici l’URL de ton backend (Railway/Render ou localhost)
      "http://localhost:3001/api/send-email",
      formData
    );
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
