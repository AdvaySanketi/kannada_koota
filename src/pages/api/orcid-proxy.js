import axios from "axios";
import crypto from "crypto";

function generateUniqueKey() {
  const uniqueKey = crypto.randomBytes(3).toString("hex").toUpperCase();
  return uniqueKey;
}

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    // Step 1: Exchange authorization code for access token
    const tokenResponse = await fetch("https://orcid.org/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=APP-IKCVN4YJFVHAPSY3&client_secret=4dae20d6-88fe-452b-974b-338150667917&grant_type=authorization_code&redirect_uri=https://kerosene.app/orcid-redirect/&code=${code}`,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json(tokenData);
    }

    // Step 2: Fetch user data using access token
    const userResponse = await axios("https://orcid.org/oauth/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/json",
      },
    });

    if (!userResponse.data) {
      return res.status(500).json({ error: "Failed to fetch user info" });
    }

    // Step 3: Fetch additional ORCID data
    const orcidDataResponse = await fetch(
      `https://pub.orcid.org/v3.0/${userResponse.data.sub}/person`,
      {
        headers: {
          Accept: "application/vnd.orcid+json",
        },
      }
    );

    if (!orcidDataResponse.ok) {
      return res.status(500).json({ error: "Failed to fetch ORCID data" });
    }

    const orcidData = await orcidDataResponse.json();

    const fullName = orcidData.name
      ? `${orcidData.name["given-names"].value} ${
          orcidData.name["family-name"]
            ? orcidData.name["family-name"].value
            : ""
        }`
      : tokenData.name;
    const email =
      orcidData.emails && orcidData.emails.email.length > 0
        ? orcidData.emails.email[0].email
        : null;

    // Combine all data
    const data = {
      name: fullName.trim(),
      email: email,
      orcidID: userResponse.data.sub,
      key: generateUniqueKey(),
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching ORCID data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
