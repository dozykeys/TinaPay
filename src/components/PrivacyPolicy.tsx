import { useRef } from 'react';
import Footer from './shared/Footer/Footer';
import Navbar from './shared/Navbar/Navbar';

const PrivacyPolicy = () => {
  const textRef: any = useRef();
  const handleDownload = () => {
    if (textRef.current) {
      const textContent = textRef.current.innerText;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'page-content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <main>
      <Navbar />
      <div
        className="w-[95%] md:w-[78%] py-16 mx-auto flex text-sm flex-col gap-5 bg-white-100"
        ref={textRef}
      >
        <div
          className="row text-[#585f4c] md:py-10"
          style={{ marginLeft: '0px', marginTop: '70px' }}
        >
          <div className="col s12 m4">
            <h1 className="text-3xl font-bold col-span-12 md:col-span-4 mb-12">
              Privacy Policy
            </h1>
          </div>

          <div className="col s12 m8">
            <p>
              This Privacy Policy sets out how our Cryptocurrency platform
              collects, uses, and protects any personal information that you
              provide to us when you use our platform.We are committed to
              ensuring that your privacy is protected. Should we ask you to
              provide certain information by which you can be identified when
              using our platform, then you can be assured that it will only be
              used in accordance with this privacy statement.
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 pt-4 text-[#585f4c]">
              Who are we
            </h5>
            <p>
              TinaPay is a Cryptocurrency Technology Company is a limited
              liability company, registered and incorporated under the laws of
              The Federal Republic of Nigeria with RC NO 2025041 and located in
              Lagos State.
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              What Information We Collect
            </h5>
            <p>We may collect the following information:</p>
            <p className="pl-2">
              <br />
              ● Your name and contact information, including email address and
              phone number
              <br />
              ● Payment information
              <br />
              ● Demographic information such as postcode, preferences and
              interests
              <br />● Other information relevant to customer surveys and/or
              offers
            </p>
            <p>These help us personalize our service to you.</p>
            <p>
              In addition, we may automatically collect certain information
              about your device and usage of the App, such as:
            </p>
            <p>
              ● IP address <br />● Device type <br />● Operating system type and
              version <br />● App version <br />● Usage data, such as the date
              and time of your visit, the pages you view, and the duration of
              your visit
            </p>

            <p>
              We may use cookies and other tracking technologies to collect this
              information. Cookies are small data files that are placed on your
              device when you visit our App. You can disable cookies through
              your device or browser settings, but doing so may limit the
              functionality of the App
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              What We Do with the Information We Collect
            </h5>
            <p>
              We require this information to understand your needs and provide
              you with a better service, and in particular for the following
              reasons:
            </p>
            <p className="pl-2">
              ● Internal record keeping <br />
              ● Process and fulfill your orders <br />● We may use the
              information to improve our products and services <br />
              ● We may periodically send promotional emails about new products,
              special offers or other information which we think you may find
              interesting using the email address which you have provided <br />
              ● From time to time, we may also use your information to contact
              you for market research purposes. We may contact you by email,
              phone, or mail. We may use the information to customize the
              platform according to your interests. <br />
              ● Asking you for feedback <br />
              ● Comply with our legal obligations <br />● Detect and prevent
              fraud and other unauthorized activities <br />
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Storing your information
            </h5>
            <p>
              We store your information securely in our Lagos office, and only
              our staff and businesses we work with can access it. We use
              physical, electronic and management processes to keep your
              information safe. For example: <br />● Access to your information
              is protected by strict user logins <br />● Our servers are locked
              away with multiple physical safeguards <br />
              ● All our staff are trained in information security, and <br />●
              We limit access to your information according to the strict client
              confidentiality laws that apply to business
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Sharing your information
            </h5>
            <p>
              We may share your personal information with third-party service
              providers who perform services on our behalf, such as payment
              processing, shipping, and analytics. These service providers are
              authorized to use your personal information only as necessary to
              provide these services to us. We may also share your information
              with third parties in the following circumstances: <br />
              <p className="pl-2">
                ● With your consent <br />● In response to a subpoena, court
                order, or other legal process <br />
                ● To protect our rights, property, or safety or the rights,
                property, or safety of others <br />
                ● In connection with a merger, acquisition, or sale of all or a
                portion of our business <br />
              </p>
            </p>

            <p>
              We may also share aggregated or de-identified information that
              cannot reasonably be used to identify you. <br />
              <br />
            </p>
            <p>
              Aside from these, we might also occasionally share your
              information with other contractors and groups like marketers,
              advisors, data storage and payment service providers , and only on
              a need-to-know basis. To find out how other groups use your
              information from our website, see their privacy policies .<br />
              <br />
            </p>

            <p>
              It’s possible that these groups store some of your information
              overseas under different information privacy laws and disclosure
              obligations to Nigeria
              <br />
              <br />
            </p>
            <p>
              We will only disclose your personal information to countries with
              laws which protect your personal information in a way which is
              substantially similar to the Nigerian Privacy Regulation or we
              will take such steps as are reasonable in the circumstances to
              protect your personal information in accordance with the Nigeria
              Privacy Regulations.
              <br />
              <br />
            </p>
            <p>
              We will never sell your information. However the government might
              ask for your information - for example through certain laws or a
              court order. This might include the police investigating a crime,
              or a court hearing for failure to pay. If this happens, we’ll
              comply. <br />
              <br />
            </p>
            <p>
              Remember, when reaching out to us online, we can’t guarantee that
              your information hasn’t been intercepted by someone else before
              reaching us. That’s your responsibility!
            </p>

            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Security
            </h5>
            <p>
              We are committed to ensuring that your information is secure. In
              order to prevent unauthorized access or disclosure, we have put in
              place suitable physical, electronic and managerial procedures to
              safeguard and secure the information we collect online.
            </p>

            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, and disclosure. However, no data
              transmission over the Internet or storage system can be guaranteed
              to be 100% secure. Therefore, we cannot guarantee the security of
              your information{' '}
            </p>
            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Controlling Your Personal Information
            </h5>
            <p>
              You may choose to restrict the collection or use of your personal
              information in the following ways: <br />
              <p className="pl-2">
                ● Whenever you are asked to fill in a form on the platform, look
                for the box that you can click to indicate that you do not want
                the information to be used by anybody for direct marketing
                purposes <br />
                ● If you have previously agreed to us using your personal
                information for direct marketing purposes, you may change your
                mind at any time by writing to or emailing us at
                tinapaywallet@gmail.com <br />
                <br />
              </p>
              We will not sell, distribute or lease your personal information to
              third parties unless we have your permission or are required by
              law to do so.
            </p>
            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Children’s privacy
            </h5>
            <p>
              The App is not intended for use by children under the age of 13.
              We do not knowingly collect personal information from children
              under the age of 13. If you are under 13, do not use the App or
              provide any information to us.
            </p>
            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Changes to This Privacy Policy
            </h5>
            <p>
              WWe may update this Privacy Policy from time to time. If we make
              material changes to this Privacy Policy, we will notify you by
              email or by posting a notice on the App prior to the effective
              date of the changes. We encourage you to periodically review this
              Privacy Policy to stay informed about how we are protecting the
              information we collect. Your continued use of the App after the
              effective date of any changes to this Privacy Policy constitutes
              your acceptance of the revised terms. If you do not agree with the
              terms of the revised Privacy Policy, you may choose to discontinue
              using the App.
            </p>
            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              Handling Payments
            </h5>
            <p>
              Unless otherwise specified, payments are made by credit card, bank
              transfer or other means via external payment service providers. In
              general and unless otherwise stated, users are requested to
              provide their payment details and personal information directly to
              such payment service providers. We aren't involved in the
              collection and processing of such information: we will only
              receive a notification by the relevant payment service provider as
              to whether payment has been successfully completed.
            </p>
            <h5 className="text-2xl font-[600] col-span-12 md:col-span-4 pb-4 text-[#585f4c] pt-4">
              The Rights of Users
            </h5>
            <p>
              Users may exercise certain rights regarding their Data processed
              by us. In particular, Users have the right to do the following, to
              the extent permitted by law: <br />
              <br /> I. Withdraw their consent at any time. Users have the right
              to withdraw consent where they have previously given their consent
              to the processing of their Personal Data. <br />
              II. Object to processing of their Data. Users have the right to
              object to the processing of their Data if the processing is
              carried out on a legal basis other than consent. Further details
              are provided in the dedicated section below. <br />
              III. Access their Data. Users have the right to learn if Data is
              being processed by us, obtain disclosure regarding certain aspects
              of the processing and obtain a copy of the Data undergoing
              processing. <br />
              IV. Verify and seek rectification. Users have the right to verify
              the accuracy of their Data and ask for it to be updated or
              corrected.
              <br />
              V. Restrict the processing of their Data. Users have the right to
              restrict the processing of their Data. In this case, We will not
              process their Data for any purpose other than storing it. <br />
              VI. Have their Personal Data deleted or otherwise removed. Users
              have the right to obtain the erasure of their Data from us. <br />
              VII. Receive their Data and have it transferred to another
              controller. Users have the right to receive their Data in a
              structured, commonly used and machine readable format and, if
              technically feasible, to have it transmitted to another controller
              without any hindrance.
              <br />
              VIII. Lodge a complaint. Users have the right to bring a claim
              before their competent data protection authority.
            </p>
          </div>
        </div>
        <div className="flex gap-2 text-[#156CF7] text-[14px] ">
          <img src="/download-svgrepo-com 1.svg" />
          <p onClick={handleDownload}>Download our full Private Policy.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
