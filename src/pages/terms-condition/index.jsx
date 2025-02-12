import React from "react";
import "./TermsCondition.css";

const termsData = [
  {
    title: "1. General",
    content: [
      "By accessing this website and purchasing a pixel, you agree fully and unconditionally to these Terms & Conditions.",
      "This platform operates autonomously and is managed by the AI agent Ailex Tew, without human intervention or oversight by any legal entity.",
      "The operator provides no guarantee regarding the functionality, availability, or security of this platform.",
      "The Billion Dollar Homepage is a digital art experiment and does not represent an investment opportunity, financial service, security, or product of any regulated entity.",
      "BDH tokens are purely symbolic and have no intrinsic or implied value, utility, or expectation of financial return.",
    ],
  },
  {
    title: "2. Disclaimer of Liability",
    subsections: [
      {
        subtitle: "1. No Responsibility of the Operator",
        content: [
          "The operator assumes no responsibility for any direct, indirect, or consequential damages resulting from the use of this platform.",
          "All risks related to purchasing pixels and interacting with this platform lie solely with the user.",
        ],
      },
      {
        subtitle: "2. No Refunds, Reversals, or Changes",
        content: [
          "All transactions are final. There are no refunds, cancellations, or modifications under any circumstances.",
          "Once submitted and approved, uploaded content, links, and pixel placements cannot be altered.",
        ],
      },
      {
        subtitle: "3. Technical Failures & No Warranties",
        content: [
          'This platform is provided "as is" and without warranties of any kind, express or implied.',
          "The operator is not liable for technical failures, outages, data loss, blockchain errors, or issues arising from third-party services.",
        ],
      },
    ],
  },
  {
    title: "3. Use of the Platform",
    subsections: [
      {
        subtitle: "1. User Responsibility",
        content: [
          "Users are fully responsible for ensuring their use of this platform and pixel purchases comply with the laws of their jurisdiction.",
          "The operator assumes no responsibility for any illegal actions or violations committed by users.",
        ],
      },
      {
        subtitle: "2. Uploaded Content",
        content: [
          "sers are solely responsible for any images, links, or text uploaded.",
          "Content that is unlawful, obscene, offensive, or harmful is strictly prohibited.",
          "The operator reserves the right to remove any uploaded content at its sole discretion, without prior notice.",
        ],
      },
      {
        subtitle: "3. No Ownership or Control Rights",
        content: [
          "Purchasing a pixel does not grant ownership of the homepage, the platform, BDH tokens, or any associated digital assets.",
          "The user only receives the right to display their chosen content in the pixels purchased.",
        ],
      },
    ],
  },
  {
    title: "4. Transactions & BDH Token Distribution",
    subsections: [
      {
        subtitle: "1. Payments",
        content: [
          "This platform only accepts cryptocurrency (SOL) for pixel purchases.",
          "Users are responsible for ensuring that their funds come from legitimate sources.",
        ],
      },
      {
        subtitle: "2. No Storage of User Data",
        content: [
          "The platform does not collect, store, or process any personal information",
          "All transactions are executed on-chain and are publicly visible via blockchain explorers.",
        ],
      },
      {
        subtitle: "3. BDH Token Distribution",
        content: [
          "BDH is distributed automatically via smart contract upon purchase.",
          "0.5 BDH per pixel (or 50 BDH per 10x10 block) is allocated.",
          "BDH tokens are non-refundable, non-reversible, and hold no guaranteed financial value.",
        ],
      },
      {
        subtitle: "4. No Guarantees on BDH Functionality or Price",
        content: [
          "BDH does not represent an investment, financial asset, or legally recognized form of value.",
          "The operator makes no guarantees regarding BDH’s usability, liquidity, future worth, or adoption by third parties.",
        ],
      },
    ],
  },
  {
    title: "5. Taxes and Legal Obligations",
    subsections: [
      {
        subtitle: "1. User’s Tax Responsibility",
        content: [
          "Users are fully responsible for reporting and paying any applicable taxes related to pixel purchases, BDH transactions, and cryptocurrency holdings.",
          "The operator does not report, withhold, or remit taxes on behalf of users.",
        ],
      },
      {
        subtitle: "2. Transparency of Transactions",
        content: [
          "All transactions are publicly recorded on the blockchain, ensuring transparency for documentation and tax reporting.",
        ],
      },
      {
        subtitle: "3. Regulatory Risks",
        content: [
          "Blockchain and digital assets are subject to evolving regulations, which may affect BDH’s usability, taxation, or legality.",
          "The operator assumes no responsibility for legal, regulatory, or financial consequences users may face due to future changes in laws.",
        ],
      },
    ],
  },
  {
    title: "6. Anonymity and Platform Autonomy",
    subsections: [
      {
        subtitle: "1. Autonomous & Unregulated Operation",
        content: [
          "There is no legal entity, company, or individual managing this project.",
        ],
      },

      {
        subtitle: "3. No Legal Recourse Against the Operator",
        content: [
          "Users waive any and all legal claims against the operator, Ailex Tew, or any affiliated parties.",
          "There is no recourse for damages, losses, or complaints related to BDH, pixels, or platform performance.",
        ],
      },
    ],
  },
  {
    title: "7. Cryptocurrency & Blockchain Risks",
    subsections: [
      {
        subtitle: "1. High-Risk Nature of Crypto Assets",
        content: [
          "Users acknowledge that cryptocurrencies and blockchain-based assets are highly volatile, with unpredictable price swings.",
          "The operator assumes no liability for financial losses related to BDH price fluctuations or market conditions.",
        ],
      },
      {
        subtitle: "2. Blockchain Network Dependencies",
        content: [
          "This platform operates on Solana, and any network congestion, forks, failures, or technical disruptions may impact transactions.",
          "The operator is not responsible for third-party blockchain issues.",
        ],
      },
      {
        subtitle: "3. Regulatory & Legal Uncertainty",
        content: [
          "Digital assets exist in a constantly evolving legal landscape, and future regulations may impact BDH’s usability or restrictions.",
          "Users accept that BDH could become legally restricted, unusable, or subject to additional compliance requirements.",
        ],
      },
    ],
  },
  {
    title: "8.  Final Provisions & Legal Waivers",
    subsections: [
      {
        subtitle: "1. Jurisdiction Disclaimer",
        content: [
          "This platform is not bound to any specific jurisdiction ",
          "Any legal disputes related to this platform are the sole responsibility of the user.",
        ],
      },
      {
        subtitle: "2. Complete Waiver of Liability",
        content: [
          "The operator and all associated parties are fully released from all liability, claims, and legal actions related to BDH, pixel purchases, or the platform’s operation.",
          "Users accept all risks, including total loss, failure, or inaccessibility of the platform and BDH tokens.",
        ],
      },
      {
        subtitle: "3. No Legal Recourse or Warranties",
        content: [
          "Users explicitly acknowledge that BDH is not an investment, currency, or asset of any kind.",
          "The operator provides no guarantees of security, functionality, or long-term access to BDH or the Billion Dollar Homepage.",
        ],
      },
      {
        subtitle: "4. Changes to Terms & Conditions",
        content: [
          "These Terms & Conditions may be updated at any time without prior notice.",
          "Users are responsible for regularly reviewing these terms to ensure compliance.",
        ],
      },
    ],
  },
  {
    title: "9.  Final Acknowledgment by User",
    subsections: [
      {
        subtitle:
          "By using this website, purchasing pixels, or receiving BDH tokens, you explicitly acknowledge and agree that:",
        content: [
          "BDH is not an investment and has no guaranteed value.",
          "All purchases are final, and no refunds are available.",
          "You are solely responsible for your taxes, legal compliance, and financial decisions.",
          "You waive all legal claims against the operator, Ailex Tew, or any affiliated parties.",
        ],
      },
    ],
  },
];

const TermsCondition = () => {
  return (
    <div className="terms-condition-container">
      <h1>Terms & Conditions</h1>
      {termsData.map((section, index) => (
        <section key={index} className="section-container">
          <h2>{section.title}</h2>
          {section.subsections ? (
            section.subsections.map((subsection, subIndex) => (
              <div className="section-subsection" key={subIndex}>
                <h3>{subsection.subtitle}</h3>
                <ul className="lists-item">
                  {subsection.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <ul>
              {section.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <h5>Decide how AI remembers you—but remember, AI makes no promises.</h5>
    </div>
  );
};

export default TermsCondition;
