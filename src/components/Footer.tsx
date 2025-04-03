import React from 'react';
import { Facebook, Instagram, Ban, Users } from 'lucide-react';

const Footer = () => {
  return (
    // <footer className="bg-gray-900 text-gray-300 p-8">
    <footer className="bg-[#1C1C21] text-gray-300 p-8">
      <div className="container mx-auto">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">About Dubai Escort</h3>
            <p className="text-sm">
              Dubai Escort is the first choice for those passionate about premium escort services.
              We provide professional, authentic, and unforgettable experiences tailored to your
              desires.
            </p>
            <p className="text-sm">
              Whether you're looking for hot, gorgeous, sophisticated, or glamorous escorts in
              Dubai, Dubai Escort is your ultimate destination.
            </p>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ Sophisticated Model Escort Service</li>
              <li>✅ All Country Escorts in One Place</li>
              <li>✅ 24/7 Availability for Escorts</li>
              <li>✅ VIP and Elite Escort Packages</li>
              <li>✅ Partner for All Types of Evenings</li>
              <li>✅ Adequate Customer Care Service</li>
            </ul>
          </div>

          {/* Safety & Hygiene Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Safety & Hygiene</h3>
            <ul className="space-y-2 text-sm">
              <li>🔒 Regular Health Checkups for Escorts</li>
              <li>🧼 Full Care of Sanitization and Hygiene</li>
              <li>🤐 Confidentiality in Health Information</li>
              <li>💆‍♂️ Comfort and Well-being of Clients</li>
              <li>🩺 Precautionary Measures for Safe Enjoyment</li>
            </ul>
          </div>

          {/* Special Packages & Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Special Packages</h3>
            <ul className="space-y-2 text-sm">
              <li>💆‍♀️ Body to Body Massage</li>
              <li>🎭 Exhilarating Role-Playing Sessions</li>
              <li>🌍 Themed Adventures</li>
              <li>🛁 Aromatherapy & Spa Treatments</li>
              <li>🔥 Sensual & Erotic Massages</li>
            </ul>

            {/* Social Media Section */}
            <div className="mt-6">
              <h3 className="text-white font-bold text-lg">Follow Us</h3>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Ban"
                >
                  <Ban size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Users"
                >
                  <Users size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Rule to Separate Sections */}
        <hr className="my-8 border-gray-800" />

        {/* New Section */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Paid Links</h3>
          <p className="text-sm">
            <a href="#" className="hover:text-white">
              Dubai Escort
            </a>
            <a href="#" className="hover:text-white">
              Dubai Escorts
            </a>
            {/* <a href="#" className="hover:text-white">Delhi Escorts</a> */}
            <a href="#" className="hover:text-white">
              Goa Escorts
            </a>
            <a href="#" className="hover:text-white">
              Abu Dhabi Escorts
            </a>
          </p>
          <p className="text-sm">
            This website only allows 18+ individuals to advertise their time and services to other
            18+ individuals. In some countries, individuals do not legally have the choice to decide
            this; it is your responsibility to comply with local laws.
          </p>
          <p className="text-sm">
            This is not an agency page. The ads were posted by users, who announce their services
            with no involvement from our side. We don’t take responsibility for the content of these
            ads. All profiles presented on our website are solely for informational purposes.
          </p>
          <p className="text-sm">Help fighting Human Trafficking. Adult Webpage +18 years old.</p>
          <h3 className="text-white font-bold text-lg mt-4">Latest Blog Post</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Can I use not real or fake photos in my profile?
              </a>
              – it is not allowed for users to upload fake pictures. If we find such Ad, the whole
              account will be deactivated immediately. If this…
              <a href="#" className="hover:text-white">
                Read more
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Do I need to have my own webpage to advertise?
              </a>
              Independent escort providers do not have to have their own website to advertise on our
              directory. Agency should provide an agency website. Agency without URL…
              <a href="#" className="hover:text-white">
                Read more
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                I am a dubai escort girl. How can I register a Profile?
              </a>
              – to start advertising, please, create “independent escort” account via
              <a
                href="https://www.dubai-escorts.me/profile-registration"
                className="hover:text-white"
              >
                https://www.dubai-escorts.me/profile-registration
              </a>
              Please, log in to your account, fill required information about yourself and upload
              your photos.…
              <a href="#" className="hover:text-white">
                Read more
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Who Can Advertise on www.dubai-escorts.me
              </a>
              Only independent escort providers, escort agencies and strip clubs can can create an
              account. Is not allowed to create account for Web Cams, escort directories,…
              <a href="#" className="hover:text-white">
                Read more
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Real Pornstar Escorts in Dubai, UAE
              </a>
              Porn Star Escort services in Dubai Here you will find the real porn star escorts for
              escort services in Dubai with 55+ porn star escorts in…
              <a href="#" className="hover:text-white">
                Read more
              </a>
            </li>
          </ul>
          <h3 className="text-white font-bold text-lg mt-4">
            How to book Our Young Escorts Service
          </h3>
          <p className="text-sm">
            This will make you feel delight about our Dubai's Best Escorts. If you are thinking that
            you should hire Leading escorts for sexual pleasure then you can do it in two ways. The
            first one is you will pick your escort girl via our escorts agency and the second one is
            to book your dream girl directly through outcall services. Dreaming for the best we will
            make it happen in every way and we know you're looking for someone for your night out's.
          </p>
          <p className="text-sm">
            Call @ – +971-551291072 |
            <a href="#" className="hover:text-white">
              independent female Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              high profile ladies Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              High profile female Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              high profile Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              high profile Escorts services in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              independent female model Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              pakistani air hostess Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              house wife Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Indian Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              indian Escorts service Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai Escorts number
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai female Escorts number
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai companions number
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai Escorts contact number
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai Escorts mobile number
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai mature Escorts
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai night girls
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai night club
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai call girl
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Call girl Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai call girl service
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai independent Escorts
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai call girl Escorts
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              indian Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Dubai models Escorts service
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              outcall Escorts agency Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              independent models in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Escorts service in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              russian Escorts in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              cheap Escorts Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Vip Escorts in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              Prostitute in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              excourt service Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              locanto Dubai girl
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              cheap Escorts in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              personal service in Dubai
            </a>{' '}
            |
            <a href="#" className="hover:text-white">
              booking girl Dubai
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} dubai-escorts.me All rights reserved. |
            <a href="/terms" className="hover:text-white ml-2">
              Terms of Use
            </a>{' '}
            |
            <a href="/privacy" className="hover:text-white ml-2">
              Privacy Policy
            </a>
          </p>
          <p className="text-sm text-gray-400 mt-2 text-justify">
            Dubai-Escorts is the first choice of people passionate about getting escort services.
            Dubai-Escorts provides professional escort services that will match your niche and
            whatever you are looking for in escorts. You will get here Are you looking for Hot,
            Gorgeous, Sophisticated, Glamorous, Stunning, Elegant, Captivating, Dazzling, Charming,
            Attractive, Striking, and Bewitching escorts in dubai? So, you come to the right place
            at Dubai-Escorts, and you will get everything that you desire. Dubai-Escorts provides
            top-notch escort quality services in dubai. You should check it out to learn more about
            Dubai-Escorts People often being disappointed after paying a lot for rubbish services
            from other agencies and those agencies also don’t care about their client satisfaction.
            Dubai-Escorts is different from them; we care about our client satisfaction and their
            hard-core earn money Dubai-Escorts Service We know that you are looking for stunning
            fun, that can make you feel sensitive or reduce your loneliness, That’s why we are here
            for you, We know your requirements, Probably it could be a gorgeous Dubai escort for
            suited fun or any type of meeting whatever you need we have If your niche is Model
            Escorts, Milf Escorts or other Dubai-Escortss offer everything According to our client
            desire Dubai-Escorts Services Included: ✅ Sophisticated Model Escort Service ✅ All
            country Escorts in one place ✅ 24\7 Availability for Escorts ✅ VIP and Elite Escort
            Packages ✅ Partner for all types of evening ✅ Adequate customer care service If you
            want to find out more, you should check our catalogue to know that we provide more than
            written specialities. You are probably looking for Morocco escort girls, Russian escort
            girls, Pakistani escort girls and many more. You can check the variety of escort girls
            in our catalogue. Priority of Safety & Hygiene At Dubai-Escorts, we give priority to our
            clients. We care about our clients' safety, and our escorts take complete care or
            precaution so they will give full enjoyment to their clients. So our clients take
            worry-free enjoyment and get an enjoyable experience. Our service is fully professional.
            We also conduct Regular health checkups & hygiene checkups of our all escorts, so you
            can relax and enjoy your time with beautiful Escorts and have an enjoyable experience in
            complete confidence. What we do to make your experience better: Full care of
            Sanitization and hygiene: Theduabiescort know the importance of hygiene and
            sanitization, and that's why we especially focus on that. All our escorts follow basic
            hygiene standards (washing hands, using sanitisers, etc). Confidentiality in Health:
            Soothe clients that any health-related information shared is kept strictly confidential
            so our clients can’t worry about anything and don’t be afraid of any misusage of
            information Regular Health Checks: Some diseases can spread from one person to another;
            that's why we always take regular health checkups of escorts Comfort for Clients: These
            safety measures contribute to the comfort and well-being of clients during the service.
            Don’t worry about any type of health, hygine or sanitization issue. Our escorts are
            fully prepared or have taken all the regular precautions so you will not get bad service
            or be disappointed with us Theduabiecort Special Packages Are you looking for an
            unforgettable or enjoyable experience? You come to the right place at Theduabiescorts.
            We believe every encounter with an escort should be unforgettable for our clients. Our
            exclusive range of services- Body to Body Massage Exhilarating role-playing sessions
            Themed adventures Aromatherapy or Spa Treatments Sensual Massage Erotic Massages There
            are more services we offer for checking. Please check our catalogue to know more about
            our services Price range: We have designed a unique price range for our clients it
            usually caters to diverse preferences and budgets, and it was made to ensure our clients
            get an unforgettable & enjoyable experience, whether you are looking for an escort for
            short-term or long-term any type of meeting or for any type of occasion we have a
            variety of escorts with a variety of price range. To know about the price range
            according to your niche, you can make a query request, or you can directly call on the
            given number. we have options to suit your needs. For those seeking a more exclusive
            experience, our VIP escort services deliver unparalleled sophistication and discretion,
            making them perfect for high-profile clients or special occasions. Disclaimer: This
            website contains adult content and is intended for adults only. By entering this
            website, you certify that you are at least 18 years old.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
