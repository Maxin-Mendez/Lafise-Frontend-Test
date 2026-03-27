import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
      ),
      new URL(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmzVeYrspoKWFIoYLjhpNMIn96QsVPUgk4Q&s",
      ),
    ],
  },
};

export default nextConfig;
