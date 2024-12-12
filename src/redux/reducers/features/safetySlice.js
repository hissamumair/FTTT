// src/redux/slices/safetySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      heading: "Safety equipments",
      summary:
        "For a safe expedition on K2, it is crucial to have specialized safety equipment due to the extreme conditions and high risks involved. Here's a list of essential ",
    },
    {
      title: "Safety equipment:",
      day: "Avalanche Transceiver: ",
      desc: "(e.g., Black Diamond Guide BT) for locating buried climbers.",
    },
    {
      title: "Personal Safety Devices:",
      day: "Personal Locator Beacon (PLB): ",
      desc: "(e.g., ACR ResQLink 400) to send distress signals with GPS location.",
    },
    {
      title: "Weather & Environmental Safety:",
      day: "Weather Meter: ",
      desc: "Drive from Skardu to Askole, the last village accessible by road. The journey takes about 6-8 hours and offers stunning views of the Karakoram landscape.",
    },
    {
      title: "First Aid & Survival Gear:",
      day: "Comprehensive First Aid Kit:",
      desc: "Customized with items like bandages, antiseptics, painkillers, and altitude sickness medication.",
    },
    {
      title: "Fire & Heat Source:",
      day: "Fire Starter Kit:",
      desc: "Waterproof matches, lighter, and fire starter blocks.",
    },
    {
      title: "Lighting & Visibility:",
      day: "Headlamp:",
      desc: "(e.g., Petzl NAO+) with high luminosity and long battery life for night-time visibility.",
    },
  ],
  images: [
    require("../../../assets/icons/equipment.png"),
    require("../../../assets/icons/tools3.jpg"),
    require("../../../assets/icons/tools4.jpg"),
    require("../../../assets/icons/tools2.jpg"),
  ],
};

const safetySlice = createSlice({
  name: 'safety',
  initialState,
  reducers: {
    // Add any actions you may need later, for example, to update data or images
  },
});

export default safetySlice.reducer;
