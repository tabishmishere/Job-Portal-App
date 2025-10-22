import React from "react";
import { SiTicktick } from "react-icons/si";

const testimonials = [
  {
    name: "Jordan Lee",
    username: "@jordanlee",
    text: "I’ve used several job platforms before, but this one truly stands out. The signup was quick, and the profile builder helped me highlight my strengths professionally. Within a few days, I was already receiving job recommendations that actually matched my skills. It feels like this platform was built with real users in mind.",
  },
  {
    name: "Sophia Brown",
    username: "@sophiabrown",
    text: "From creating my profile to applying for jobs, everything was so seamless. What I really appreciate is the clean UI and how easy it is to filter through relevant job listings. I landed two interviews in the first week, and the application tracking feature helped me stay organized throughout the process.",
  },
  {
    name: "Michael Chen",
    username: "@michaelchen",
    text: "This platform has completely changed the way I look for jobs. The tailored job alerts save me so much time, and the dashboard makes it easy to manage everything in one place. I even reached out to support once, and their response was prompt and helpful — a rare experience these days. Highly recommend it to any job seeker.",
  },
];

const Testimonial = () => {
  return (
    <section className="selection:bg-green-500 selection:text-white bg-gradient-to-r from-green-100 to-white min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4">
          What Our <span className="text-green-500 italic ">Users</span> Say!
        </h2>
        <p className="text-gray-600 text-base mb-12">
          Whether you're just starting out or looking to make a
          big move, <br /> our tools are designed to help you find the right
          opportunities — faster, easier, and with confidence.
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-700 text-[15px] leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="border-t pt-4 mt-4">
                <p className="font-semibold text-black flex items-center gap-2">
                  {t.name}
                  <SiTicktick className="w-4 h-4 text-green-500" />
                </p>
                <p className="text-sm text-gray-500">{t.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
