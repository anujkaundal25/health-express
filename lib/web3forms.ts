export type Web3FormsType = "booking" | "contact";

const ACCESS_KEY = "38564f66-8b2d-45a2-8756-75fe93df1fe3";
const ENDPOINT = "https://api.web3forms.com/submit";

export async function submitWeb3Forms(
  type: Web3FormsType,
  fields: Record<string, unknown>
): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      access_key: ACCESS_KEY,
      subject: `New ${type} form submission - Health Express`,
      from_name: "Health Express Website",
      formType: type,
    }),
  });
  const result: unknown = await response.json().catch(() => null);

  if (
    !response.ok ||
    typeof result !== "object" ||
    result === null ||
    !("success" in result) ||
    result.success !== true
  ) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : `Form submission failed (HTTP ${response.status}). Please try again.`;
    throw new Error(message);
  }
}
