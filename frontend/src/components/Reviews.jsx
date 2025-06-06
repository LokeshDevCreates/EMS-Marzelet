
const Reviews = () => {
  return (
    <>
       {/* Reviews Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
              {/* Section Heading */}
              <div className="mb-12">
                <h2 className="text-4xl font-extrabold text-gray-800">
                  What Our Users Say
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                  Hear from our satisfied organizers and attendees.
                </p>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Review 1 */}
                <div className="relative bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "Organizing my events has never been easier. The tools are intuitive and powerful!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- Jane, Event Organizer</h4>
                </div>

                {/* Review 2 */}
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "I love how easy it is to book and keep track of my favorite events!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- John, Attendee</h4>
                </div>

                {/* Review 3 */}
                <div className="relative bg-gradient-to-br from-teal-100 to-teal-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11V5a1 1 0 011-1h3M16 11V5a1 1 0 011-1h3M7 19a1 1 0 01-1-1v-6m12 7a1 1 0 001-1v-6"
                    />
                  </svg>
                  <p className="text-xl text-gray-800 italic mb-6">
                    "The payment and notification system is top-notch. Highly recommend!"
                  </p>
                  <h4 className="text-lg font-bold text-gray-700">- Sarah, Frequent Attendee</h4>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default Reviews