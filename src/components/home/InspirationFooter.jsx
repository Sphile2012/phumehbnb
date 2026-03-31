import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const tabs = ["Popular", "Arts & culture", "Beach", "Mountains", "Outdoors", "Things to do", "Phumeh-friendly apartments"];

const destinations = {
  Popular: [
    { city: "Cape Town", type: "House rentals" },
    { city: "Durban", type: "Condo rentals" },
    { city: "Stellenbosch", type: "House rentals" },
    { city: "Johannesburg", type: "Apartment rentals" },
    { city: "Knysna", type: "House rentals" },
    { city: "Port Elizabeth", type: "Monthly Rentals" },
    { city: "Hermanus", type: "Vacation rentals" },
    { city: "Franschhoek", type: "House rentals" },
    { city: "Plettenberg Bay", type: "Condo rentals" },
    { city: "George", type: "Monthly Rentals" },
    { city: "Mossel Bay", type: "House rentals" },
    { city: "Oudtshoorn", type: "Vacation rentals" },
  ],
  "Arts & culture": [
    { city: "Cape Town", type: "Art retreats" },
    { city: "Johannesburg", type: "Cultural stays" },
    { city: "Durban", type: "Heritage homes" },
    { city: "Pretoria", type: "Museum stays" },
    { city: "Stellenbosch", type: "Wine estates" },
    { city: "Franschhoek", type: "Boutique rentals" },
  ],
  Beach: [
    { city: "Durban", type: "Beachfront rentals" },
    { city: "Hermanus", type: "Ocean view homes" },
    { city: "Plettenberg Bay", type: "Beach houses" },
    { city: "Knysna", type: "Lagoon homes" },
    { city: "Mossel Bay", type: "Seaside rentals" },
    { city: "Jeffrey's Bay", type: "Surf rentals" },
  ],
  Mountains: [
    { city: "Drakensberg", type: "Mountain retreats" },
    { city: "Clarens", type: "Chalet rentals" },
    { city: "Dullstroom", type: "Cabin stays" },
    { city: "Hogsback", type: "Forest rentals" },
    { city: "Waterberg", type: "Game lodge stays" },
    { city: "Swartberg", type: "Eco stays" },
  ],
  Outdoors: [
    { city: "Kruger National Park", type: "Safari stays" },
    { city: "Addo", type: "Game reserve rentals" },
    { city: "Pilanesberg", type: "Bush lodges" },
    { city: "iSimangaliso", type: "Wetland stays" },
    { city: "Hluhluwe", type: "Wildlife rentals" },
    { city: "Mapungubwe", type: "Heritage lodges" },
  ],
  "Things to do": [
    { city: "Cape Town", type: "Adventure stays" },
    { city: "Durban", type: "Activity rentals" },
    { city: "Johannesburg", type: "City experiences" },
    { city: "Stellenbosch", type: "Vineyard stays" },
    { city: "George", type: "Golf retreats" },
    { city: "Port Alfred", type: "Water sports stays" },
  ],
  "Phumeh-friendly apartments": [
    { city: "Cape Town CBD", type: "City apartments" },
    { city: "Sandton", type: "Business stays" },
    { city: "Umhlanga", type: "Modern apartments" },
    { city: "Green Point", type: "Urban flats" },
    { city: "Rosebank", type: "Executive rentals" },
    { city: "V&A Waterfront", type: "Luxury apartments" },
  ],
};

const footerLinks = {
  Support: ["Help Centre", "Cover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighbourhood concern"],
  Hosting: ["List your home", "Cover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly", "Phumeh-friendly apartments"],
  Phumeh: ["Newsroom", "New features", "Careers", "Investors", "Gift cards", "Phumeh.org emergency stays"],
};

export default function InspirationFooter() {
  const [activeTab, setActiveTab] = useState("Popular");
  const [showMore, setShowMore] = useState(false);
  const [showFooterSection, setShowFooterSection] = useState({ Support: false, Hosting: false, Phumeh: false });

  const items = destinations[activeTab] || [];
  const visible = showMore ? items : items.slice(0, 9);

  return (
    <div className="mt-16 border-t border-gray-200">
      {/* Inspiration section */}
      <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        <h2 className="text-xl font-semibold mb-4">Inspiration for future getaways</h2>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 overflow-x-auto mb-6" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setShowMore(false); }}
              className={`pb-3 text-sm whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-gray-900 text-gray-900 font-semibold" : "border-transparent text-gray-500 hover:text-gray-800"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-4">
          {visible.map((d, i) => (
            <div key={i}>
              <p className="font-semibold text-sm text-gray-900">{d.city}</p>
              <p className="text-sm text-gray-500">{d.type}</p>
            </div>
          ))}
        </div>

        {items.length > 9 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-5 flex items-center gap-1 text-sm font-semibold text-gray-900 underline"
          >
            {showMore ? "Show less" : "Show more"} {showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Footer links */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <button
                  className="flex items-center justify-between w-full md:cursor-default"
                  onClick={() => setShowFooterSection(prev => ({ ...prev, [section]: !prev[section] }))}
                >
                  <h3 className="font-semibold text-sm text-gray-900">{section}</h3>
                  <ChevronDown className={`h-4 w-4 md:hidden text-gray-500 transition-transform ${showFooterSection[section] ? "rotate-180" : ""}`} />
                </button>
                <ul className={`mt-3 space-y-2 ${showFooterSection[section] ? "block" : "hidden md:block"}`}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-600 hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 max-w-[1760px] mx-auto px-4 md:px-8 lg:px-12 py-4 flex flex-wrap gap-3 text-xs text-gray-500">
          <span>© 2026 Phumeh, Inc.</span>
          <span>·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </div>
  );
}
