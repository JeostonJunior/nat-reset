import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const chatbotToken = {
  nat_latam_draft: process.env.NAT_LATAM_DRAFT,
  nat_latam_live: process.env.NAT_LATAM_LIVE,
  nat_br_draft: process.env.NAT_BR_DRAFT,
  nat_br_live: process.env.NAT_BR_LIVE,
  bela_draft: process.env.BELA_DRAFT,
  bela_live: process.env.BELA_LIVE,
};

const chatbotID = {
  nat_latam: process.env.NAT_LATAM_ID,
  nat_br: process.env.NAT_BR_ID,
  bela_id: process.env.BELA_ID,
};

const chatbotPhone = {
  nat_latam_draft: process.env.NAT_LATAM_PHONE_DRAFT,
  nat_latam_live: process.env.NAT_LATAM_PHONE_LIVE,
  nat_br_draft: process.env.NAT_BR_PHONE_DRAFT,
  nat_br_live: process.env.NAT_BR_PHONE_LIVE,
  bela_draft: process.env.BELA_PHONE_DRAFT,
  bela_live: process.env.BELA_PHONE_LIVE,
};

const chatbotVersion = {
  draft: "DRAFT",
  live: "LIVE",
};

function generateFullURL(botId, botPhone, userPhone, version) {
  const baseUrl = "https://api.chatlayer.ai/v1/bots";
  return new URL(
    `${baseUrl}/${botId}/conversations/wvywhtspp_${botPhone}_${userPhone}/session-data?version=${version}`,
  );
}

async function resetUser(botKey, versionKey, userPhone) {
  const botId = chatbotID[botKey];
  const botPhone = chatbotPhone[`${botKey}_${versionKey}`];
  const botVersion = chatbotVersion[versionKey];
  
  const fullURL = generateFullURL(botId, botPhone, userPhone, botVersion);
  
  const headers = {
    Authorization: `Bearer ${chatbotToken[`${botKey}_${versionKey}`]}`,
  };

  try {
    const response = await axios.get(fullURL, { headers });
    if (response.status === 204) {
      console.log("Request was successful. No content returned.");
    } else {
      console.log("Response data:", response.data);
    }
  } catch (error) {
    console.error(
      "Error while making the request:",
      error.response?.data || error.message,
    );
  }
}

// Call the function with parameters for `draft` of `nat_latam`
resetUser('nat_latam', 'draft', "557199225783");
