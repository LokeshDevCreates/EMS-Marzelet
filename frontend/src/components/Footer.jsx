import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#5ab0cd] text-white py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Evento</h4>
              <p className="text-[#E9F1FA] mt-2">
                Simplifying event management for organizers and attendees.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h5 className="text-lg font-bold">Company</h5>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://marzelet.info/"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      Follow Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-bold">Support</h5>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      to="https://marzelet.info/Components/Other-Contents/contactus/index.html"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-bold">Legal</h5>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-[#E9F1FA] transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-bold">Social</h5>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#E9F1FA] transition-colors">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#E9F1FA] transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#E9F1FA] transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-[#E9F1FA] text-sm">
              &copy; 2025 Evento. All rights reserved.
            </p>
          </div>
        </footer>
    </>
  )
}

export default Footer