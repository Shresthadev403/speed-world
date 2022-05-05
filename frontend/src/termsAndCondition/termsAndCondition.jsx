import "../css/global.css";
import {Link}from 'react-router-dom'

function TermsAndCondition() {
  return (
    <div className="component">
      <h3>Terms and Condition</h3>
      <div>
        This is a legally binding agreement between (“you”) and Speedworld
        Helmets regarding your use of the Site. “You” refers to the entity bound
        by these Terms of Use (“Terms”), whether that is a natural person who
        must be at least 18 years of age, or a corporate entity.By using this
        site you agree the following terms of use:
        <ol>
          
          <li>
            {" "}
            Commercial use or use on behalf of any third party is prohibited,
            except as explicitly permitted by us in advance.
          </li>
          <li>
            We grant you a limited license to access and make personal use of
            this Site, but not to download (excluding page caches) or modify the
            Site or any portion of it in any manner. This license does not
            include any resale or commercial use of this Site or its contents;
            any collection and use of any product listings, descriptions, or
            prices; any derivative use of this Site or its contents; any
            downloading or copying of account information for the benefit of
            another seller; or any use of data mining, robots, or similar data
            gathering and extraction tools.
          </li>
          <li>
            This Site or any portion of it (including but not limited to any
            copyrighted material, trademarks, or other proprietary information)
            may not be reproduced, duplicated, copied, sold, resold, visited,
            distributed or otherwise exploited for any commercial purpose
            without express written consent by us as may be applicable.
          </li>
          <li>
          Refusal to comply with the Terms and Conditions described herein or any other guidelines and policies related to the use of the Site as available on the Site at all times.
          </li>
          <li>
          Impersonate any person or entity or to falsely state or otherwise misrepresent your affiliation with any person or entity.
          </li>
          <li>
          Use the Site for illegal purposes
          </li>
          <li>
          Attempt to gain unauthorized access to or otherwise interfere or disrupt other computer systems or networks connected to the Platform or Services.

          </li>
          <li>Post, promote or transmit through the Site any prohibited materials as deemed illegal by The People's Republic of Nepal</li>
       <li>
       Use or upload, in any way, any software or material that contains, or which you have reason to suspect that contains, viruses, damaging components, malicious code or harmful components which may impair or corrupt the Site’s data or damage or interfere with the operation of another Customer’s computer or mobile device or the Site and use the Site other than in conformance with the acceptable use policies of any connected computer networks, any applicable Internet standards and any other applicable laws.
       </li>
        </ol>
      </div>
      You agree and undertake not to perform restricted activities listed within this section; undertaking these activities will result in an immediate cancellation of your account, services, reviews, orders or any existing incomplete transaction with us and in severe cases may also result in legal action.
      <h3>Contract</h3>
      <div>
         This contract bind you and Speedworld Helmets.The order you make should be valid.you can
         cancel your product by direct communicating with us <b><Link to={'/Contact'}>Contact </Link></b> from here or with 
         given phoneNo given in this site.The price shown in product details are included with VAT.Any 
         discount after ordering our product is considered to be aganinst our terms of use and we may take legal action.
         you must very your product at time of delivery and we donot provide return policy.so verify 
         the products and it's condition at time of delivery.

      </div>
      <h5>Be a good Nepali citizen and avoid any likely illegal activities</h5>
    </div>
  );
}

export default TermsAndCondition;
