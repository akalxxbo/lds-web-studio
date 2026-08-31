exports.handler = async function (event, context) {
  // Solo aceptar peticiones POST
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    
    const retellApiKey = process.env.RETELL_API_KEY || "key_f17ff33117464bd527cbb74821d8";
    const retellAgentId = process.env.RETELL_AGENT_ID || "agent_cc15431e9b593a91ae4882083e";
    const retellFromNumber = process.env.RETELL_FROM_NUMBER || "+34960731374";

    let phone = payload.phone || "";
    phone = phone.replace(/[\s\-\(\)]/g, "");
    if (phone && !phone.startsWith("+")) {
      if (phone.startsWith("00")) {
        phone = "+" + phone.slice(2);
      } else {
        phone = "+34" + phone;
      }
    }

    const retellBody = {
      from_number: retellFromNumber,
      to_number: phone,
      override_agent_id: retellAgentId,
      agent_id: retellAgentId,
      retell_llm_dynamic_variables: {
        nombre: payload.fullName || "Cliente",
        servicio: payload.serviceInterest || "Web Studio"
      }
    };

    console.log("📞 [NETLIFY RETELL] Disparando llamada a:", phone);

    const response = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${retellApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(retellBody)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("⚠️ [NETLIFY RETELL ERROR]", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: error.message || "Error al disparar llamada" })
    };
  }
};
