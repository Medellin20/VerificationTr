interface FormData {
  rechargeType: string;
  rechargePrice: string;
  rechargeCode: string;
  email: string;
  hideCode: string;
}

const encodeFormData = (formName: string, formData: FormData) => {
  const payload = new URLSearchParams();

  payload.set("form-name", formName);
  payload.set("rechargeType", formData.rechargeType);
  payload.set("rechargePrice", formData.rechargePrice);
  payload.set("rechargeCode", formData.rechargeCode);
  payload.set("email", formData.email);
  payload.set("hideCode", formData.hideCode);

  return payload.toString();
};

export const sendFormDataToEmail = async (formData: FormData): Promise<void> => {
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData("recharge-verification", formData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit Netlify form");
  }
};
