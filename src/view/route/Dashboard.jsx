import { useRef, useState } from "react";
import BannerHooks from "@/service/banner";
import ProfilHooks from "@/service/profil";
import ServiceHooks from "@/service/service";
import image from "../../assets/PBB.png";
import BalanceHooks from "@/service/balance";
import { Link } from "react-router-dom";
import { formatRupiah } from "@/utils/formatRupiah";
import { getRandomColor } from "@/utils/background";

const Dashboard = () => {
  const { data: balance } = BalanceHooks();
  const { data: banner, method: useBanner } = BannerHooks();
  const { data: service } = ServiceHooks();
  const { data: profil } = ProfilHooks();
  const [togel, setTogel] = useState(false);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-pink-500",
    "bg-gray-500",
    "bg-yellow-500",
  ];
  const colorArray = colors.slice(0, banner.banner.length);

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <div className="mb-6 flex w-full justify-evenly items-start space-x-6">
        <div className="flex items-center space-x-4">
          <img
            className="rounded-full w-12 h-12"
            src={profil?.payload?.profile_image}
            alt={profil?.payload?.last_name}
            onError={useBanner.handleImageErrorProfile}
            // image response rusak
          />
          <p className="text-lg">
            Selamat datang,
            <br />
            <span className="font-bold">{profil?.payload?.last_name}</span>
          </p>
        </div>

        <div className="bg-red-500 w-[70%] text-white rounded-lg p-6 shadow-md flex flex-col justify-between">
          <p className="text-lg">Saldo anda</p>
          <p className="text-3xl font-bold">
            {" "}
            {togel ? `${formatRupiah(balance.balance.balance)}` : "Rp . . . ."}
          </p>
          <p
            className="text-sm mt-4 cursor-pointer"
            onClick={() => setTogel(!togel)}
          >
            {togel ? "Tutup Saldo 👁" : " Lihat Saldo 👀"}
          </p>
        </div>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 md:grid-cols-8 gap-4 mb-6">
        {service.service.map((item, index) => (
          <div className="text-center" key={index}>
            <Link
              to={`/bayar/${item.service_code}`}
              className="cursor-pointer"
              state={{ serviceData: item }}
            >
              <img
                className="w-10 h-10 mx-auto"
                src={item.service_icon}
                onError={useBanner.handleImageErrorProduct}
                alt={item.service_name}
              />
              <p className="mt-2">{item.service_name}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Promo Section */}
      <p className="text-lg mb-4">Temukan promo menarik</p>
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-between absolute inset-y-0 left-0 pl-2 z-10">
          <button
            onClick={() =>
              containerRef.current.scrollBy({
                left: -containerRef.current.clientWidth / 4,
                behavior: "smooth",
              })
            }
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            &#8249;
          </button>
        </div>
        <div
          ref={containerRef}
          className="carousel-container flex overflow-x-auto whitespace-nowrap scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {banner.banner.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-1/4 p-2">
              <div
                className={`p-4 flex justify-between gap-5 rounded-lg ${
                  colorArray[index % colorArray.length]
                }`}
              >
                <div className="flex flex-col w-[60%] ">
                  <p className="text-[14px] ">{item.banner_name}</p>
                  <p className="text-xs ">{item.description}</p>
                </div>
                <div className="w-[40%] ">
                  <img
                    src={item.banner_image}
                    onError={useBanner.handleImageErrorProfile}
                    // image respose rusak
                    alt={item.name}
                    className="w-16 h-14"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between  absolute inset-y-0 right-0 pr-2 z-10">
          <button
            onClick={() =>
              containerRef.current.scrollBy({
                left: containerRef.current.clientWidth / 4,
                behavior: "smooth",
              })
            }
            className="text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
