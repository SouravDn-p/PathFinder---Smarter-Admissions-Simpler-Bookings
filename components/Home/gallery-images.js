import Image from "next/image";
import React from "react";

const GalleryImages = () => {
  const galleryImages = [
    "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://media.istockphoto.com/id/620981310/photo/bangladesh-dhaka.jpg?s=1024x1024&w=is&k=20&c=79_cKUzmkVSCF-qhVsh-Ia9ittw2h8bTmRI5LFlQ4CI=",
    "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/493928965_693354080253965_890671838665001321_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeGS1nyYXCcqz_FSKA7UYWkh-xKm9ZGGhG77Eqb1kYaEbqFZ0QY5Tv87Hml6UBlFKdkBFD1GsWPviTouj3AFxVsQ&_nc_ohc=uz-764q-d6cQ7kNvwGF8yak&_nc_oc=AdnjPLcgHNpaILUOaCFEa4fSukLFJMPq2nyUt51HHr7QK-1gjK-bwd_VVhOCHrOtp4k&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=3KC8YmulLzfBrmWhjricJQ&oh=00_AfR2pnBpXTxLwaND3C7cVE7Sky1Ep_IHzuuQQMjj0rVEpA&oe=6875AF04",
  ];
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Graduate Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Celebrating our successful graduates
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((i) => (
            <div
              key={i}
              className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Image
                height={400}
                width={400}
                src={i}
                alt={`Graduate ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryImages;
