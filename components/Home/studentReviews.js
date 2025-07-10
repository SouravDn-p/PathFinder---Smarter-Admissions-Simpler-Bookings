import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const StudentReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      college: "Harvard University",
      rating: 5,
      review: "Amazing experience! The faculty is world-class.",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Mike Chen",
      college: "MIT",
      rating: 5,
      review: "Best decision of my life. Great research opportunities.",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Emily Davis",
      college: "Stanford",
      rating: 4,
      review: "Excellent programs and beautiful campus.",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Student Reviews
          </h2>
          <p className="text-xl text-gray-600">
            What our students say about their experience
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Image
                  width={400}
                  height={400}
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 object-cover rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-gray-600 text-sm">{review.college}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-${ 
                      i < review.rating ? "yellow" : "gray"
                    }-400`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentReviews;
